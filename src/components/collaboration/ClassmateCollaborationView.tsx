import React, { useState, useEffect } from 'react';
import {
  Users,
  Send,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Wind,
  Rocket,
  Building2,
  HeartHandshake,
  Shield,
  Heart,
  MessageSquare,
  Award,
  Zap,
  BookOpen,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  ClassmateStudyProfile,
  LabType,
  StudyRequest,
  ActiveCollaborationBonus,
} from '../../types/collaboration';
import { ClassmateStatusMap, ClassmateId, RelationshipState, PlayerStats } from '../../types/game';
import {
  CLASSMATE_PROFILES,
  LAB_METADATA,
  generateStudyResponse,
  createCollaborationBonus,
} from '../../data/classmateCollaborationData';
import { sound } from '../../utils/audio';

interface ClassmateCollaborationProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  classmateStatus: ClassmateStatusMap;
  onUpdateClassmate: (id: ClassmateId, status: RelationshipState) => void;
  activeCollaboration: ActiveCollaborationBonus | null;
  onSetActiveCollaboration: (collab: ActiveCollaborationBonus | null) => void;
  onLaunchLab: (lab: LabType) => void;
  onOpenCampaign?: () => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const ClassmateCollaborationView: React.FC<ClassmateCollaborationProps> = ({
  playerStats,
  onUpdateStats,
  classmateStatus,
  onUpdateClassmate,
  activeCollaboration,
  onSetActiveCollaboration,
  onLaunchLab,
  onOpenCampaign,
  isModal = false,
  onClose,
}) => {
  // Selected classmate to send study request
  const [selectedClassmateId, setSelectedClassmateId] = useState<'kendra' | 'david'>('kendra');
  const selectedProfile: ClassmateStudyProfile = CLASSMATE_PROFILES[selectedClassmateId];

  // Selected lab focus
  const [selectedLab, setSelectedLab] = useState<LabType>(selectedProfile.bestLabs[0]);
  const availableTopics = selectedProfile.labTopics[selectedLab] || [];
  const [selectedTopic, setSelectedTopic] = useState<string>(availableTopics[0] || '');

  // Custom collaborative message
  const [customNote, setCustomNote] = useState<string>(
    `Hey ${selectedProfile.name.split(' ')[0]}, let's team up on ${availableTopics[0] || 'our lab calculations'}. I'd value your perspective!`
  );

  // Transmission state
  const [isSending, setIsSending] = useState<boolean>(false);
  const [lastRequestResult, setLastRequestResult] = useState<StudyRequest | null>(null);

  // Time remaining on active collaboration bonus
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');

  // Update topic when lab changes
  useEffect(() => {
    const topics = selectedProfile.labTopics[selectedLab] || [];
    if (topics.length > 0) {
      setSelectedTopic(topics[0]);
      setCustomNote(
        `Hey ${selectedProfile.name.split(' ')[0]}, let's team up on ${topics[0]}. I'd value your perspective!`
      );
    }
  }, [selectedLab, selectedProfile]);

  // Countdown timer for active collaboration
  useEffect(() => {
    if (!activeCollaboration) {
      setTimeLeftStr('');
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diffMs = activeCollaboration.expiresAt - now;
      if (diffMs <= 0) {
        onSetActiveCollaboration(null);
        setTimeLeftStr('');
      } else {
        const mins = Math.floor(diffMs / 60000);
        const secs = Math.floor((diffMs % 60000) / 1000);
        setTimeLeftStr(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeCollaboration, onSetActiveCollaboration]);

  // Handle switching selected classmate
  const handleSelectClassmate = (id: 'kendra' | 'david') => {
    sound.playClick();
    setSelectedClassmateId(id);
    const profile = CLASSMATE_PROFILES[id];
    const defaultLab = profile.bestLabs[0];
    setSelectedLab(defaultLab);
    const topics = profile.labTopics[defaultLab] || [];
    setSelectedTopic(topics[0] || '');
    setCustomNote(`Hey ${profile.name.split(' ')[0]}, let's team up on ${topics[0] || 'our lab'}. I'd value your perspective!`);
    setLastRequestResult(null);
  };

  // Handle sending the virtual study request
  const handleSendStudyRequest = () => {
    if (isSending) return;
    sound.playNotification();
    setIsSending(true);

    const currentRelationship = classmateStatus[selectedClassmateId] || 'neutral';

    // Simulate 750ms network transmission and classmate deliberation
    setTimeout(() => {
      setIsSending(false);

      const response = generateStudyResponse(
        selectedClassmateId,
        currentRelationship,
        selectedLab,
        selectedTopic,
        customNote,
        playerStats
      );

      const requestRecord: StudyRequest = {
        id: `req-${Date.now()}`,
        classmateId: selectedClassmateId,
        classmateName: selectedProfile.name,
        labFocus: selectedLab,
        labName: LAB_METADATA[selectedLab].name,
        topic: selectedTopic,
        customNote,
        status: response.accepted ? 'accepted' : 'declined',
        responseMessage: response.message,
        sentAt: Date.now(),
        bonusMultiplier: 1.25, // +25% bonus
        bonusPercent: 25,
        durationMinutes: 15,
      };

      setLastRequestResult(requestRecord);

      if (response.accepted) {
        sound.playMantraChime();

        // Create and activate the collaboration bonus
        const newBonus = createCollaborationBonus(requestRecord, selectedProfile);
        onSetActiveCollaboration(newBonus);

        // Boost player stats immediately for cooperative initiative!
        onUpdateStats({
          kindnessPoints: 10,
          resilience: 5,
        });

        // If promoted to ally, update classmateStatus
        if (response.promotedToAlly) {
          onUpdateClassmate(selectedClassmateId, 'ally');
        }
      } else {
        sound.playError();
      }
    }, 750);
  };

  const getRelationshipBadge = (status: RelationshipState) => {
    switch (status) {
      case 'ally':
        return {
          label: 'Trusted Ally',
          color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'bullied':
        return {
          label: 'Past Conflict (Bullied)',
          color: 'bg-red-500/15 text-red-400 border-red-500/30',
          dot: 'bg-red-400',
        };
      case 'neutral':
      default:
        return {
          label: 'Classmate (Neutral)',
          color: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          dot: 'bg-amber-400',
        };
    }
  };

  const getLabIcon = (lab: LabType) => {
    switch (lab) {
      case 'aero':
        return Wind;
      case 'propulsion':
        return Rocket;
      case 'finance':
        return Building2;
      case 'community':
        return HeartHandshake;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 sm:px-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              S.T.E.A.M. Classmate Collaboration Network
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Virtual Study Requests
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono font-medium">
                +25% Mastery Multiplier
              </span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Send virtual study requests to your high school classmates{' '}
              <strong className="text-emerald-400 font-semibold">Kendra Barnes</strong> (Financial Underwriting) and{' '}
              <strong className="text-cyan-400 font-semibold">David Chen</strong> (Aeronautics &amp; Propulsion).
              Acceptance unlocks a temporary <span className="text-amber-300 font-bold">+25% Mastery Bonus</span> in
              the STEAM Labs!
            </p>
          </div>

          {/* Active Partner or Status Pill */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shrink-0 max-w-sm space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Active Co-Pilot Status
              </span>
              {activeCollaboration ? (
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {timeLeftStr || '15:00'}
                </span>
              ) : (
                <span className="text-[11px] text-slate-500 font-mono">None Active</span>
              )}
            </div>

            {activeCollaboration ? (
              <div className="space-y-1">
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{activeCollaboration.classmateName}</span>
                  <span className="text-xs text-amber-300 font-mono font-bold">
                    (+{activeCollaboration.bonusPercent}%)
                  </span>
                </div>
                <div className="text-xs text-slate-300 truncate">
                  Lab: {activeCollaboration.labName}
                </div>
                <button
                  onClick={() => onLaunchLab(activeCollaboration.labFocus)}
                  className="w-full mt-2 py-1.5 px-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <span>Launch {activeCollaboration.labName.split(' ')[0]} Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Send a request below to activate a 15-minute study partner co-pilot bonus.
              </p>
            )}
          </div>
        </div>

        {/* ACTIVE COLLABORATION BANNER */}
        {activeCollaboration && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-emerald-950/30 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 sm:px-8 border-b border-emerald-500/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                  Active Co-Pilot: {activeCollaboration.perkTitle}
                </span>
                <p className="text-xs text-slate-300">
                  {activeCollaboration.coPilotTip}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onLaunchLab(activeCollaboration.labFocus)}
                className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Enter {activeCollaboration.labName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Choose Classmate (Kendra vs. David) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Select Classmate Partner</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">2 Available</span>
          </div>

          {(['kendra', 'david'] as const).map((id) => {
            const profile = CLASSMATE_PROFILES[id];
            const isSelected = selectedClassmateId === id;
            const currentStatus = classmateStatus[id] || 'neutral';
            const badge = getRelationshipBadge(currentStatus);

            return (
              <div
                key={id}
                onClick={() => handleSelectClassmate(id)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative ${
                  isSelected
                    ? id === 'kendra'
                      ? 'bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg'
                      : 'bg-gradient-to-br from-cyan-950/70 via-slate-900 to-slate-950 border-cyan-500 ring-2 ring-cyan-500/30 shadow-lg'
                    : 'bg-slate-950 hover:bg-slate-900/80 border-slate-800'
                }`}
              >
                {/* Relationship status badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold flex items-center gap-1.5 ${badge.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {badge.label}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] text-amber-300 font-mono font-bold uppercase">
                      Selected
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {profile.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium">{profile.role}</div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                    {profile.bio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Specialty:</strong> {profile.specialty}
                  </div>
                  <div className="text-[11px] font-mono text-amber-400 font-semibold bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {profile.perkName}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Guidance Note */}
          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Relationship Mechanics</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Classmate cooperation is influenced by how you treated peers in the campaign. Allies collaborate enthusiastically, while neutral classmates may be won over through sincere academic initiative.
            </p>
            {onOpenCampaign && (
              <button
                onClick={onOpenCampaign}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-medium block pt-1 cursor-pointer"
              >
                Review High School Crossroads in Campaign →
              </button>
            )}
          </div>
        </div>

        {/* Column 2 & 3: Study Request Form & Live Response */}
        <div className="lg:col-span-2 space-y-5">
          {/* Form Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Compose Virtual Study Request to {selectedProfile.name}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select your lab focus, define the joint study objective, and transmit your collaborative proposal.
              </p>
            </div>

            {/* Step 1: Select STEAM Lab */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                1. Select STEAM Lab Focus
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['aero', 'propulsion', 'finance', 'community'] as LabType[]).map((lab) => {
                  const meta = LAB_METADATA[lab];
                  const Icon = getLabIcon(lab);
                  const isSelected = selectedLab === lab;
                  const isBestForClassmate = selectedProfile.bestLabs.includes(lab);

                  return (
                    <button
                      key={lab}
                      onClick={() => {
                        sound.playClick();
                        setSelectedLab(lab);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 text-white shadow-md ring-1 ring-cyan-500/40'
                          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                        {isBestForClassmate && (
                          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40 font-mono">
                            Affinity
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold leading-tight">{meta.name.split(' ')[0]} Lab</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">{meta.subtitle.split(',')[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Study Topic */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                2. Select Study Objective / Calculation Topic
              </label>
              <div className="space-y-1.5">
                {availableTopics.map((topic) => {
                  const isSelected = selectedTopic === topic;

                  return (
                    <div
                      key={topic}
                      onClick={() => {
                        sound.playClick();
                        setSelectedTopic(topic);
                        setCustomNote(
                          `Hey ${selectedProfile.name.split(' ')[0]}, let's team up on ${topic}. I'd value your perspective!`
                        );
                      }}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-500/60 text-white font-medium'
                          : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                        <span>{topic}</span>
                      </span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Collaborative Note */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                3. Collaborative Proposal Note
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                rows={2}
                placeholder="Write a personalized academic inquiry or message..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed resize-none"
              />
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-400 font-mono">
                Bonus: <strong className="text-amber-300 font-bold">+25% Mastery Multiplier</strong> (15 Mins)
              </div>

              <button
                onClick={handleSendStudyRequest}
                disabled={isSending || !selectedTopic}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  isSending
                    ? 'bg-slate-800 text-slate-400 cursor-wait'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
                }`}
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting Study Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Virtual Study Request</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Virtual Response Card */}
          {lastRequestResult && (
            <div
              className={`rounded-2xl p-6 border transition-all animate-fadeIn shadow-xl ${
                lastRequestResult.status === 'accepted'
                  ? 'bg-gradient-to-b from-emerald-950/60 via-slate-950 to-slate-950 border-emerald-500/60'
                  : 'bg-gradient-to-b from-red-950/60 via-slate-950 to-slate-950 border-red-500/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border font-bold text-sm ${
                      lastRequestResult.status === 'accepted'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50'
                        : 'bg-red-500/20 text-red-300 border-red-400/50'
                    }`}
                  >
                    {lastRequestResult.classmateName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{lastRequestResult.classmateName}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                          lastRequestResult.status === 'accepted'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}
                      >
                        {lastRequestResult.status === 'accepted' ? 'Study Request Accepted' : 'Request Declined'}
                      </span>
                    </h3>
                    <div className="text-[11px] text-slate-400">
                      Topic: {lastRequestResult.topic}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] text-slate-500 font-mono">Just now</span>
              </div>

              {/* Response Message Body */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-serif italic mb-4">
                {lastRequestResult.responseMessage}
              </div>

              {/* Unlocked Reward Call to Action */}
              {lastRequestResult.status === 'accepted' ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-emerald-300 flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>
                      <strong>+{lastRequestResult.bonusPercent}% Mastery Multiplier</strong> active in {lastRequestResult.labName}!
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onLaunchLab(lastRequestResult.labFocus);
                      if (onClose) onClose();
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <span>Launch {lastRequestResult.labName.split(' ')[0]} Lab Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="text-xs text-slate-400 flex items-center justify-between gap-2 pt-1">
                  <span>Rebuild trust through positive decisions in the Historical Campaign.</span>
                  {onOpenCampaign && (
                    <button
                      onClick={onOpenCampaign}
                      className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
                    >
                      Open Campaign →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
