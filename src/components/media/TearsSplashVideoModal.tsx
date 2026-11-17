import React, { useRef } from 'react';
import { Tv, X, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface TearsSplashVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  onRewardPlayer?: () => void;
}

export const TearsSplashVideoModal: React.FC<TearsSplashVideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc = '/assets/aistudio/T.E.A.R.S._Splash_Video_bc80f339.mp4',
  onRewardPlayer,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border-4 border-rose-500/60 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-rose-950 via-slate-950 to-rose-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-md">
              <Tv className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                T.E.A.R.S. Channel Splash Video 🎬
              </h3>
              <p className="text-xs text-rose-300">
                Official Welcome to the Experience
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="p-4 bg-slate-950 flex flex-col items-center justify-center">
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border-2 border-slate-800 shadow-2xl relative">
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
              onEnded={() => {
                sound.playSuccess();
                if (onRewardPlayer) onRewardPlayer();
              }}
            />
          </div>

          {/* Child-Friendly Subtitle Banner */}
          <div className="mt-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between w-full text-xs text-rose-200 font-bold">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Watch the movie to earn +5 Kids Stars &amp; Smart Cash!</span>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                if (onRewardPlayer) onRewardPlayer();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md transition-colors"
            >
              Done Watching! ★
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
