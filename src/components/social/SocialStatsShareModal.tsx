import React, { useState, useRef, useEffect } from 'react';
import {
  Share2,
  Download,
  Copy,
  Check,
  Sparkles,
  Heart,
  Rocket,
  Shield,
  Award,
  Zap,
  TrendingUp,
  X,
  ExternalLink,
  MessageCircle,
  Linkedin,
  Twitter,
  Palette,
  Camera,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { PlayerStats, StudentProfile } from '../../types/game';
import { ResilienceStreakState } from '../../data/dailyMissionData';
import { sound } from '../../utils/audio';

interface SocialStatsShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  profile: StudentProfile;
  streak?: ResilienceStreakState;
  onRewardPlayer?: (bonus: Partial<PlayerStats>) => void;
}

type CardTheme = 'cyber' | 'gold' | 'emerald' | 'blueprint';

const QUOTES = [
  "Resilience isn't just surviving the turbulence; it's engineering the wings to climb above it.",
  "From teen mother & cab driver to aeronautical engineer — you hold the blueprints to your own destiny.",
  "True wealth is turning personal crucibles into community launchpads.",
  "Building Detroit aviation, sovereign wealth, and generational legacy step by step.",
];

export const SocialStatsShareModal: React.FC<SocialStatsShareModalProps> = ({
  isOpen,
  onClose,
  stats,
  profile,
  streak,
  onRewardPlayer,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>('cyber');
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(0);
  const [customQuote, setCustomQuote] = useState('');
  const [isCopiedText, setIsCopiedText] = useState(false);
  const [isCopiedImage, setIsCopiedImage] = useState(false);
  const [hasClaimedBonus, setHasClaimedBonus] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareSuccessMessage, setShareSuccessMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const quoteText = customQuote.trim() || QUOTES[selectedQuoteIndex];

  // Resilience status badge helper
  const getResilienceStatus = (res: number) => {
    if (res >= 90) return { label: 'Transcendent Peak ⚡', color: '#fbbf24', sub: 'Unstoppable Momentum' };
    if (res >= 80) return { label: 'Peak Flow 🚀', color: '#34d399', sub: 'Unshakable Fortitude' };
    if (res >= 60) return { label: 'Steadfast Focus 🛡️', color: '#38bdf8', sub: 'Calculated Mastery' };
    if (res >= 40) return { label: 'Rising Fortitude 🌱', color: '#a78bfa', sub: 'Grit in Progress' };
    return { label: 'Forging Resolve 🔨', color: '#f87171', sub: 'Crucible Stage' };
  };

  // STEAM status helper
  const getSteamStatus = (steam: number) => {
    if (steam >= 85) return { label: 'Master Propulsion Architect', grade: 'A+' };
    if (steam >= 70) return { label: 'Senior Aeronautical Designer', grade: 'A' };
    if (steam >= 50) return { label: 'Aerospace Systems Fellow', grade: 'B+' };
    if (steam >= 30) return { label: 'Apprentice Wind Tunnel Tester', grade: 'B' };
    return { label: 'Initiate Flight Cadet', grade: 'C+' };
  };

  const resStatus = getResilienceStatus(stats.resilience);
  const steamStatus = getSteamStatus(stats.steamMastery);

  // Render high-res 1200x630 social card onto HTML5 Canvas
  const drawCardToCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    // Theme color definitions
    const themes = {
      cyber: {
        bgStart: '#030712',
        bgEnd: '#0f172a',
        accent: '#06b6d4',
        accentLight: '#67e8f9',
        secondary: '#38bdf8',
        cardBg: 'rgba(15, 23, 42, 0.82)',
        border: 'rgba(6, 182, 212, 0.35)',
        badgeBg: 'rgba(6, 182, 212, 0.15)',
        gridColor: 'rgba(6, 182, 212, 0.05)',
      },
      gold: {
        bgStart: '#0f0c05',
        bgEnd: '#1c1507',
        accent: '#f59e0b',
        accentLight: '#fde047',
        secondary: '#fbbf24',
        cardBg: 'rgba(28, 21, 7, 0.85)',
        border: 'rgba(245, 158, 11, 0.4)',
        badgeBg: 'rgba(245, 158, 11, 0.15)',
        gridColor: 'rgba(245, 158, 11, 0.05)',
      },
      emerald: {
        bgStart: '#021a14',
        bgEnd: '#062d24',
        accent: '#10b981',
        accentLight: '#6ee7b7',
        secondary: '#34d399',
        cardBg: 'rgba(6, 45, 36, 0.85)',
        border: 'rgba(16, 185, 129, 0.35)',
        badgeBg: 'rgba(16, 185, 129, 0.15)',
        gridColor: 'rgba(16, 185, 129, 0.06)',
      },
      blueprint: {
        bgStart: '#051329',
        bgEnd: '#0b2447',
        accent: '#3b82f6',
        accentLight: '#93c5fd',
        secondary: '#60a5fa',
        cardBg: 'rgba(11, 36, 71, 0.88)',
        border: 'rgba(59, 130, 246, 0.4)',
        badgeBg: 'rgba(59, 130, 246, 0.15)',
        gridColor: 'rgba(59, 130, 246, 0.07)',
      },
    };

    const currentTheme = themes[selectedTheme];

    // Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, currentTheme.bgStart);
    bgGradient.addColorStop(1, currentTheme.bgEnd);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative Blueprint Grid
    ctx.strokeStyle = currentTheme.gridColor;
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Glowing Radial Orbs in corners
    const glow1 = ctx.createRadialGradient(150, 100, 10, 150, 100, 300);
    glow1.addColorStop(0, currentTheme.accent + '33');
    glow1.addColorStop(1, 'transparent');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, 450, 400);

    const glow2 = ctx.createRadialGradient(width - 150, height - 100, 10, width - 150, height - 100, 350);
    glow2.addColorStop(0, currentTheme.secondary + '25');
    glow2.addColorStop(1, 'transparent');
    ctx.fillStyle = glow2;
    ctx.fillRect(width - 500, height - 450, 500, 450);

    // Outer Card Border
    ctx.strokeStyle = currentTheme.border;
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Header Zone
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('S.T.E.A.Reality', 60, 85);

    ctx.fillStyle = currentTheme.accentLight;
    ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
    ctx.fillText('DETROIT S.T.E.A.M. & AVIATION · AEROSPACE TELEMETRY DOCKET', 60, 115);

    // Top Right Verified Badge
    const badgeText = profile.isBiometricallyVerified
      ? '✓ BIOMETRICALLY VERIFIED PILOT'
      : '★ CERTIFIED APPRENTICE';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, monospace';
    const badgeWidth = ctx.measureText(badgeText).width + 30;
    ctx.fillStyle = currentTheme.badgeBg;
    ctx.beginPath();
    ctx.roundRect(width - 60 - badgeWidth, 60, badgeWidth, 34, 8);
    ctx.fill();
    ctx.strokeStyle = currentTheme.accent;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = currentTheme.accentLight;
    ctx.fillText(badgeText, width - 60 - badgeWidth + 15, 82);

    // Student Identity Plate + Active Streak Callout
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`${profile.name || 'Flight Student'}`, 60, 175);

    const streakCallout = streak
      ? ` · ${streak.streakBadge.emoji} ${streak.currentStreakDays}-Day Streak (${streak.multiplier}x Boost)`
      : '';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(
      `${profile.characterTitle || 'Senior Flight Systems Engineer'} · Level ${profile.characterLevel || 3}${streakCallout} · Detroit, MI`,
      60,
      202
    );

    // ==========================================
    // Primary Metric 1: Resilience Meter Card
    // ==========================================
    const card1X = 60;
    const card1Y = 230;
    const cardW = 520;
    const cardH = 200;

    // Card background
    ctx.fillStyle = currentTheme.cardBg;
    ctx.beginPath();
    ctx.roundRect(card1X, card1Y, cardW, cardH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Resilience Header
    ctx.fillStyle = '#fda4af';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('❤️ RESILIENCE SCORE', card1X + 25, card1Y + 45);

    // Numeric resilience value
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText(`${stats.resilience}%`, card1X + 25, card1Y + 115);

    // Resilience Tier Badge
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, monospace';
    const resLabel = resStatus.label;
    const resBadgeW = ctx.measureText(resLabel).width + 20;
    ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
    ctx.beginPath();
    ctx.roundRect(card1X + cardW - 25 - resBadgeW, card1Y + 25, resBadgeW, 28, 6);
    ctx.fill();
    ctx.fillStyle = '#fda4af';
    ctx.fillText(resLabel, card1X + cardW - 25 - resBadgeW + 10, card1Y + 44);

    // Resilience Progress Bar Background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.beginPath();
    ctx.roundRect(card1X + 25, card1Y + 135, cardW - 50, 16, 8);
    ctx.fill();

    // Resilience Progress Bar Fill
    const resFillW = Math.max(10, ((cardW - 50) * Math.min(100, stats.resilience)) / 100);
    const resGradient = ctx.createLinearGradient(card1X + 25, 0, card1X + 25 + resFillW, 0);
    resGradient.addColorStop(0, '#f43f5e');
    resGradient.addColorStop(1, '#fb7185');
    ctx.fillStyle = resGradient;
    ctx.beginPath();
    ctx.roundRect(card1X + 25, card1Y + 135, resFillW, 16, 8);
    ctx.fill();

    // Subtitle note
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`Mental Fortitude · ${resStatus.sub} · Adaptive Telemetry`, card1X + 25, card1Y + 175);

    // ==========================================
    // Primary Metric 2: STEAM Mastery Card
    // ==========================================
    const card2X = 620;
    const card2Y = 230;

    // Card background
    ctx.fillStyle = currentTheme.cardBg;
    ctx.beginPath();
    ctx.roundRect(card2X, card2Y, cardW, cardH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // STEAM Header
    ctx.fillStyle = '#67e8f9';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('🚀 S.T.E.A.M. MASTERY', card2X + 25, card2Y + 45);

    // Numeric STEAM value
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText(`${stats.steamMastery}%`, card2X + 25, card2Y + 115);

    // STEAM Tier Badge
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, monospace';
    const steamLabel = `Rank: ${steamStatus.grade}`;
    const steamBadgeW = ctx.measureText(steamLabel).width + 20;
    ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.beginPath();
    ctx.roundRect(card2X + cardW - 25 - steamBadgeW, card2Y + 25, steamBadgeW, 28, 6);
    ctx.fill();
    ctx.fillStyle = '#67e8f9';
    ctx.fillText(steamLabel, card2X + cardW - 25 - steamBadgeW + 10, card2Y + 44);

    // STEAM Progress Bar Background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.beginPath();
    ctx.roundRect(card2X + 25, card2Y + 135, cardW - 50, 16, 8);
    ctx.fill();

    // STEAM Progress Bar Fill
    const steamFillW = Math.max(10, ((cardW - 50) * Math.min(100, stats.steamMastery)) / 100);
    const steamGradient = ctx.createLinearGradient(card2X + 25, 0, card2X + 25 + steamFillW, 0);
    steamGradient.addColorStop(0, '#06b6d4');
    steamGradient.addColorStop(1, '#38bdf8');
    ctx.fillStyle = steamGradient;
    ctx.beginPath();
    ctx.roundRect(card2X + 25, card2Y + 135, steamFillW, 16, 8);
    ctx.fill();

    // Subtitle note
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '13px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${steamStatus.label} · NACA Airfoil & Propulsion`, card2X + 25, card2Y + 175);

    // ==========================================
    // Supporting Honorary Stats Strip (Bottom Left)
    // ==========================================
    const stripY = 460;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.beginPath();
    ctx.roundRect(60, stripY, 520, 85, 12);
    ctx.fill();
    ctx.strokeStyle = currentTheme.border;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pill 1: Financial Acumen
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText('FINANCIAL ACUMEN', 85, stripY + 28);
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText(`${stats.financialAcumen}%`, 85, stripY + 58);

    // Pill 2: Community Legacy & One Stop
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText('COMMUNITY LEGACY', 255, stripY + 28);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText(`${stats.communityLegacy}%`, 255, stripY + 58);

    // Pill 3: Redemption Pts
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText('REDEMPTION PTS', 425, stripY + 28);
    ctx.fillStyle = '#e879f9';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText(`${stats.redemptionPoints} pts`, 425, stripY + 58);

    // ==========================================
    // Quote Box (Bottom Right)
    // ==========================================
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.beginPath();
    ctx.roundRect(620, stripY, 520, 85, 12);
    ctx.fill();
    ctx.strokeStyle = currentTheme.border;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = currentTheme.accentLight;
    ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText('JEANELL LAND · RESILIENCE CODE', 645, stripY + 28);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'italic 13px Georgia, serif';
    // Wrap quote if needed
    const quoteWords = `"${quoteText}"`.split(' ');
    let line1 = '';
    let line2 = '';
    for (const w of quoteWords) {
      if ((line1 + w).length < 60) {
        line1 += (line1 ? ' ' : '') + w;
      } else {
        line2 += (line2 ? ' ' : '') + w;
      }
    }
    ctx.fillText(line1, 645, stripY + 52);
    if (line2) {
      ctx.fillText(line2, 645, stripY + 70);
    }

    // ==========================================
    // Footer Bar with App Stamp & Non-Profit URL
    // ==========================================
    ctx.fillStyle = '#64748b';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText('S.T.E.A.Reality · onestoprehabilitationcenters.org · Detroit Public Schools & S.T.E.A.M. Initiative', 60, height - 42);

    ctx.fillStyle = currentTheme.accent;
    ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillText('#STEAReality #STEAMResilience #DetroitAviation', width - 420, height - 42);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        drawCardToCanvas();
      }, 50);
    }
  }, [isOpen, selectedTheme, selectedQuoteIndex, customQuote, stats, profile]);

  if (!isOpen) return null;

  // Formatted viral text for clipboard & social posts
  const getViralPostText = () => {
    const streakLine = streak
      ? `🔥 Active Streak: ${streak.currentStreakDays}-Day Streak (${streak.multiplier}x Multiplier · ${streak.streakBadge.label})\n`
      : '';
    return `🚀 Leveling up in S.T.E.A.Reality Detroit!

📊 My Stats & Streak:
${streakLine}❤️ Resilience: ${stats.resilience}% (${resStatus.label})
⚡ S.T.E.A.M. Mastery: ${stats.steamMastery}% (${steamStatus.label})
🏛️ Community Legacy: ${stats.communityLegacy}%
🤝 Redemption Points: ${stats.redemptionPoints} pts (Supporting One Stop Rehabilitation Center 501(c)(3))

"${quoteText}" — Jeanell Land

Can you match my aviation & resilience streak in the Detroit metaverse?
Play & verify at: https://stearealitythejeanelllandodyssey.com

#STEAReality #DetroitAviation #STEAMResilience #JeanellLand #STEMEducation #AerospaceYouth`;
  };

  // 1-Click Copy Post Text
  const handleCopyText = async () => {
    try {
      sound.playClick();
      await navigator.clipboard.writeText(getViralPostText());
      setIsCopiedText(true);
      rewardEngagement();
      setShareSuccessMessage('Viral post text copied to clipboard!');
      setTimeout(() => {
        setIsCopiedText(false);
        setShareSuccessMessage(null);
      }, 3500);
    } catch {
      setShareSuccessMessage('Could not write to clipboard automatically.');
    }
  };

  // 1-Click Copy Rendered Image Blob to Clipboard
  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      sound.playClick();
      setIsGenerating(true);
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          // Attempt ClipboardItem write (supported in modern browsers)
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          setIsCopiedImage(true);
          rewardEngagement();
          setShareSuccessMessage('High-res snapshot image copied to clipboard! Paste directly into Twitter, Discord, or Messages.');
          setTimeout(() => {
            setIsCopiedImage(false);
            setShareSuccessMessage(null);
          }, 4000);
        } catch {
          // Fallback to text copy
          handleCopyText();
        } finally {
          setIsGenerating(false);
        }
      }, 'image/png');
    } catch {
      setIsGenerating(false);
    }
  };

  // 1-Click Download High-Res PNG Card
  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    sound.playSuccess();
    const link = document.createElement('a');
    const safeName = (profile.name || 'Amari').replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `STEAReality_${safeName}_Resilience${stats.resilience}_STEAM${stats.steamMastery}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    rewardEngagement();
    setShareSuccessMessage('High-res snapshot image downloaded to your device!');
    setTimeout(() => setShareSuccessMessage(null), 4000);
  };

  // Native Web Share API (Mobile / Safari)
  const handleNativeShare = async () => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (navigator.share) {
      try {
        if (canvas) {
          canvas.toBlob(async (blob) => {
            if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'steareality_stats.png', { type: 'image/png' })] })) {
              const file = new File([blob], 'steareality_stats.png', { type: 'image/png' });
              await navigator.share({
                title: 'S.T.E.A.Reality Detroit Stats Snapshot',
                text: getViralPostText(),
                files: [file],
              });
              rewardEngagement();
              return;
            }
            // Fallback to text share
            await navigator.share({
              title: 'S.T.E.A.Reality Detroit Stats Snapshot',
              text: getViralPostText(),
              url: 'https://onestoprehabilitationcenters.org',
            });
            rewardEngagement();
          });
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopyText();
        }
      }
    } else {
      handleCopyText();
    }
  };

  // Direct Social Links
  const handleShareTwitter = () => {
    sound.playClick();
    rewardEngagement();
    const tweetText = `⚡ Just hit ${stats.resilience}% Resilience & ${stats.steamMastery}% STEAM Mastery in @STEAReality! Tracking aeronautical engineering & community legacy in Detroit.\n\n"${quoteText}"\n\n`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent('https://onestoprehabilitationcenters.org')}&hashtags=STEAReality,DetroitAviation,STEAMResilience`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    sound.playClick();
    rewardEngagement();
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://onestoprehabilitationcenters.org')}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    handleCopyText();
  };

  const handleShareFacebook = () => {
    sound.playClick();
    rewardEngagement();
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://onestoprehabilitationcenters.org')}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    sound.playClick();
    rewardEngagement();
    const text = getViralPostText();
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  // Gamified Viral Bonus Reward (+10 Cool Points, +5 Redemption Points)
  const rewardEngagement = () => {
    if (!hasClaimedBonus && onRewardPlayer) {
      setHasClaimedBonus(true);
      onRewardPlayer({
        coolPoints: 10,
        redemptionPoints: 5,
      });
      sound.playSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Ambient Top Glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-950 via-slate-900 to-rose-950 border border-cyan-500/40 text-cyan-400 shadow-md">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Social Media Snapshot &amp; Virality Generator
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-rose-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Resilience + STEAM
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate high-resolution social share cards, copy viral captions, and inspire your community
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Share Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gamified Share Bonus Alert Banner */}
        <div className="mt-4 p-2.5 rounded-xl bg-gradient-to-r from-amber-950/60 via-slate-950 to-cyan-950/60 border border-amber-500/40 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-200">
              <strong className="text-amber-300">Viral Engagement Bonus:</strong> Share or download your snapshot to earn{' '}
              <strong className="text-emerald-300">+10 Cool Points</strong> &amp;{' '}
              <strong className="text-rose-300">+5 Redemption Points</strong>!
            </span>
          </div>
          {hasClaimedBonus ? (
            <span className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
              <CheckCircle2 className="w-3.5 h-3.5" /> Bonus Claimed!
            </span>
          ) : (
            <span className="shrink-0 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
              Ready to Claim
            </span>
          )}
        </div>

        {/* Success Alert if copied / shared */}
        {shareSuccessMessage && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{shareSuccessMessage}</span>
          </div>
        )}

        {/* Theme and Quote Customizers */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Theme Selector */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                <span>Visual Palette</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500 uppercase">{selectedTheme}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'cyber', label: 'Cyber Neon', color: 'from-cyan-950 to-slate-900 border-cyan-500/40 text-cyan-300' },
                { id: 'gold', label: 'Goldie Reckoning', color: 'from-amber-950 to-slate-900 border-amber-500/40 text-amber-300' },
                { id: 'emerald', label: 'Peak Flow', color: 'from-emerald-950 to-slate-900 border-emerald-500/40 text-emerald-300' },
                { id: 'blueprint', label: 'Aero Blueprint', color: 'from-blue-950 to-slate-900 border-blue-500/40 text-blue-300' },
              ].map((th) => (
                <button
                  key={th.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedTheme(th.id as CardTheme);
                  }}
                  className={`py-1.5 px-2 rounded-lg border text-[11px] font-bold bg-gradient-to-b transition-all cursor-pointer ${
                    th.color
                  } ${selectedTheme === th.id ? 'ring-2 ring-white shadow-md' : 'opacity-70 hover:opacity-100'}`}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inspirational Fortitude Quote Picker */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Jeanell's Resilience Quote</span>
              </span>
              <span className="text-[11px] text-slate-500">Pick or customize</span>
            </div>
            <select
              value={selectedQuoteIndex}
              onChange={(e) => {
                sound.playClick();
                setSelectedQuoteIndex(Number(e.target.value));
                setCustomQuote('');
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
            >
              {QUOTES.map((q, idx) => (
                <option key={idx} value={idx}>
                  Quote {idx + 1}: "{q.slice(0, 50)}..."
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Canvas Snapshot Preview */}
        <div className="mt-4 relative group">
          <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-black flex items-center justify-center">
            {/* The canvas is rendered at full 1200x630 resolution for crisp downloads, responsive on screen */}
            <canvas
              ref={canvasRef}
              className="w-full h-auto max-h-[340px] object-contain block"
              style={{ aspectRatio: '1200 / 630' }}
            />
          </div>

          {/* Quick Overlay Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {streak && (
              <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur border border-amber-500/60 text-amber-300 text-[11px] font-bold flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>
                  {streak.currentStreakDays}-Day Streak ({streak.multiplier}x)
                </span>
              </span>
            )}
            <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur border border-rose-500/50 text-rose-300 text-[11px] font-bold flex items-center gap-1.5">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-500/40" />
              <span>Resilience: {stats.resilience}%</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur border border-cyan-500/50 text-cyan-300 text-[11px] font-bold flex items-center gap-1.5">
              <Rocket className="w-3 h-3 text-cyan-400" />
              <span>STEAM: {stats.steamMastery}%</span>
            </span>
          </div>

          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-mono">
              1200 × 630 HD Snapshot
            </span>
          </div>
        </div>

        {/* Action Buttons Toolbar: 1-Click Virality Controls */}
        <div className="mt-4 space-y-3">
          {/* Primary Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Action 1: Download Image */}
            <button
              onClick={handleDownloadImage}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer hover:scale-[1.02]"
              title="Download 1200x630 High-Resolution PNG"
            >
              <Download className="w-4 h-4" />
              <span>Download Image</span>
            </button>

            {/* Action 2: Copy Image to Clipboard */}
            <button
              onClick={handleCopyImage}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 font-bold text-xs transition-all cursor-pointer hover:scale-[1.02]"
              title="Copy Image Directly to Clipboard"
            >
              {isCopiedImage ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Image Copied!</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span>Copy Image</span>
                </>
              )}
            </button>

            {/* Action 3: Copy Viral Text */}
            <button
              onClick={handleCopyText}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 font-bold text-xs transition-all cursor-pointer hover:scale-[1.02]"
              title="Copy Formatted Post Text with Stats & Hashtags"
            >
              {isCopiedText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Post Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy Caption</span>
                </>
              )}
            </button>

            {/* Action 4: Native Share (Mobile) */}
            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 transition-all cursor-pointer hover:scale-[1.02]"
              title="Open Device Native Share Menu"
            >
              <Share2 className="w-4 h-4" />
              <span>Share to App</span>
            </button>
          </div>

          {/* Social Platforms 1-Click Launchers */}
          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>One-Click Viral Broadcast:</span>
            </span>

            <div className="flex items-center gap-2 flex-wrap">
              {/* X / Twitter */}
              <button
                onClick={handleShareTwitter}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer hover:border-slate-500"
                title="Share on X (Twitter)"
              >
                <Twitter className="w-3.5 h-3.5 text-sky-400" />
                <span>Post on X</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={handleShareLinkedIn}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077b5]/20 hover:bg-[#0077b5]/40 text-[#70b5f9] border border-[#0077b5]/50 text-xs font-bold transition-all cursor-pointer"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all cursor-pointer"
                title="Send via WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={handleShareFacebook}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-bold transition-all cursor-pointer"
                title="Share on Facebook"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
