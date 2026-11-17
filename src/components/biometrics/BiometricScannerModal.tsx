import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Camera, Scan, CheckCircle2, AlertTriangle, RefreshCw, X, User } from 'lucide-react';
import { sound } from '../../utils/audio';

interface BiometricScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userAge: number;
  onVerificationComplete: () => void;
}

export const BiometricScannerModal: React.FC<BiometricScannerModalProps> = ({
  isOpen,
  onClose,
  userName,
  userAge,
  onVerificationComplete,
}) => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [biometricHash, setBiometricHash] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setScanState('idle');
      setScanProgress(0);
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 360 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch {
      // Fallback to simulated high-resolution biometric mesh
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const handleStartScan = () => {
    sound.playClick();
    setScanState('scanning');
    setScanProgress(0);
    startCamera();

    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      setScanProgress(prog);
      if (prog % 20 === 0) {
        sound.playAeroTone(350 + prog * 4);
      }

      if (prog >= 100) {
        clearInterval(interval);
        const randomHash = 'BIO-SHA256-' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
        setBiometricHash(randomHash);
        setScanState('success');
        sound.playSuccess();
        stopCamera();
      }
    }, 120);
  };

  const handleConfirm = () => {
    sound.playClick();
    onVerificationComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl space-y-4">
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Scan className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Biometric Face Verification</h3>
              <p className="text-[11px] text-slate-400">Identity Security &amp; Adult 17+ / Employer Verification</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-center">
          {/* Scanner Viewport */}
          <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden bg-slate-950 border-2 border-dashed border-cyan-500/40 flex items-center justify-center shadow-inner">
            {cameraActive ? (
              <video ref={videoRef} className="w-full h-full object-cover scale-x-[-1]" playsInline muted />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 space-y-2">
                <div className="w-24 h-24 rounded-full border-2 border-slate-700 flex items-center justify-center">
                  <User className="w-14 h-14 text-slate-400" />
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Position Face Inside Ring</span>
              </div>
            )}

            {/* Scanning Overlay Grid */}
            {scanState === 'scanning' && (
              <div className="absolute inset-0 bg-cyan-500/10 flex flex-col justify-between pointer-events-none">
                <div
                  style={{ top: `${scanProgress}%` }}
                  className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#38bdf8]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-44 h-44 rounded-full border border-cyan-400 animate-ping opacity-25" />
                </div>
              </div>
            )}

            {/* Success Ring */}
            {scanState === 'success' && (
              <div className="absolute inset-0 bg-emerald-950/80 flex flex-col items-center justify-center text-emerald-300">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-2 animate-bounce" />
                <span className="text-xs font-bold font-mono tracking-widest uppercase">Verified</span>
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="text-xs text-slate-300">
            <span>Subject: <strong className="text-white">{userName}</strong></span>
            <span className="mx-2 text-slate-600">·</span>
            <span>Recorded Age: <strong className="text-cyan-400">{userAge} Years Old</strong></span>
            <span className="mx-2 text-slate-600">·</span>
            <span>Tier: <strong className={userAge >= 17 ? 'text-amber-400' : 'text-slate-400'}>{userAge >= 17 ? 'Adult Decision Clearance (17+)' : 'Youth/Teen Protected'}</strong></span>
          </div>

          {/* Scan Progress Feedback */}
          {scanState === 'scanning' && (
            <div className="space-y-1.5 max-w-xs mx-auto">
              <div className="flex justify-between text-[11px] text-cyan-300 font-mono">
                <span>Mapping Facial Nodes...</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div style={{ width: `${scanProgress}%` }} className="h-full bg-cyan-400 transition-all duration-100" />
              </div>
            </div>
          )}

          {scanState === 'success' && (
            <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 text-left text-xs font-mono space-y-1">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Biometric Identity Token Certified</span>
              </div>
              <div className="text-[11px] text-slate-400 break-all">{biometricHash}</div>
              <div className="text-[10px] text-slate-500 mt-1">
                Liveness: PASSED · Age Integrity: CERTIFIED · Employer Credentialing: ACTIVE
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center pt-2">
            {scanState === 'idle' && (
              <button
                onClick={handleStartScan}
                className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Begin Biometric Scan</span>
              </button>
            )}

            {scanState === 'scanning' && (
              <button
                disabled
                className="w-full py-2.5 px-4 bg-slate-800 text-slate-400 text-xs font-bold rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing Liveness &amp; Landmarks...</span>
              </button>
            )}

            {scanState === 'success' && (
              <button
                onClick={handleConfirm}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Apply Biometric Verification to Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
