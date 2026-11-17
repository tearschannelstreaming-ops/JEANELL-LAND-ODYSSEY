import React, { useState } from 'react';
import { StudentProfile, PlayerStats } from '../../types/game';
import { COURSE_CATALOG_INFO, COURSE_MODULES } from '../../data/courseData';
import { sound } from '../../utils/audio';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  MapPin,
  Shield,
  Plane,
  Award,
  DollarSign,
  Gift,
  X,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Printer,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface CourseSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onNavigateToMetaverse?: () => void;
}

export const CourseSaleModal: React.FC<CourseSaleModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  playerStats,
  onUpdateStats,
  onNavigateToMetaverse,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState<string>('JEANELL101');
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'scholarship' | 'card' | 'earnings'>('scholarship');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPrice = promoApplied ? COURSE_CATALOG_INFO.discountedPrice : COURSE_CATALOG_INFO.price;

  const handleApplyPromo = () => {
    sound.playClick();
    if (
      promoCodeInput.trim().toUpperCase() === 'JEANELL101' ||
      promoCodeInput.trim().toUpperCase() === 'RESILIENCE101' ||
      promoCodeInput.trim().toUpperCase() === 'DETROIT'
    ) {
      setPromoApplied(true);
      sound.playSuccess();
    } else {
      alert('Invalid promo code. Use community scholarship code: JEANELL101');
    }
  };

  const handleCompletePurchase = () => {
    sound.playClick();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      sound.playSuccess();

      // Deduct earnings if paid with earnings
      if (selectedPaymentMethod === 'earnings' && currentPrice > 0) {
        if (playerStats.earningsBalance < currentPrice) {
          alert('Insufficient earnings balance in simulation wallet!');
          return;
        }
        onUpdateStats({ earningsBalance: -currentPrice });
      }

      const updated: StudentProfile = {
        ...profile,
        isCoursePurchased: true,
        unlockedLevelsCount: 101, // ALL 101 American Levels unlocked!
        courseCertificateIssuedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };

      onUpdateProfile(updated);
      setShowCertificate(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full p-6 md:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto text-slate-100">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
          aria-label="Close Course Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {showCertificate ? (
          /* Official Course Certificate View */
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-xs font-semibold text-emerald-400 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>OFFICIAL ACCREDITED MASTERCLASS ENROLLMENT CONFIRMED</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                All 101 American Levels Unlocked!
              </h2>
              <p className="text-slate-300 text-sm max-w-xl mx-auto mt-1">
                Congratulations, {profile.name}! You now hold full clearance to all 101 real-world locations covering two landmarks in every US state and Washington D.C.
              </p>
            </div>

            {/* Official Certificate Paper Simulation */}
            <div className="bg-gradient-to-br from-amber-50 via-slate-100 to-amber-100/90 text-slate-900 p-8 rounded-xl border-4 border-amber-600/60 shadow-xl relative overflow-hidden font-serif">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-2 left-2 text-amber-700/40 text-xl font-bold">✦</div>
              <div className="absolute top-2 right-2 text-amber-700/40 text-xl font-bold">✦</div>
              <div className="absolute bottom-2 left-2 text-amber-700/40 text-xl font-bold">✦</div>
              <div className="absolute bottom-2 right-2 text-amber-700/40 text-xl font-bold">✦</div>

              <div className="text-center space-y-4">
                <div className="text-xs uppercase tracking-widest text-amber-900 font-sans font-bold">
                  ONE STOP REHABILITATION CENTER 501(c)(3) &amp; T.E.A.R.S. FOUNDATION
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                  Certificate of S.T.E.A.M. &amp; Wealth Mastery
                </h3>
                <p className="text-xs md:text-sm text-slate-700 font-sans italic">
                  This official academic clearance certifies that
                </p>
                <div className="text-2xl md:text-3xl font-bold text-amber-900 underline decoration-amber-600 underline-offset-8">
                  {profile.name}
                </div>
                <p className="text-xs md:text-sm text-slate-700 font-sans max-w-2xl mx-auto leading-relaxed">
                  has enrolled in the comprehensive 101-Level Trans-American Curriculum Version 1, mastering Aeronautical Engineering Fluid Mechanics, Detroit Community Leadership, Nationwide MLS Real Estate, Media Broadcasting, and Generational Asset Preservation.
                </p>

                <div className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-amber-800/20 text-xs font-sans text-slate-800">
                  <div>
                    <span className="font-bold block text-slate-900">DATE ISSUED:</span>
                    <span>{profile.courseCertificateIssuedAt || new Date().toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900">CURRICULUM INSTRUCTOR:</span>
                    <span className="italic font-serif font-bold text-sm text-amber-950">Jeanell Land</span>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-bold block text-slate-900">LEVELS GRANTED:</span>
                    <span className="font-bold text-emerald-800">101 Real-Life Locations (50 States + DC)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post-Purchase Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>Print Official Certificate</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    onClose();
                    if (onNavigateToMetaverse) onNavigateToMetaverse();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <Plane className="w-4 h-4" />
                  <span>Launch 101-Level Metaverse Board Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Storefront Purchase & Curriculum Syllabus View */
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-500/30 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-900/60 border border-cyan-500/40 rounded-full text-xs font-bold text-cyan-300 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>JEANELL LAND OFFICIAL CURRICULUM · VERSION 1</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    S.T.E.A.M. Mastery &amp; Wealth Masterclass
                  </h1>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Unlock all <strong>101 American Game Levels</strong> covering two real-world landmarks in every state plus Washington D.C., complete with interactive sceneries, aeronautics wind tunnels, MLS deals, and patentable game mechanics!
                  </p>
                </div>

                <div className="text-right bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">Regular Tuition</div>
                  <div className="text-lg line-through text-slate-500 font-mono">
                    ${COURSE_CATALOG_INFO.price}
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                    ${currentPrice}
                  </div>
                  <div className="text-[11px] text-cyan-400 font-medium mt-1">
                    {promoApplied ? '100% Scholarship Applied!' : 'Full Lifetime Access'}
                  </div>
                </div>
              </div>

              {/* What You Unlock Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-cyan-500/20 text-xs">
                <div className="flex items-center gap-2">
                  <Unlock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>101 Real-Life Levels</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>2 Locations in All 50 States</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Official Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Monopoly &amp; Life Board</span>
                </div>
              </div>
            </div>

            {/* Course Syllabus & Sceneries Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Course Curriculum: 6 Accredited Pillars &amp; Sceneries</span>
                </h3>
                <span className="text-xs text-slate-400">36 Hours of Applied S.T.E.A.M. Labs</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {COURSE_MODULES.map((mod) => (
                  <div
                    key={mod.id}
                    className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 hover:border-slate-700 transition-colors"
                  >
                    <div
                      onClick={() => {
                        sound.playClick();
                        setExpandedModuleId(expandedModuleId === mod.id ? null : mod.id);
                      }}
                      className="flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                          MOD {mod.moduleNumber}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white">{mod.title}</div>
                          <div className="text-[11px] text-slate-400">{mod.subtitle}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 hidden sm:inline">{mod.pillar}</span>
                        {expandedModuleId === mod.id ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {expandedModuleId === mod.id && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs space-y-2">
                        <p className="text-slate-300 text-xs">{mod.summary}</p>
                        <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 text-[11px] space-y-1">
                          <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Interactive Field Trip Scenery: {mod.fieldTripScenery.locationName} ({mod.fieldTripScenery.cityState})</span>
                          </div>
                          <div className="text-slate-400">{mod.fieldTripScenery.interactiveTask}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code & Scholarship Activation */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span>S.T.E.A.M. Scholarship &amp; Promo Code:</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Default community scholarship code: <strong className="text-cyan-400">JEANELL101</strong> (100% off)
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Enter Promo Code (e.g. JEANELL101)"
                  className="bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-xs font-mono text-cyan-300 flex-1 focus:outline-none focus:border-cyan-500 uppercase"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer"
                >
                  Apply Code
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Enrollment &amp; Clearance Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedPaymentMethod('scholarship');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPaymentMethod === 'scholarship'
                      ? 'bg-cyan-950/40 border-cyan-500/80 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>S.T.E.A.M. Grant / 100% Free</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Instant full unlock with scholarship code</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedPaymentMethod('earnings');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPaymentMethod === 'earnings'
                      ? 'bg-cyan-950/40 border-cyan-500/80 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>In-Game Simulation Earnings</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Balance: ${(playerStats.earningsBalance || 0).toLocaleString()}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedPaymentMethod('card');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPaymentMethod === 'card'
                      ? 'bg-cyan-950/40 border-cyan-500/80 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span>Student / Institutional Card</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Official invoice receipt provided</div>
                </button>
              </div>
            </div>

            {/* Purchase CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <a
                href={COURSE_CATALOG_INFO.officialEnrollmentUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 underline underline-offset-4"
              >
                <span>View Original Course Syllabus Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCompletePurchase}
                disabled={isProcessing}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Enrolling &amp; Unlocking All 101 Levels...</span>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>
                      {currentPrice === 0
                        ? 'Enroll Free & Unlock All 101 Levels Now'
                        : `Purchase for $${currentPrice} & Unlock All 101 Levels`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
