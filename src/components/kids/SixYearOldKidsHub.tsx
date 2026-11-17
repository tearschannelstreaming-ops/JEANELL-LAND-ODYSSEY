import React from 'react';
import {
  Sparkles,
  Volume2,
  Tv,
  Smile,
  ArrowRight,
  Globe,
  Gift,
  Crown,
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { PWAInstallButton, PWALiveLaunchTarget } from '../pwa/PWAInstallButton';
import {
  LanguageOption,
  SUPPORTED_LANGUAGES,
  UserPreferencesAndAvatarState,
  speakWithPersona,
  AVATAR_OUTFITS,
} from '../../data/languageAvatarData';
import { AvatarPortraitSVG } from '../onboarding/LanguageVoiceAvatarModal';

interface SixYearOldKidsHubProps {
  studentName: string;
  onNavigateToTab: (
    tab:
      | 'course'
      | 'workbook'
      | 'tears'
      | 'detroit'
      | 'affirmations'
      | 'labs'
  ) => void;
  onOpenVideoSplash?: () => void;
  onSpeakText?: (text: string) => void;
  userPrefs?: UserPreferencesAndAvatarState;
  currentLevel?: number;
  onOpenLanguageAvatarModal?: () => void;
  onCompleteLevelAndUnlockReward?: () => void;
  onPWALiveLaunch?: (target: PWALiveLaunchTarget) => void;
}

export const SixYearOldKidsHub: React.FC<SixYearOldKidsHubProps> = ({
  studentName,
  onNavigateToTab,
  onOpenVideoSplash,
  onSpeakText,
  userPrefs,
  currentLevel = 3,
  onOpenLanguageAvatarModal,
  onCompleteLevelAndUnlockReward,
  onPWALiveLaunch,
}) => {
  const activeLang: LanguageOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === userPrefs?.language) ||
    SUPPORTED_LANGUAGES[0];

  const equippedOutfit =
    AVATAR_OUTFITS.find((o) => o.id === userPrefs?.outfitId) || AVATAR_OUTFITS[0];

  const speak = (text: string) => {
    sound.playClick();
    if (userPrefs) {
      speakWithPersona(text, userPrefs.language, userPrefs.voicePersona);
      return;
    }
    if (onSpeakText) {
      onSpeakText(text);
      return;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.94;
      utterance.pitch = 1.15;
      window.speechSynthesis.speak(utterance);
    }
  };

  const kidFriendlyCards = [
    {
      id: 'abc_card',
      title: activeLang.ui.kidsCards.abcTitle,
      subtitle: activeLang.ui.kidsCards.abcSubtitle,
      emoji: '🔤',
      badge: 'ABC ★',
      color: 'from-amber-400 to-orange-500 text-slate-950',
      actionText: activeLang.ui.kidsCards.abcAction,
      soundPrompt: activeLang.ui.kidsCards.abcPrompt,
      tab: 'course' as const,
      imageCover: '/assets/aistudio/IMG_4808_05d783d1.PNG',
    },
    {
      id: 'video_card',
      title: activeLang.ui.kidsCards.tvTitle,
      subtitle: activeLang.ui.kidsCards.tvSubtitle,
      emoji: '📺',
      badge: 'T.E.A.R.S. TV',
      color: 'from-rose-500 to-pink-600 text-white',
      actionText: activeLang.ui.kidsCards.tvAction,
      soundPrompt: activeLang.ui.kidsCards.tvPrompt,
      isVideoTrigger: true,
      tab: 'tears' as const,
      videoPreview: '/assets/aistudio/T.E.A.R.S._Splash_Video_bc80f339.mp4',
    },
    {
      id: 'workbook_card',
      title: activeLang.ui.kidsCards.workbookTitle,
      subtitle: activeLang.ui.kidsCards.workbookSubtitle,
      emoji: '📖',
      badge: 'ABC Book',
      color: 'from-emerald-400 to-teal-500 text-slate-950',
      actionText: activeLang.ui.kidsCards.workbookAction,
      soundPrompt: activeLang.ui.kidsCards.workbookPrompt,
      tab: 'workbook' as const,
      imageCover: '/assets/aistudio/IMG_4808_05d783d1.PNG',
    },
    {
      id: 'magic_words_card',
      title: activeLang.ui.kidsCards.magicTitle,
      subtitle: activeLang.ui.kidsCards.magicSubtitle,
      emoji: '✨',
      badge: '+5% Buff',
      color: 'from-purple-400 to-indigo-500 text-white',
      actionText: activeLang.ui.kidsCards.magicAction,
      soundPrompt: activeLang.ui.kidsCards.magicPrompt,
      tab: 'affirmations' as const,
    },
    {
      id: 'toy_airplane_card',
      title: activeLang.ui.kidsCards.planeTitle,
      subtitle: activeLang.ui.kidsCards.planeSubtitle,
      emoji: '✈️',
      badge: 'Aero Lab',
      color: 'from-cyan-400 to-blue-500 text-slate-950',
      actionText: activeLang.ui.kidsCards.planeAction,
      soundPrompt: activeLang.ui.kidsCards.planePrompt,
      tab: 'labs' as const,
    },
    {
      id: 'detroit_city_card',
      title: activeLang.ui.kidsCards.mapTitle,
      subtitle: activeLang.ui.kidsCards.mapSubtitle,
      emoji: '🏙️',
      badge: 'Level 1',
      color: 'from-amber-300 via-yellow-400 to-orange-400 text-slate-950',
      actionText: activeLang.ui.kidsCards.mapAction,
      soundPrompt: activeLang.ui.kidsCards.mapPrompt,
      tab: 'detroit' as const,
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-6">
      {/* Friendly Big Hero Banner for 6-Year-Olds & Multilingual Learners */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 bg-gradient-to-r from-amber-400 via-rose-300 to-cyan-300 p-6 md:p-8 text-slate-950">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center lg:text-left space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 text-slate-950 text-xs font-black shadow-md uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span>
                  {activeLang.flag} {activeLang.nativeName} · Level {currentLevel}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-black shadow-md">
                <span>{equippedOutfit.emoji}</span>
                <span>{equippedOutfit.name}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-tight">
              {activeLang.ui.helloStudent}, {studentName}! {userPrefs?.personalEmoji || '🌟'}
            </h1>

            <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              {activeLang.ui.kidsHeroSubtitle}
            </p>

            {/* Primary Big Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <button
                onClick={() => speak(activeLang.voiceSampleText)}
                className="px-4 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>{activeLang.ui.hearFriendlyVoice}</span>
              </button>

              {onOpenLanguageAvatarModal && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenLanguageAvatarModal();
                  }}
                  className="px-4 py-3 rounded-2xl bg-indigo-700 hover:bg-indigo-600 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-cyan-300" />
                  <span>{activeLang.ui.languageAndAvatarBtn} 👗</span>
                </button>
              )}

              {onCompleteLevelAndUnlockReward && (
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onCompleteLevelAndUnlockReward();
                  }}
                  className="px-4 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Gift className="w-4 h-4 text-amber-300" />
                  <span>{activeLang.ui.levelUpButton}</span>
                </button>
              )}

              {onOpenVideoSplash && (
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onOpenVideoSplash();
                  }}
                  className="px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Tv className="w-4 h-4" />
                  <span>{activeLang.ui.playSplashMovie}</span>
                </button>
              )}

              <PWAInstallButton
                labelOverride={activeLang.ui.pwaLiveLinksBtn}
                onLiveLaunch={onPWALiveLaunch}
              />
            </div>
          </div>

          {/* Right Side: Live Custom Character Avatar + Official ABC Workbook Cover */}
          <div className="flex items-center gap-4 shrink-0">
            {userPrefs && (
              <div
                onClick={() => {
                  sound.playClick();
                  if (onOpenLanguageAvatarModal) onOpenLanguageAvatarModal();
                }}
                className="bg-slate-950/95 p-3.5 rounded-3xl border-4 border-white shadow-2xl flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform"
                title="Click to customize your Avatar, Facial Features, Outfits & Personal Emoji!"
              >
                <AvatarPortraitSVG prefs={userPrefs} size={92} />
                <span className="mt-2 text-xs font-black text-amber-300 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" /> Level {currentLevel}
                </span>
                <span className="text-[10px] font-bold text-cyan-300 underline">
                  Dress Up &amp; Emoji
                </span>
              </div>
            )}

            <div className="relative group hidden sm:block">
              <div className="w-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-300 bg-white">
                <img
                  src="/assets/aistudio/IMG_4808_05d783d1.PNG"
                  alt="ABC's of Financial Literacy Workbook Cover"
                  className="w-full h-auto object-cover"
                />
                <div className="p-2 bg-slate-900 text-white text-center text-[10px] font-black uppercase tracking-wider">
                  My Official ABC Book
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                ★ 1st
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Giant Friendly Navigation Buttons (Translated into User's Chosen Native Language) */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2 text-base font-black text-white">
            <Smile className="w-6 h-6 text-amber-400" />
            <span>{activeLang.ui.chooseActivity}</span>
          </div>
          <span className="text-xs text-amber-300 font-bold bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
            {activeLang.ui.touchAndPlay}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {kidFriendlyCards.map((card) => (
            <div
              key={card.id}
              className={`rounded-3xl p-5 md:p-6 bg-gradient-to-br ${card.color} shadow-xl border-4 border-white/40 flex flex-col justify-between transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group`}
              onClick={() => {
                speak(card.soundPrompt);
                if (card.isVideoTrigger && onOpenVideoSplash) {
                  onOpenVideoSplash();
                } else {
                  onNavigateToTab(card.tab);
                }
              }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">
                  {card.emoji}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(card.soundPrompt);
                    }}
                    className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors text-white"
                    title="Speak text in your chosen language"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>

                  <span className="px-3 py-1 rounded-full bg-black/25 text-white text-xs font-black uppercase tracking-wider">
                    {card.badge}
                  </span>
                </div>
              </div>

              {/* Cover Preview Image if available */}
              {card.imageCover && (
                <div className="mb-3 rounded-2xl overflow-hidden border-2 border-black/15 shadow-md bg-white aspect-[16/9] flex items-center justify-center">
                  <img
                    src={card.imageCover}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Video Preview Badge if video */}
              {card.videoPreview && (
                <div className="mb-3 rounded-2xl overflow-hidden border-2 border-black/15 shadow-md bg-slate-950 aspect-[16/9] relative flex items-center justify-center">
                  <video
                    src={card.videoPreview}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      ▶
                    </div>
                  </div>
                </div>
              )}

              {/* Text Info */}
              <div className="space-y-1 mb-4">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm font-bold opacity-90 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>

              {/* Big Bottom Action Button */}
              <div className="pt-2">
                <button className="w-full py-3.5 px-5 rounded-2xl bg-black/30 hover:bg-black/40 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-colors">
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
