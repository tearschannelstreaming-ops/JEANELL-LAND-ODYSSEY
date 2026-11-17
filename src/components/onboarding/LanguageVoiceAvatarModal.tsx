import React, { useState } from 'react';
import {
  Globe,
  Volume2,
  Sparkles,
  Award,
  Check,
  Lock,
  X,
  Smile,
  Shirt,
  Crown,
  Gift,
  ArrowRight,
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  VOICE_PERSONAS,
  AVATAR_OUTFITS,
  FACIAL_FEATURES,
  PERSONAL_EMOJIS,
  SKIN_TONES,
  UserPreferencesAndAvatarState,
  SupportedLanguageCode,
  VoicePersonaId,
  speakWithPersona,
} from '../../data/languageAvatarData';
import { sound } from '../../utils/audio';

export const AvatarPortraitSVG: React.FC<{
  prefs: UserPreferencesAndAvatarState;
  size?: number;
  showEmojiBadge?: boolean;
}> = ({ prefs, size = 72, showEmojiBadge = true }) => {
  const outfit =
    AVATAR_OUTFITS.find((o) => o.id === prefs.outfitId) || AVATAR_OUTFITS[0];

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0 select-none"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className="rounded-2xl shadow-lg border-2 border-cyan-400/60 bg-slate-950 overflow-hidden"
      >
        <defs>
          <radialGradient id="avatarBg" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="120" height="120" fill="url(#avatarBg)" />
        <circle
          cx="60"
          cy="56"
          r="48"
          fill="none"
          stroke={outfit.secondaryColor}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.45"
        />

        {/* Outfit / Shoulders & Torso */}
        <path
          d="M 20,120 C 20,88 38,80 60,80 C 82,80 100,88 100,120 Z"
          fill={outfit.primaryColor}
          stroke={outfit.secondaryColor}
          strokeWidth="2.5"
        />
        {/* Outfit Lapel / Collar Detail */}
        <path
          d="M 46,81 L 60,98 L 74,81"
          fill="none"
          stroke={outfit.secondaryColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Outfit Chest Badge Text */}
        <rect
          x="36"
          y="102"
          width="48"
          height="12"
          rx="4"
          fill="#020617"
          opacity="0.75"
        />
        <text
          x="60"
          y="110.5"
          fontSize="6.5"
          fontWeight="900"
          fill={outfit.secondaryColor}
          textAnchor="middle"
          fontFamily="monospace"
        >
          {outfit.accentLabel}
        </text>

        {/* Neck */}
        <rect
          x="52"
          y="68"
          width="16"
          height="16"
          rx="6"
          fill={prefs.skinTone}
        />

        {/* Back Hair for puffs / braids / locs */}
        {prefs.hairId === 'hair_puffs' && (
          <>
            <circle cx="28" cy="34" r="14" fill="#1c1917" />
            <circle cx="92" cy="34" r="14" fill="#1c1917" />
          </>
        )}
        {(prefs.hairId === 'hair_braids' || prefs.hairId === 'hair_locs') && (
          <path
            d="M 30,42 C 24,60 26,82 32,92 M 90,42 C 96,60 94,82 88,92"
            stroke="#1c1917"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Head / Face */}
        <circle
          cx="60"
          cy="50"
          r="25"
          fill={prefs.skinTone}
          stroke="#0f172a"
          strokeWidth="1.5"
        />

        {/* Cheek Blush */}
        <ellipse cx="44" cy="55" rx="4" ry="2.2" fill="#f43f5e" opacity="0.3" />
        <ellipse cx="76" cy="55" rx="4" ry="2.2" fill="#f43f5e" opacity="0.3" />

        {/* Top Hair / Crown */}
        {prefs.hairId === 'hair_curls' && (
          <path
            d="M 34,44 C 32,26 46,18 60,18 C 74,18 88,26 86,44 C 78,34 42,34 34,44 Z"
            fill="#1c1917"
          />
        )}
        {prefs.hairId === 'hair_braids' && (
          <path
            d="M 35,44 C 35,24 48,20 60,20 C 72,20 85,24 85,44 C 76,34 44,34 35,44 Z"
            fill="#1c1917"
          />
        )}
        {prefs.hairId === 'hair_fade' && (
          <path
            d="M 37,40 C 38,25 48,22 60,22 C 72,22 82,25 83,40 Z"
            fill="#1c1917"
          />
        )}
        {prefs.hairId === 'hair_puffs' && (
          <path
            d="M 36,42 C 38,26 48,22 60,22 C 72,22 82,26 84,42 Z"
            fill="#1c1917"
          />
        )}
        {prefs.hairId === 'hair_locs' && (
          <path
            d="M 34,44 C 34,22 48,18 60,18 C 72,18 86,22 86,44 Z"
            fill="#292524"
          />
        )}
        {prefs.hairId === 'hair_gold_crown' && (
          <>
            <path
              d="M 36,42 C 38,26 48,22 60,22 C 72,22 82,26 84,42 Z"
              fill="#1c1917"
            />
            <polygon
              points="40,28 46,12 54,22 60,10 66,22 74,12 80,28"
              fill="#fbbf24"
              stroke="#fef08a"
              strokeWidth="1.5"
            />
          </>
        )}

        {/* Eyes */}
        {prefs.eyesId === 'eyes_wink' ? (
          <>
            <circle cx="49" cy="48" r="3.2" fill="#0f172a" />
            <circle cx="48" cy="47" r="1.1" fill="#ffffff" />
            <path
              d="M 67,48 Q 71,44 75,48"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        ) : prefs.eyesId === 'eyes_starry' ? (
          <>
            <circle cx="49" cy="48" r="3.6" fill="#0f172a" />
            <circle cx="48" cy="46.8" r="1.5" fill="#fde047" />
            <circle cx="71" cy="48" r="3.6" fill="#0f172a" />
            <circle cx="70" cy="46.8" r="1.5" fill="#fde047" />
          </>
        ) : (
          <>
            <circle cx="49" cy="48" r="3.2" fill="#0f172a" />
            <circle cx="48" cy="47" r="1.2" fill="#ffffff" />
            <circle cx="71" cy="48" r="3.2" fill="#0f172a" />
            <circle cx="70" cy="47" r="1.2" fill="#ffffff" />
          </>
        )}

        {/* Eyewear / Goggles / Visor */}
        {prefs.eyewearId === 'eyewear_scholar' && (
          <g stroke="#38bdf8" strokeWidth="2" fill="none">
            <rect x="41" y="43" width="15" height="10" rx="3" />
            <rect x="64" y="43" width="15" height="10" rx="3" />
            <line x1="56" y1="48" x2="64" y2="48" />
          </g>
        )}
        {prefs.eyewearId === 'eyewear_aviator' && (
          <g stroke="#f59e0b" strokeWidth="2.2" fill="#0284c7" fillOpacity="0.35">
            <rect x="40" y="42" width="17" height="11" rx="5" />
            <rect x="63" y="42" width="17" height="11" rx="5" />
            <line x1="57" y1="47" x2="63" y2="47" />
          </g>
        )}
        {prefs.eyewearId === 'eyewear_broker_gold' && (
          <g stroke="#fbbf24" strokeWidth="2.2" fill="#0f172a" fillOpacity="0.65">
            <rect x="40" y="43" width="16" height="10" rx="2" />
            <rect x="64" y="43" width="16" height="10" rx="2" />
            <line x1="56" y1="48" x2="64" y2="48" />
          </g>
        )}
        {prefs.eyewearId === 'eyewear_holo_visor' && (
          <rect
            x="38"
            y="42"
            width="44"
            height="11"
            rx="5"
            fill="#22d3ee"
            fillOpacity="0.65"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        )}

        {/* Smile / Mouth Expression */}
        {prefs.smileId === 'smile_joyful' || prefs.smileId === 'smile_royal' ? (
          <path
            d="M 50,58 Q 60,67 70,58 Z"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="1.5"
          />
        ) : prefs.smileId === 'smile_determined' ? (
          <path
            d="M 52,61 Q 60,59 68,61"
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M 51,59 Q 60,65 69,59"
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </svg>

      {showEmojiBadge && (
        <span
          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-amber-400 flex items-center justify-center text-xs shadow-md"
          title="Personal Emoji Badge"
        >
          {prefs.personalEmoji}
        </span>
      )}
    </div>
  );
};

interface LanguageVoiceAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefs: UserPreferencesAndAvatarState;
  onUpdatePrefs: (next: UserPreferencesAndAvatarState) => void;
  currentLevel: number;
  onCompleteLevelAndUnlockReward: () => void;
  recentUnlockBanner?: string | null;
}

export const LanguageVoiceAvatarModal: React.FC<LanguageVoiceAvatarModalProps> = ({
  isOpen,
  onClose,
  prefs,
  onUpdatePrefs,
  currentLevel,
  onCompleteLevelAndUnlockReward,
  recentUnlockBanner,
}) => {
  const [activeTab, setActiveTab] = useState<'language' | 'voice' | 'avatar'>('language');

  if (!isOpen) return null;

  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === prefs.language) || SUPPORTED_LANGUAGES[0];

  const handleSelectLanguage = (code: SupportedLanguageCode) => {
    sound.playSuccess();
    const chosen =
      SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
    const next = { ...prefs, language: code, hasCompletedInitialSetup: true };
    onUpdatePrefs(next);
    speakWithPersona(chosen.welcomeGreeting, code, prefs.voicePersona);
  };

  const handleSelectVoice = (voiceId: VoicePersonaId) => {
    sound.playSuccess();
    const next = { ...prefs, voicePersona: voiceId, hasCompletedInitialSetup: true };
    onUpdatePrefs(next);
    speakWithPersona(currentLang.voiceSampleText, prefs.language, voiceId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl overflow-hidden my-6 text-slate-100">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <AvatarPortraitSVG prefs={prefs} size={68} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  LEVEL {currentLevel} SCHOLAR · {currentLang.flag} {currentLang.nativeName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  VOICE &amp; AVATAR STUDIO
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Choose Native Language, Voice Guide &amp; Level-Up Avatar
              </h2>
              <p className="text-xs text-slate-300">
                Navigate effortlessly in your native language and unlock new outfits, facial features, and personal emojis as you complete levels!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onUpdatePrefs({ ...prefs, hasCompletedInitialSetup: true });
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Optional Celebration Banner when a new Level Outfit/Feature is unlocked */}
        {recentUnlockBanner && (
          <div className="px-6 py-3 bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>{recentUnlockBanner}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-mono uppercase">
              Unlocked!
            </span>
          </div>
        )}

        {/* 3 Big Step Tabs */}
        <div className="grid grid-cols-3 gap-2 px-6 pt-4 bg-slate-950 border-b border-slate-800">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('language');
            }}
            className={`py-3 px-3 rounded-t-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-b-4 transition-all cursor-pointer ${
              activeTab === 'language'
                ? 'border-cyan-400 bg-slate-900 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>1. Native Language ({currentLang.flag})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('voice');
            }}
            className={`py-3 px-3 rounded-t-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-b-4 transition-all cursor-pointer ${
              activeTab === 'voice'
                ? 'border-amber-400 bg-slate-900 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>2. Voice Choices 🔊</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('avatar');
            }}
            className={`py-3 px-3 rounded-t-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-b-4 transition-all cursor-pointer ${
              activeTab === 'avatar'
                ? 'border-emerald-400 bg-slate-900 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>3. Emojis, Face &amp; Outfits 👗</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[58vh] overflow-y-auto space-y-5">
          {/* TAB 1: NATIVE LANGUAGE */}
          {activeTab === 'language' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-sm font-black text-white">
                    Select Your Native Language (Translates Navigation &amp; Voice Read-Aloud)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Click any language card below to switch app navigation and hear a live voice welcome!
                  </p>
                </div>
                <button
                  onClick={() =>
                    speakWithPersona(
                      currentLang.voiceSampleText,
                      prefs.language,
                      prefs.voicePersona
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Speak in {currentLang.nativeName}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = prefs.language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{lang.flag}</span>
                        <div>
                          <div className="font-black text-sm text-white">
                            {lang.nativeName}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {lang.name} · {lang.regionLabel}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: VOICE CHOICES */}
          {activeTab === 'voice' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black text-white">
                    Choose Your Interactive Voice Guide ({currentLang.flag} {currentLang.nativeName})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your selected voice guide reads phonics cards, affirmations, and navigation aloud in your native language.
                  </p>
                </div>
                <button
                  onClick={() =>
                    speakWithPersona(
                      currentLang.voiceSampleText,
                      prefs.language,
                      prefs.voicePersona
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Test Active Voice Guide 🔊</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VOICE_PERSONAS.map((persona) => {
                  const isSelected = prefs.voicePersona === persona.id;
                  return (
                    <div
                      key={persona.id}
                      onClick={() => handleSelectVoice(persona.id)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-400 text-white shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl bg-slate-900 p-2.5 rounded-2xl border border-slate-700">
                            {persona.emoji}
                          </span>
                          <div>
                            <h4 className="font-black text-base text-white">
                              {persona.name}
                            </h4>
                            <span className="text-xs text-amber-300 font-semibold">
                              {persona.role}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                            Active Voice
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {persona.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                        <span>
                          Pitch: {persona.pitch}x · Speed: {persona.rate}x
                        </span>
                        <span className="text-cyan-400 font-bold flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5" /> Tap to Hear Sample
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PERSONAL EMOJIS, FACIAL FEATURES & LEVEL-UNLOCKED OUTFITS */}
          {activeTab === 'avatar' && (
            <div className="space-y-6">
              {/* Top Live Preview & Level Completion Reward Trigger */}
              <div className="bg-gradient-to-r from-indigo-950/90 via-slate-950 to-emerald-950/80 p-5 rounded-2xl border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <AvatarPortraitSVG prefs={prefs} size={96} />
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase border border-emerald-500/40">
                      <Award className="w-3.5 h-3.5" />
                      <span>Current Character Level: {currentLevel}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      Personal Emojis, Facial Features &amp; Level Wardrobe
                    </h3>
                    <p className="text-xs text-slate-300 max-w-md">
                      Complete levels across the Academy to unlock exclusive outfits, pilot goggles, golden crowns, and personal emojis!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playSuccess();
                    onCompleteLevelAndUnlockReward();
                  }}
                  className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-transform hover:scale-105 cursor-pointer shrink-0"
                >
                  <Gift className="w-5 h-5" />
                  <span>Complete Level {currentLevel} &amp; Unlock Next Outfit! 🎁</span>
                </button>
              </div>

              {/* 1. Personal Emojis */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                    <Smile className="w-4 h-4" />
                    <span>Personal Emoji Badge (Earned by Level)</span>
                  </h4>
                  <span className="text-xs text-slate-400">
                    Selected: <strong className="text-lg">{prefs.personalEmoji}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {PERSONAL_EMOJIS.map((item) => {
                    const isUnlocked = currentLevel >= item.unlockLevel;
                    const isSelected = prefs.personalEmoji === item.emoji;
                    return (
                      <button
                        key={item.emoji}
                        disabled={!isUnlocked}
                        onClick={() => {
                          sound.playClick();
                          onUpdatePrefs({ ...prefs, personalEmoji: item.emoji });
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          !isUnlocked
                            ? 'bg-slate-900/40 border-slate-800/80 opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-white cursor-pointer shadow-md'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-600 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">
                              {item.label}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              Lvl {item.unlockLevel}
                            </div>
                          </div>
                        </div>
                        {!isUnlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Level-Unlocked Outfits */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase text-cyan-300 font-bold flex items-center gap-1.5">
                  <Shirt className="w-4 h-4" />
                  <span>Outfits Earned Upon Level Completion</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {AVATAR_OUTFITS.map((outfit) => {
                    const isUnlocked = currentLevel >= outfit.unlockLevel;
                    const isSelected = prefs.outfitId === outfit.id;
                    return (
                      <button
                        key={outfit.id}
                        disabled={!isUnlocked}
                        onClick={() => {
                          sound.playSuccess();
                          onUpdatePrefs({ ...prefs, outfitId: outfit.id });
                        }}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 ${
                          !isUnlocked
                            ? 'bg-slate-900/40 border-slate-800 opacity-60 cursor-not-allowed'
                            : isSelected
                            ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg cursor-pointer'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-600 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-2xl">{outfit.emoji}</span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              isUnlocked
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {isUnlocked ? `✓ Lvl ${outfit.unlockLevel}` : `🔒 Lvl ${outfit.unlockLevel}`}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-black text-white">
                            {outfit.name}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {outfit.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Skin Complexion & Facial Features (Hair, Eyes, Eyewear, Smile) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skin Tone & Hairstyle */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-xs font-mono uppercase text-emerald-300 font-bold">
                    Complexion &amp; Hairstyle / Crown
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {SKIN_TONES.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => {
                          sound.playClick();
                          onUpdatePrefs({ ...prefs, skinTone: tone.color });
                        }}
                        title={tone.label}
                        style={{ backgroundColor: tone.color }}
                        className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                          prefs.skinTone === tone.color
                            ? 'border-white scale-115 ring-2 ring-cyan-400'
                            : 'border-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {FACIAL_FEATURES.filter((f) => f.category === 'hair').map((item) => {
                      const isUnlocked = currentLevel >= item.unlockLevel;
                      const isSelected = prefs.hairId === item.id;
                      return (
                        <button
                          key={item.id}
                          disabled={!isUnlocked}
                          onClick={() => {
                            sound.playClick();
                            onUpdatePrefs({ ...prefs, hairId: item.id });
                          }}
                          className={`p-2 rounded-xl border text-xs flex items-center justify-between ${
                            !isUnlocked
                              ? 'bg-slate-900/40 border-slate-800 opacity-50 cursor-not-allowed'
                              : isSelected
                              ? 'bg-emerald-950/60 border-emerald-400 text-white font-bold cursor-pointer'
                              : 'bg-slate-900 border-slate-800 text-slate-300 cursor-pointer'
                          }`}
                        >
                          <span className="truncate">
                            {item.emoji} {item.name}
                          </span>
                          {!isUnlocked && (
                            <span className="text-[10px] font-mono text-amber-400">
                              L{item.unlockLevel}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Eyewear, Eyes & Smile */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-xs font-mono uppercase text-purple-300 font-bold">
                    Facial Features: Eyewear, Eyes &amp; Smile
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {FACIAL_FEATURES.filter(
                      (f) => f.category === 'eyewear' || f.category === 'eyes' || f.category === 'smile'
                    ).map((item) => {
                      const isUnlocked = currentLevel >= item.unlockLevel;
                      const isSelected =
                        prefs.eyewearId === item.id ||
                        prefs.eyesId === item.id ||
                        prefs.smileId === item.id;
                      return (
                        <button
                          key={item.id}
                          disabled={!isUnlocked}
                          onClick={() => {
                            sound.playClick();
                            if (item.category === 'eyewear') {
                              onUpdatePrefs({ ...prefs, eyewearId: item.id });
                            } else if (item.category === 'eyes') {
                              onUpdatePrefs({ ...prefs, eyesId: item.id });
                            } else {
                              onUpdatePrefs({ ...prefs, smileId: item.id });
                            }
                          }}
                          className={`p-2 rounded-xl border text-xs flex items-center justify-between ${
                            !isUnlocked
                              ? 'bg-slate-900/40 border-slate-800 opacity-50 cursor-not-allowed'
                              : isSelected
                              ? 'bg-purple-950/60 border-purple-400 text-white font-bold cursor-pointer'
                              : 'bg-slate-900 border-slate-800 text-slate-300 cursor-pointer'
                          }`}
                        >
                          <span className="truncate">
                            {item.emoji} {item.name}
                          </span>
                          {!isUnlocked && (
                            <span className="text-[10px] font-mono text-amber-400">
                              L{item.unlockLevel}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Active Language: <strong className="text-white">{currentLang.flag} {currentLang.nativeName}</strong> · Level {currentLevel} Avatar Equipped
          </div>
          <button
            onClick={() => {
              sound.playSuccess();
              onUpdatePrefs({ ...prefs, hasCompletedInitialSetup: true });
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <span>Save &amp; Start Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
