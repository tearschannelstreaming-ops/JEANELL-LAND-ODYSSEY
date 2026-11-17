import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Play, RotateCcw, CheckCircle2, AlertCircle, Zap, ShieldAlert } from 'lucide-react';
import { sound } from '../../utils/audio';

interface PropulsionLabProps {
  onMasteryEarned?: (points: number) => void;
  resilience?: number;
}

export const RocketPropulsionLab: React.FC<PropulsionLabProps> = ({ onMasteryEarned, resilience = 50 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Design Variables
  const [engineType, setEngineType] = useState<'hydrolox' | 'methalox' | 'solid'>('methalox');
  const [fuelMassKg, setFuelMassKg] = useState<number>(38000); // 15,000 to 70,000 kg
  const [payloadMassKg, setPayloadMassKg] = useState<number>(2200); // 500 to 5,000 kg
  const [throttlePercent, setThrottlePercent] = useState<number>(90); // 60% to 100%

  // Simulation State
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [simTimeSec, setSimTimeSec] = useState<number>(0);
  const [telemetry, setTelemetry] = useState<{
    altKm: number;
    velMs: number;
    currentMassKg: number;
    gForce: number;
    stageBurned: boolean;
  }>({
    altKm: 0,
    velMs: 0,
    currentMassKg: 0,
    gForce: 1,
    stageBurned: false,
  });

  const [activeChallenge, setActiveChallenge] = useState<number>(0);
  const [challengeResult, setChallengeResult] = useState<string>('');
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  // Engine Physics Specs with Resilience Perk
  const resilienceIspBonus = resilience >= 75 ? 25 : resilience >= 50 ? 12 : 0;
  const engineSpecs = {
    hydrolox: { name: 'Hydrolox Cryogenic', isp: 450, baseThrustKn: 850, dryMassKg: 2800 },
    methalox: { name: 'Methalox Staged Combustion', isp: 380, baseThrustKn: 1200, dryMassKg: 3200 },
    solid: { name: 'Solid Grain Booster', isp: 285, baseThrustKn: 1900, dryMassKg: 2400 },
  };

  const g0 = 9.80665;
  const currentEngine = engineSpecs[engineType];
  const effectiveIsp = currentEngine.isp + resilienceIspBonus;
  const dryStructureMass = currentEngine.dryMassKg;
  const totalDryMass = dryStructureMass + payloadMassKg;
  const initialMassM0 = totalDryMass + fuelMassKg;
  const massRatio = initialMassM0 / totalDryMass;

  // Tsiolkovsky Ideal Delta-V: Δv = Isp * g0 * ln(m0 / mf)
  const idealDeltaV = Math.round(effectiveIsp * g0 * Math.log(massRatio));

  // Max Thrust
  const actualThrustKn = currentEngine.baseThrustKn * (throttlePercent / 100);
  const initialWeightKn = (initialMassM0 * g0) / 1000;
  const initialTwr = actualThrustKn / initialWeightKn;
  const maxGForce = (actualThrustKn * 1000) / (totalDryMass * g0);

  // Challenges
  const challenges = [
    {
      id: 1,
      title: 'Low Earth Orbit (LEO) Insertion',
      goal: 'Achieve Ideal Delta-V >= 7,800 m/s with an initial TWR >= 1.25.',
      eval: (dv: number, twr: number, maxG: number) => dv >= 7800 && twr >= 1.25 && maxG <= 6.5,
      hint: 'Hydrolox offers the highest Isp (450s). Optimize fuel load while keeping payload reasonable.',
    },
    {
      id: 2,
      title: 'Gentle Payload Ride (Max G < 4.2G)',
      goal: 'Deliver a 3,500 kg scientific sensor payload into orbit (Δv >= 6,500 m/s) with peak G-force <= 4.2 G.',
      eval: (dv: number, _twr: number, maxG: number) => dv >= 6500 && maxG <= 4.2 && payloadMassKg >= 3000,
      hint: 'Throttle down slightly or pick Methalox to balance continuous acceleration against dry mass ratio.',
    },
    {
      id: 3,
      title: 'Heavy Lift Booster Validation',
      goal: 'Launch with a 4,500 kg payload achieving an initial TWR >= 1.50 with at least 5,500 m/s Δv.',
      eval: (dv: number, twr: number, _maxG: number) => dv >= 5500 && twr >= 1.5 && payloadMassKg >= 4000,
      hint: 'Solid boosters provide massive raw thrust for heavy payloads.',
    },
  ];

  // Canvas visual rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky gradient based on simulated altitude
      const altNorm = Math.min(1, telemetry.altKm / 200);
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (altNorm < 0.2) {
        // Lower atmosphere
        skyGrad.addColorStop(0, '#0c4a6e');
        skyGrad.addColorStop(1, '#0284c7');
      } else if (altNorm < 0.6) {
        // Stratosphere to Mesosphere
        skyGrad.addColorStop(0, '#020617');
        skyGrad.addColorStop(1, '#075985');
      } else {
        // Space / Low Earth Orbit
        skyGrad.addColorStop(0, '#020617');
        skyGrad.addColorStop(1, '#090d16');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars in high atmosphere
      if (altNorm > 0.3) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (let i = 0; i < 40; i++) {
          const sx = (i * 37) % canvas.width;
          const sy = (i * 53) % (canvas.height * 0.7);
          ctx.fillRect(sx, sy, 1.5, 1.5);
        }
      }

      // Earth curvature horizon at bottom
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, canvas.height + 300, 500, 360, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Atmospheric Band Markers on left
      const layers = [
        { label: 'LEO Orbit (160km)', y: 30 },
        { label: 'Kármán Line (100km)', y: 80 },
        { label: 'Stratosphere (50km)', y: 180 },
        { label: 'Launch Pad (0km)', y: canvas.height - 25 },
      ];
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '10px monospace';
      layers.forEach((l) => {
        ctx.fillText(l.label, 12, l.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.moveTo(10, l.y + 4);
        ctx.lineTo(canvas.width - 20, l.y + 4);
        ctx.stroke();
      });

      // Rocket Representation
      const rocketX = canvas.width / 2;
      // Position maps altitude 0-200km to canvas height
      const targetRocketY = canvas.height - 40 - (telemetry.altKm / 200) * (canvas.height - 80);
      const rocketY = Math.max(40, targetRocketY);

      // Rocket Body
      ctx.save();
      ctx.translate(rocketX, rocketY);

      // Exhaust Plume when firing
      if (isLaunching && !telemetry.stageBurned) {
        ctx.beginPath();
        ctx.moveTo(-6, 20);
        ctx.lineTo(6, 20);
        ctx.lineTo(0, 35 + (Math.random() * 20 * (throttlePercent / 100)));
        ctx.closePath();
        const fireGrad = ctx.createLinearGradient(0, 20, 0, 50);
        fireGrad.addColorStop(0, '#fef08a');
        fireGrad.addColorStop(0.5, '#f97316');
        fireGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = fireGrad;
        ctx.fill();
      }

      // Fuselage
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(0, -26); // Nosecone tip
      ctx.lineTo(7, -10);
      ctx.lineTo(7, 20);
      ctx.lineTo(-7, 20);
      ctx.lineTo(-7, -10);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Fins
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(-7, 10);
      ctx.lineTo(-14, 22);
      ctx.lineTo(-7, 20);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(7, 10);
      ctx.lineTo(14, 22);
      ctx.lineTo(7, 20);
      ctx.fill();

      ctx.restore();

      // Flight trajectory line
      if (telemetry.altKm > 0) {
        ctx.strokeStyle = '#38bdf8';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(rocketX, canvas.height - 40);
        ctx.lineTo(rocketX, rocketY + 20);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [telemetry, isLaunching, throttlePercent]);

  // Launch Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLaunching) {
      timer = setInterval(() => {
        setSimTimeSec((t) => {
          const nextT = t + 1;
          const burnDuration = fuelMassKg / ((actualThrustKn * 1000) / (currentEngine.isp * g0));

          if (nextT <= burnDuration) {
            // Stage is burning
            const massAtT = initialMassM0 - (fuelMassKg * (nextT / burnDuration));
            const currentAcc = (actualThrustKn * 1000) / massAtT - g0;
            const currentG = Math.max(1, ((actualThrustKn * 1000) / massAtT) / g0);

            setTelemetry((prev) => {
              const newVel = prev.velMs + currentAcc * 1;
              const newAltKm = prev.altKm + (newVel * 1) / 1000;
              return {
                altKm: Math.round(newAltKm),
                velMs: Math.round(newVel),
                currentMassKg: Math.round(massAtT),
                gForce: parseFloat(currentG.toFixed(2)),
                stageBurned: false,
              };
            });
          } else {
            // Burnout / MECO
            setIsLaunching(false);
            setTelemetry((prev) => ({
              ...prev,
              stageBurned: true,
              gForce: 0, // microgravity coast
            }));
            sound.playSuccess();
          }

          return nextT;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isLaunching, fuelMassKg, actualThrustKn, currentEngine.isp, initialMassM0]);

  const handleStartLaunch = () => {
    if (initialTwr < 1.0) {
      sound.playAlert();
      setChallengeResult('Launch Abort: Thrust-to-Weight Ratio < 1.0. Rocket cannot overcome Earth gravity!');
      return;
    }
    sound.playClick();
    setSimTimeSec(0);
    setTelemetry({
      altKm: 0,
      velMs: 0,
      currentMassKg: initialMassM0,
      gForce: parseFloat(initialTwr.toFixed(2)),
      stageBurned: false,
    });
    setIsLaunching(true);
  };

  const handleReset = () => {
    sound.playClick();
    setIsLaunching(false);
    setSimTimeSec(0);
    setTelemetry({
      altKm: 0,
      velMs: 0,
      currentMassKg: initialMassM0,
      gForce: 1,
      stageBurned: false,
    });
    setChallengeResult('');
  };

  const handleVerify = () => {
    sound.playClick();
    const curr = challenges[activeChallenge];
    const passed = curr.eval(idealDeltaV, initialTwr, maxGForce);

    if (passed) {
      sound.playSuccess();
      setChallengeResult('Mission Criteria Verified! Propulsion parameters align with orbital insertion envelope.');
      if (!completedChallenges.includes(curr.id)) {
        setCompletedChallenges([...completedChallenges, curr.id]);
        if (onMasteryEarned) {
          onMasteryEarned(25);
        }
      }
    } else {
      sound.playAlert();
      setChallengeResult('Mission Variance: Review fuel load, payload mass, or engine selection.');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Stage Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Rocket className="w-4 h-4" />
            <span>PROPULSION SYSTEMS LAB · S.T.E.A.M. MODULE 02</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Tsiolkovsky Rocket Staging & Orbital Δv</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Balance mass fraction, specific impulse (Isp), and structural G-load to achieve Low Earth Orbit insertion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleStartLaunch}
            disabled={isLaunching}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              isLaunching
                ? 'bg-amber-600/50 text-white cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isLaunching ? 'Firing Burn...' : 'Ignite Test Launch'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Stage</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Visualization (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 p-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-lg overflow-hidden border border-slate-800/80">
            <canvas ref={canvasRef} width={640} height={400} className="w-full h-full block" />

            {/* Altitude & State Tag */}
            <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-md text-xs font-mono text-slate-200 space-y-0.5 text-right">
              <div>Alt: <span className="text-amber-400 font-bold tabular-nums">{telemetry.altKm} km</span></div>
              <div>Vel: <span className="text-cyan-400 font-bold tabular-nums">{telemetry.velMs.toLocaleString()} m/s</span></div>
              <div>Acc: <span className="text-emerald-400 font-bold tabular-nums">{telemetry.gForce} G</span></div>
            </div>

            {initialTwr < 1.0 && (
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-red-950/90 border border-red-500 px-3 py-1.5 rounded-md text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span>INSUFFICIENT TWR (&lt; 1.0) · ROCKET WILL NOT LIFT OFF</span>
              </div>
            )}
          </div>

          {/* Telemetry Metrics */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80">
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-center">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Ideal Δv</span>
              <span className="text-base font-bold text-cyan-300 font-mono tabular-nums">{idealDeltaV.toLocaleString()} m/s</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-center">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Initial TWR</span>
              <span className={`text-base font-bold font-mono tabular-nums ${initialTwr >= 1.2 ? 'text-green-400' : 'text-amber-400'}`}>
                {initialTwr.toFixed(2)}
              </span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-center">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Max G-Load</span>
              <span className={`text-base font-bold font-mono tabular-nums ${maxGForce > 5.5 ? 'text-red-400' : 'text-slate-200'}`}>
                {maxGForce.toFixed(1)} G
              </span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-center">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Mass Ratio</span>
              <span className="text-base font-bold text-amber-300 font-mono tabular-nums">{massRatio.toFixed(2)}x</span>
            </div>
          </div>
        </div>

        {/* Right Propulsion Config (5 cols) */}
        <div className="lg:col-span-5 p-5 space-y-5 bg-slate-900 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide">
              ROCKET STAGE ARCHITECTURE
            </h3>

            {/* Engine Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Propulsion Engine Cycle</label>
              <div className="grid grid-cols-3 gap-2">
                {(['hydrolox', 'methalox', 'solid'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      sound.playClick();
                      setEngineType(t);
                    }}
                    className={`p-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                      engineType === t
                        ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold capitalize">{t}</div>
                    <div className="text-[10px] text-slate-500 font-mono">Isp: {engineSpecs[t].isp}s</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider: Fuel Mass */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Propellant Mass (m_prop)</span>
                <span className="text-amber-400 font-mono font-semibold tabular-nums">{fuelMassKg.toLocaleString()} kg</span>
              </div>
              <input
                type="range"
                min="15000"
                max="65000"
                step="1000"
                value={fuelMassKg}
                onChange={(e) => setFuelMassKg(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider: Payload Mass */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Payload Mass (Satellite / Crew)</span>
                <span className="text-cyan-400 font-mono font-semibold tabular-nums">{payloadMassKg.toLocaleString()} kg</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={payloadMassKg}
                onChange={(e) => setPayloadMassKg(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider: Throttle % */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Engine Throttle Setting</span>
                <span className="text-emerald-400 font-mono font-semibold tabular-nums">{throttlePercent}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="100"
                step="2"
                value={throttlePercent}
                onChange={(e) => setThrottlePercent(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Scientific Equation Note */}
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs space-y-1 text-slate-400">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>Tsiolkovsky Staging Physics</span>
              </div>
              <p>
                Δv = I_sp · g_0 · ln(m_0 / m_f) = {currentEngine.isp} × 9.81 × ln({initialMassM0} / {totalDryMass}) ={' '}
                <strong className="text-amber-200">{idealDeltaV.toLocaleString()} m/s</strong>.
                Orbital velocity at 200 km requires ~7,800 m/s.
              </p>
            </div>
          </div>

          {/* Mission Challenge Box */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                PROPULSION CHALLENGE
              </span>
              <div className="flex gap-1.5">
                {challenges.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveChallenge(idx);
                      setChallengeResult('');
                    }}
                    className={`w-6 h-6 text-xs font-mono font-medium rounded transition-colors ${
                      activeChallenge === idx
                        ? 'bg-amber-600 text-white'
                        : completedChallenges.includes(c.id)
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {c.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-white">{challenges[activeChallenge].title}</h4>
                {completedChallenges.includes(challenges[activeChallenge].id) && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{challenges[activeChallenge].goal}</p>
              <p className="text-[11px] text-slate-500 italic">Hint: {challenges[activeChallenge].hint}</p>
            </div>

            {challengeResult && (
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-amber-300">
                {challengeResult}
              </div>
            )}

            <button
              onClick={handleVerify}
              className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              Verify Trajectory Telemetry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
