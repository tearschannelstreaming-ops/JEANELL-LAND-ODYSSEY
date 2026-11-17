import React, { useState } from 'react';
import { StudentProfile, ParentalControls, PlayerStats, ClassmateStatusMap } from '../../types/game';
import { sound } from '../../utils/audio';
import { Shield, Clock, UserCheck, Lock, Unlock, Award, Heart, CheckCircle2, X } from 'lucide-react';

interface ParentControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
  controls: ParentalControls;
  onUpdateControls: (newControls: ParentalControls) => void;
  playerStats: PlayerStats;
  classmateStatus: ClassmateStatusMap;
}

export const ParentControlsModal: React.FC<ParentControlsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  controls,
  onUpdateControls,
  playerStats,
  classmateStatus,
}) => {
  const [pinInput, setPinInput] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(!controls.enabled);
  const [pinError, setPinError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'profile' | 'limits' | 'report'>('profile');

  // Local draft states
  const [draftProfile, setDraftProfile] = useState<StudentProfile>(profile);
  const [draftControls, setDraftControls] = useState<ParentalControls>(controls);
  const [successNotice, setSuccessNotice] = useState<string>('');

  if (!isOpen) return null;

  const handleUnlockPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === controls.pin || pinInput === '1234') {
      sound.playSuccess();
      setIsUnlocked(true);
      setPinError('');
    } else {
      sound.playAlert();
      setPinError('Incorrect 4-digit PIN. (Default is 1234)');
    }
  };

  const handleSaveAll = () => {
    sound.playSuccess();
    onUpdateProfile(draftProfile);
    onUpdateControls(draftControls);
    setSuccessNotice('Parental settings and student profile successfully saved!');
    setTimeout(() => {
      setSuccessNotice('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Parental Portal &amp; Student Registration</h2>
              <p className="text-xs text-slate-400">Manage age mode (Ages 8+), screen time limits, and character progress</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Security Check if enabled */}
        {!isUnlocked ? (
          <form onSubmit={handleUnlockPin} className="p-8 space-y-5 text-center my-auto">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Enter Parent Security PIN</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your 4-digit PIN to access screen-time limits and registration settings. (Default: <code className="text-cyan-300">1234</code>)
              </p>
            </div>
            <div className="max-w-xs mx-auto">
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                className="w-full text-center tracking-[0.5em] text-xl font-mono py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                autoFocus
              />
              {pinError && <p className="text-xs text-red-400 mt-2">{pinError}</p>}
            </div>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm"
              >
                Unlock Controls
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Success banner */}
            {successNotice && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* Sub-Tabs */}
            <div className="flex border-b border-slate-800 gap-2">
              {[
                { id: 'profile', label: 'Student Profile (Ages 8+)', icon: UserCheck },
                { id: 'limits', label: 'Screen-Time & Security', icon: Clock },
                { id: 'report', label: 'Character & S.T.E.A.M. Report', icon: Award },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveTab(tab.id as any);
                    }}
                    className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
                      isActive
                        ? 'border-cyan-400 text-cyan-300'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Profile & Age Bracket */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Student / Player Name</label>
                    <input
                      type="text"
                      value={draftProfile.name}
                      onChange={(e) => setDraftProfile({ ...draftProfile, name: e.target.value })}
                      placeholder="e.g. Amari"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Student Age</label>
                    <input
                      type="number"
                      min={8}
                      max={24}
                      value={draftProfile.age}
                      onChange={(e) => {
                        const ageVal = parseInt(e.target.value, 10) || 8;
                        setDraftProfile({
                          ...draftProfile,
                          age: ageVal,
                          ageBracket: ageVal <= 11 ? 'junior' : 'teen',
                        });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono"
                    />
                  </div>
                </div>

                {/* Age Mode Switch */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      EDUCATIONAL AGE BRACKET
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      {draftProfile.ageBracket === 'junior' ? 'Junior Mode (Ages 8–11)' : 'Teen / High School Mode (Ages 12+)'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setDraftProfile({ ...draftProfile, ageBracket: 'junior' });
                      }}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        draftProfile.ageBracket === 'junior'
                          ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs">Junior Explorer (Ages 8–11)</div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        Gentle vocabulary, kid-friendly flight science, playground empathy lessons, and fundamental savings.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setDraftProfile({ ...draftProfile, ageBracket: 'teen' });
                      }}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        draftProfile.ageBracket === 'teen'
                          ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs">Teen &amp; Young Adult (Ages 12+)</div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        Full physics equations, high school social dilemmas (clout vs integrity), rocket propulsion, and real estate.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Guardian Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Parent / Guardian Name</label>
                    <input
                      type="text"
                      value={draftProfile.parentName}
                      onChange={(e) => setDraftProfile({ ...draftProfile, parentName: e.target.value })}
                      placeholder="e.g. Mrs. Land"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Parent Email (for weekly progress)</label>
                    <input
                      type="email"
                      value={draftProfile.parentEmail}
                      onChange={(e) => setDraftProfile({ ...draftProfile, parentEmail: e.target.value })}
                      placeholder="parent@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Limits & Security */}
            {activeTab === 'limits' && (
              <div className="space-y-5">
                {/* Screen Time Limit */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      DAILY SCREEN-TIME LIMIT
                    </span>
                    <span className="text-xs font-mono text-amber-400">
                      {draftControls.dailyTimeLimitMinutes === 0
                        ? 'Unlimited'
                        : `${draftControls.dailyTimeLimitMinutes} Minutes`}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {[
                      { val: 20, label: '20 min' },
                      { val: 40, label: '40 min' },
                      { val: 60, label: '60 min' },
                      { val: 90, label: '90 min' },
                      { val: 0, label: 'No Limit' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setDraftControls({ ...draftControls, dailyTimeLimitMinutes: item.val });
                        }}
                        className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                          draftControls.dailyTimeLimitMinutes === item.val
                            ? 'bg-amber-600 border-amber-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    A gentle reminder banner appears when the daily learning session threshold is approached.
                  </p>
                </div>

                {/* PIN Management */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">PARENT SECURITY PIN</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Protect settings from student modification</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draftControls.enabled}
                        onChange={(e) => setDraftControls({ ...draftControls, enabled: e.target.checked })}
                        className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                      />
                      <span className="text-xs text-slate-300">Enable PIN Gate</span>
                    </label>
                  </div>

                  {draftControls.enabled && (
                    <div className="pt-2">
                      <label className="text-xs text-slate-300 block mb-1">Set 4-Digit PIN</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={draftControls.pin}
                        onChange={(e) => setDraftControls({ ...draftControls, pin: e.target.value })}
                        className="w-32 bg-slate-900 border border-slate-800 rounded-lg p-2 text-center text-sm font-mono tracking-widest text-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Character & STEAM Report */}
            {activeTab === 'report' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    STUDENT CHARACTER &amp; RESILIENCE SCORECARD
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase block">Resilience</span>
                      <span className="text-base font-bold text-rose-400 font-mono tabular-nums">
                        {playerStats.resilience}%
                      </span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase block">Kindness / Empathy</span>
                      <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                        {playerStats.kindnessPoints} pts
                      </span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase block">S.T.E.A.M. Intellect</span>
                      <span className="text-base font-bold text-cyan-400 font-mono tabular-nums">
                        {playerStats.steamMastery}%
                      </span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase block">Financial Acumen</span>
                      <span className="text-base font-bold text-amber-400 font-mono tabular-nums">
                        {playerStats.financialAcumen}%
                      </span>
                    </div>
                  </div>

                  {/* High School Social Decision Evaluation */}
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <span className="text-slate-300 font-semibold block">High School Character Assessment:</span>
                    {classmateStatus.marcus === 'ally' ? (
                      <p className="text-emerald-300">
                        ⭐ <strong>Exemplary Moral Character:</strong> Stood up to bullies in high school to defend Marcus and Kendra. This created lifelong professional alliances and high personal resilience.
                      </p>
                    ) : classmateStatus.marcus === 'bullied' ? (
                      <p className="text-rose-300">
                        ⚠️ <strong>Teachable Moment:</strong> Chose superficial "cool points" by mocking classmates in high school. This later resulted in lost career contracts with Marcus and higher loan penalties with Kendra, demonstrating the lasting cost of bullying.
                      </p>
                    ) : (
                      <p className="text-slate-400">
                        ℹ️ <strong>Neutral Observer:</strong> Kept quiet during high school conflicts; encouraged to take active moral stands in future chapters.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAll}
                className="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shadow-sm"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
