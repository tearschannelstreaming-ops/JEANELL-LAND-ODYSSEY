import React, { useState, useEffect, useRef } from 'react';
import { Wind, Play, RotateCcw, AlertTriangle, CheckCircle2, Info, Compass } from 'lucide-react';
import { sound } from '../../utils/audio';

interface AeroLabProps {
  onMasteryEarned?: (points: number) => void;
  resilience?: number;
}

export const AeroWindTunnelLab: React.FC<AeroLabProps> = ({ onMasteryEarned, resilience = 50 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation parameters
  const [angleDeg, setAngleDeg] = useState<number>(6); // Angle of attack
  const [airspeed, setAirspeed] = useState<number>(85); // m/s
  const [camber, setCamber] = useState<number>(6); // % curvature
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeChallenge, setActiveChallenge] = useState<number>(0);
  const [challengeStatus, setChallengeStatus] = useState<string>('');
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  // Physics calculations with Resilience Perk
  const resilienceStallBuffer = resilience >= 75 ? 2.5 : resilience >= 50 ? 1.2 : 0;
  const airDensity = 1.225; // kg/m^3 (sea level standard)
  const wingArea = 1.6; // m^2
  const chordLength = 1.2; // m

  const stallAngle = 14 + (camber * 0.2) + resilienceStallBuffer;
  const isStalled = angleDeg > stallAngle;

  // Lift Coefficient
  const angleRad = (angleDeg * Math.PI) / 180;
  let cL = 0;
  if (!isStalled) {
    cL = (2 * Math.PI * (angleRad + (camber * 0.015)));
  } else {
    // Post stall drop
    const overshoot = angleDeg - stallAngle;
    cL = Math.max(0.2, (2 * Math.PI * ((stallAngle * Math.PI) / 180)) * Math.exp(-overshoot * 0.15));
  }

  // Drag Coefficient
  const cd0 = 0.02 + (camber * 0.003);
  const inducedDrag = isStalled ? 0.35 + (angleDeg - stallAngle) * 0.04 : (cL * cL) / (Math.PI * 6 * 0.85);
  const cD = cd0 + inducedDrag;

  // Dynamic pressure & forces
  const dynamicPressure = 0.5 * airDensity * (airspeed * airspeed);
  const liftNewtons = Math.max(0, Math.round(cL * dynamicPressure * wingArea));
  const dragNewtons = Math.max(10, Math.round(cD * dynamicPressure * wingArea));
  const liftToDragRatio = dragNewtons > 0 ? (liftNewtons / dragNewtons).toFixed(1) : '0';

  // Challenges
  const challenges = [
    {
      id: 1,
      title: 'Transonic Climb Efficiency',
      goal: 'Achieve an L/D ratio >= 13.5 with airspeed between 75-105 m/s without aerodynamic stall.',
      eval: (ld: number, v: number, stalled: boolean) => ld >= 13.5 && v >= 75 && v <= 105 && !stalled,
      hint: 'Maintain moderate angle of attack (4° to 8°) with camber around 5-8% to balance lift suction and form drag.',
    },
    {
      id: 2,
      title: 'High-Lift Heavy Cargo Ascent',
      goal: 'Generate >= 9,000 N of Lift while keeping Drag under 850 N without flow separation.',
      eval: (_ld: number, _v: number, stalled: boolean, lift: number, drag: number) => lift >= 9000 && drag <= 850 && !stalled,
      hint: 'Increase airspeed to ~110-130 m/s with angle of attack ~7° to boost dynamic pressure while avoiding stall.',
    },
    {
      id: 3,
      title: 'Stall Boundary Recovery Analysis',
      goal: 'Trigger a flow separation stall (Angle > 15°), observe the vortex breakdown, then recover smoothly below 10°.',
      eval: (ld: number, _v: number, stalled: boolean) => !stalled && angleDeg <= 9 && ld > 10,
      hint: 'Bring the wing past 16° to study detachment, then lower angle back into the stable laminar envelope.',
    },
  ];

  // Sound feedback on stall
  useEffect(() => {
    if (isStalled) {
      sound.playAlert();
    }
  }, [isStalled]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; life: number; id: number }[] = [];

    // Initialize streamlines
    const numLines = 26;
    for (let i = 0; i < numLines; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: 20 + (i * (canvas.height - 40)) / numLines,
        vx: airspeed * 0.05,
        vy: 0,
        life: Math.random(),
        id: i,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Wind Tunnel Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Airfoil coordinates
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const cLength = 190;
      const rad = (angleDeg * Math.PI) / 180;

      // Draw Pressure Contours
      if (!isStalled) {
        // Upper suction zone (low pressure cyan glow)
        const suctionGrad = ctx.createRadialGradient(cx - 20, cy - 45, 10, cx, cy - 30, 90);
        suctionGrad.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
        suctionGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = suctionGrad;
        ctx.beginPath();
        ctx.arc(cx - 10, cy - 35, 80, 0, Math.PI * 2);
        ctx.fill();

        // Lower compression zone (high pressure amber glow)
        const pressGrad = ctx.createRadialGradient(cx, cy + 40, 10, cx, cy + 30, 80);
        pressGrad.addColorStop(0, 'rgba(245, 158, 11, 0.16)');
        pressGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = pressGrad;
        ctx.beginPath();
        ctx.arc(cx, cy + 35, 75, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Turbulent stall wake
        ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
        ctx.beginPath();
        ctx.ellipse(cx + 80, cy - 30, 90, 50, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // Airfoil Shape Transformation
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-rad); // negative because canvas Y is inverted

      ctx.beginPath();
      const halfC = cLength / 2;
      // NACA 4-digit parametric airfoil profile
      ctx.moveTo(-halfC, 0); // Leading edge

      const maxT = 0.14; // thickness 14%
      const cam = (camber / 100) * 0.8;

      // Upper surface
      for (let i = 0; i <= 20; i++) {
        const xPercent = i / 20;
        const xPos = -halfC + xPercent * cLength;
        const yt = 5 * maxT * cLength * (0.2969 * Math.sqrt(xPercent) - 0.126 * xPercent - 0.3516 * xPercent ** 2 + 0.2843 * xPercent ** 3 - 0.1015 * xPercent ** 4);
        const yc = cam * cLength * (2 * 0.4 * xPercent - xPercent ** 2);
        const yPos = -(yc + yt);
        ctx.lineTo(xPos, yPos);
      }
      // Lower surface
      for (let i = 20; i >= 0; i--) {
        const xPercent = i / 20;
        const xPos = -halfC + xPercent * cLength;
        const yt = 5 * maxT * cLength * (0.2969 * Math.sqrt(xPercent) - 0.126 * xPercent - 0.3516 * xPercent ** 2 + 0.2843 * xPercent ** 3 - 0.1015 * xPercent ** 4);
        const yc = cam * cLength * (2 * 0.4 * xPercent - xPercent ** 2);
        const yPos = -(yc - yt);
        ctx.lineTo(xPos, yPos);
      }
      ctx.closePath();

      // Wing Gradient Fill & Stroke
      const wingGrad = ctx.createLinearGradient(-halfC, -30, halfC, 30);
      wingGrad.addColorStop(0, '#0284c7');
      wingGrad.addColorStop(0.5, '#0369a1');
      wingGrad.addColorStop(1, '#075985');
      ctx.fillStyle = wingGrad;
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Chord reference line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(-halfC, 0);
      ctx.lineTo(halfC, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // Draw Force Vectors from Center of Pressure
      const vectorScale = 0.018;
      // Lift Vector (Green upwards)
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      const liftY = cy - Math.min(160, liftNewtons * vectorScale);
      ctx.lineTo(cx - 10, liftY);
      ctx.stroke();
      // Arrowhead
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(cx - 10, liftY - 8);
      ctx.lineTo(cx - 16, liftY);
      ctx.lineTo(cx - 4, liftY);
      ctx.fill();

      // Drag Vector (Red rightwards)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      const dragX = cx - 10 + Math.min(140, dragNewtons * vectorScale * 2);
      ctx.lineTo(dragX, cy);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(dragX + 8, cy);
      ctx.lineTo(dragX, cy - 5);
      ctx.lineTo(dragX, cy + 5);
      ctx.fill();

      // Animate Airflow Streamlines
      if (isRunning) {
        ctx.lineWidth = 1.5;
        particles.forEach((p) => {
          p.vx = (airspeed / 20) * (1 + (p.id % 3) * 0.1);
          p.x += p.vx;
          if (p.x > canvas.width) {
            p.x = 0;
            p.y = 15 + (p.id * (canvas.height - 30)) / numLines;
          }

          // Flow deflection around airfoil
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let yDeflection = 0;
          if (dist < 140) {
            if (dy < 0) {
              // Upper airflow accelerated & pulled down over contour
              yDeflection = -Math.sin(dx / 40) * (angleDeg * 0.8 + camber * 0.4);
            } else {
              // Lower airflow pushed down
              yDeflection = Math.cos(dx / 50) * (angleDeg * 0.5);
            }
          }

          // Turbulence in stall
          if (isStalled && dx > 0 && dy < 40) {
            yDeflection += (Math.random() - 0.5) * 22;
          }

          // Render Streamline Streak
          const streakLen = airspeed * 0.28;
          ctx.strokeStyle = isStalled && dx > 0 && dy < 40
            ? 'rgba(248, 113, 113, 0.4)'
            : 'rgba(56, 189, 248, 0.45)';
          ctx.beginPath();
          ctx.moveTo(p.x - streakLen, p.y + yDeflection);
          ctx.lineTo(p.x, p.y + yDeflection);
          ctx.stroke();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [angleDeg, airspeed, camber, isRunning, isStalled, liftNewtons, dragNewtons]);

  // Challenge evaluation
  const handleEvaluateChallenge = () => {
    sound.playClick();
    const curr = challenges[activeChallenge];
    const passed = curr.eval(
      parseFloat(liftToDragRatio),
      airspeed,
      isStalled,
      liftNewtons,
      dragNewtons
    );

    if (passed) {
      sound.playSuccess();
      setChallengeStatus('Verification Successful! Telemetry meets target flight profile.');
      if (!completedChallenges.includes(curr.id)) {
        setCompletedChallenges([...completedChallenges, curr.id]);
        if (onMasteryEarned) {
          onMasteryEarned(25);
        }
      }
    } else {
      sound.playAlert();
      setChallengeStatus('Parameter Divergence: Adjust angle or airspeed to satisfy aerodynamic criteria.');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Simulation Stage Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Wind className="w-4 h-4" />
            <span>AERONAUTICAL LAB · S.T.E.A.M. MODULE 01</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">NACA Airfoil Wind Tunnel & Pressure Field</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore Bernoulli pressure differentials, lift vs. drag polar coefficients, and flow separation stall boundaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {resilienceStallBuffer > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/70 border border-rose-500/50 text-[11px] text-rose-300 font-mono">
              <span>Resilience Stall Buffer: +{resilienceStallBuffer.toFixed(1)}°</span>
            </div>
          )}
          <button
            onClick={() => {
              sound.playClick();
              setIsRunning(!isRunning);
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isRunning ? 'Freeze Tunnel' : 'Run Tunnel'}</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setAngleDeg(6);
              setAirspeed(85);
              setCamber(6);
              setChallengeStatus('');
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Main 2-Zone Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Interactive Canvas Stage (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-between p-4 border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-lg overflow-hidden border border-slate-800/80">
            <canvas
              ref={canvasRef}
              width={640}
              height={400}
              className="w-full h-full block cursor-crosshair"
            />

            {/* Overlaid Live Indicator */}
            {isStalled ? (
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-950/80 border border-red-500/60 px-3 py-1.5 rounded-md text-red-200 text-xs font-medium">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>AERODYNAMIC STALL · FLOW SEPARATED ({angleDeg}° &gt; {stallAngle.toFixed(1)}°)</span>
              </div>
            ) : (
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-slate-900/80 border border-cyan-500/40 px-3 py-1.5 rounded-md text-cyan-200 text-xs font-medium">
                <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>LAMINAR ATTACHED FLOW · NOMINAL LIFT</span>
              </div>
            )}

            {/* Vector Legend */}
            <div className="absolute bottom-3 right-3 flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-md text-[11px] font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-green-500 inline-block" />
                <span>Lift (L)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-red-500 inline-block" />
                <span>Drag (D)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                <span>Low P Suction</span>
              </span>
            </div>
          </div>

          {/* Quick Real-Time Telemetry Bar */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80">
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-center">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Lift Force</span>
              <span className="text-base font-bold text-green-400 font-mono tabular-nums">{liftNewtons.toLocaleString()} N</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-center">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Drag Force</span>
              <span className="text-base font-bold text-red-400 font-mono tabular-nums">{dragNewtons.toLocaleString()} N</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-center">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">L / D Ratio</span>
              <span className="text-base font-bold text-cyan-300 font-mono tabular-nums">{liftToDragRatio}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-center">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Stall Margin</span>
              <span className={`text-base font-bold font-mono tabular-nums ${isStalled ? 'text-red-400' : 'text-slate-200'}`}>
                {(stallAngle - angleDeg).toFixed(1)}°
              </span>
            </div>
          </div>
        </div>

        {/* Right Parameter Deck & Guided Challenges (5 cols) */}
        <div className="lg:col-span-5 p-5 space-y-6 bg-slate-900 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide">
              FLIGHT SYSTEM PARAMETERS
            </h3>

            {/* Slider 1: Angle of Attack */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Angle of Attack (α)</span>
                <span className="text-cyan-400 font-mono font-semibold tabular-nums">{angleDeg}°</span>
              </div>
              <input
                type="range"
                min="-4"
                max="22"
                step="0.5"
                value={angleDeg}
                onChange={(e) => {
                  setAngleDeg(parseFloat(e.target.value));
                  sound.playAeroTone(200 + parseFloat(e.target.value) * 15);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>-4°</span>
                <span>0°</span>
                <span>Critical Stall: ~{stallAngle.toFixed(0)}°</span>
                <span>22°</span>
              </div>
            </div>

            {/* Slider 2: Airspeed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Tunnel Airspeed (v)</span>
                <span className="text-cyan-400 font-mono font-semibold tabular-nums">{airspeed} m/s</span>
              </div>
              <input
                type="range"
                min="30"
                max="180"
                step="2"
                value={airspeed}
                onChange={(e) => {
                  setAirspeed(parseInt(e.target.value, 10));
                  sound.playAeroTone(150 + parseInt(e.target.value, 10) * 1.5);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>30 m/s (67 mph)</span>
                <span>100 m/s (223 mph)</span>
                <span>180 m/s (402 mph)</span>
              </div>
            </div>

            {/* Slider 3: Airfoil Camber */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Airfoil Camber (Curvature)</span>
                <span className="text-cyan-400 font-mono font-semibold tabular-nums">{camber}% chord</span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                step="1"
                value={camber}
                onChange={(e) => {
                  setCamber(parseInt(e.target.value, 10));
                  sound.playClick();
                }}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0% (Symmetric)</span>
                <span>7% (Transport)</span>
                <span>14% (High-Lift)</span>
              </div>
            </div>

            {/* Bernoulli Scientific Callout */}
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs space-y-1 text-slate-400">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Info className="w-3.5 h-3.5" />
                <span>Bernoulli Equation in Flight</span>
              </div>
              <p>
                As air traverses the curved upper surface, local velocity accelerates ({`v_upper > v_lower`}), creating negative gauge pressure.
                Dynamic Pressure: <code className="text-cyan-200 font-mono">q = ½ ρ v² = {Math.round(dynamicPressure)} Pa</code>.
              </p>
            </div>
          </div>

          {/* Student Mission Challenge Box */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                AERONAUTICAL LAB CHALLENGE
              </span>
              <div className="flex gap-1.5">
                {challenges.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveChallenge(idx);
                      setChallengeStatus('');
                    }}
                    className={`w-6 h-6 text-xs font-mono font-medium rounded transition-colors ${
                      activeChallenge === idx
                        ? 'bg-cyan-600 text-white'
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

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2">
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

            {challengeStatus && (
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-cyan-300">
                {challengeStatus}
              </div>
            )}

            <button
              onClick={handleEvaluateChallenge}
              className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              Verify Aerodynamic Telemetry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
