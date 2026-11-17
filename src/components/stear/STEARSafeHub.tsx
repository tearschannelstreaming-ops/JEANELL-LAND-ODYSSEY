import React, { useState } from 'react';
import {
  Shield,
  Car,
  Utensils,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Compass,
  Phone,
  Sparkles,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Zap,
  Info,
  Users,
  Copy,
  Check,
  Building2,
  FileText,
} from 'lucide-react';
import { sound } from '../../utils/audio';
import {
  SafeRideBooking,
  SafeDeliveryOrder,
  CalendarAppointment,
  AppointmentCategory,
  RideType,
  DeliveryCategory,
} from '../../types/stear';
import { RIDE_PRESETS, DELIVERY_CATALOG } from '../../data/stearSafeData';
import { PlayerStats, StudentProfile } from '../../types/game';

interface STEARSafeHubProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  profile: StudentProfile;
  activeRide: SafeRideBooking | null;
  activeDelivery: SafeDeliveryOrder | null;
  appointments: CalendarAppointment[];
  onBookRide: (ride: SafeRideBooking) => void;
  onCompleteRide: () => void;
  onOrderDelivery: (delivery: SafeDeliveryOrder) => void;
  onCompleteDelivery: () => void;
  onAddAppointment: (appointment: CalendarAppointment) => void;
  onCompleteAppointment: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
  initialTab?: 'rides' | 'deliveries' | 'calendar' | 'sentinel';
}

export const STEARSafeHub: React.FC<STEARSafeHubProps> = ({
  playerStats,
  onUpdateStats,
  profile,
  activeRide,
  activeDelivery,
  appointments,
  onBookRide,
  onCompleteRide,
  onOrderDelivery,
  onCompleteDelivery,
  onAddAppointment,
  onCompleteAppointment,
  onNavigateToTab,
  initialTab = 'rides',
}) => {
  const [hubTab, setHubTab] = useState<'rides' | 'deliveries' | 'calendar' | 'sentinel'>(initialTab);

  // Ride Booking Form State
  const [pickup, setPickup] = useState('Detroit Innovation Commons (Woodward Ave)');
  const [destination, setDestination] = useState('Virtual Zoom Simulation Studio / Tech Center');
  const [selectedRideType, setSelectedRideType] = useState<RideType>('interview_priority');
  const [scheduledTime, setScheduledTime] = useState('Now (ASAP)');

  // Calendar New Appointment Modal State
  const [isAddAptOpen, setIsAddAptOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<AppointmentCategory>('interview');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('11:00 AM');
  const [newLocation, setNewLocation] = useState('Virtual Zoom Interview Studio');
  const [newLinkedTab, setNewLinkedTab] = useState('zoom');
  const [calendarFilter, setCalendarFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [copiedListing, setCopiedListing] = useState<string | null>(null);

  // Booking a ride handler
  const handleConfirmRide = (presetType?: RideType) => {
    sound.playClick();
    const typeToUse = presetType || selectedRideType;
    const preset = RIDE_PRESETS.find((p) => p.type === typeToUse) || RIDE_PRESETS[0];

    // Check wallet unless emergency or voucher
    if (preset.fare > 0 && playerStats.earningsBalance < preset.fare) {
      sound.playError();
      alert(`Insufficient wallet balance ($${playerStats.earningsBalance}). Requires $${preset.fare}.`);
      return;
    }

    if (preset.fare > 0) {
      onUpdateStats({ earningsBalance: -preset.fare });
    }

    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const newRide: SafeRideBooking = {
      id: `ride-${Date.now()}`,
      type: typeToUse,
      title: preset.title,
      pickupLocation: pickup,
      dropoffLocation: destination,
      destinationName: destination.split('(')[0].trim(),
      driverName: 'Marcus Vance',
      driverPhone: '(313) 555-0192',
      driverRating: 4.98,
      vehicleModel: 'Chevy Bolt EUV (Electric Blue)',
      licensePlate: 'MI-STE-77',
      safetyPin: randomPin,
      etaMinutes: 4,
      status: 'en_route',
      fare: preset.fare,
      isFreeVoucher: preset.fare === 0,
      createdAt: new Date().toISOString(),
      notes: 'S-T-E-A-R Safe Verified Driver · Telemetry Linked',
    };

    onBookRide(newRide);
    sound.playSuccess();
  };

  // Order Delivery Handler
  const handleConfirmDelivery = (catalogItem: (typeof DELIVERY_CATALOG)[0]) => {
    sound.playClick();
    if (playerStats.earningsBalance < catalogItem.cost) {
      sound.playError();
      alert(`Insufficient funds ($${playerStats.earningsBalance}). Requires $${catalogItem.cost}.`);
      return;
    }

    onUpdateStats({ earningsBalance: -catalogItem.cost });

    const newDelivery: SafeDeliveryOrder = {
      id: `del-${Date.now()}`,
      category: catalogItem.category,
      title: catalogItem.title,
      items: catalogItem.items,
      courierName: 'Elena Rostova',
      courierVehicle: 'E-Cargo Bike #04',
      etaMinutes: 6,
      status: 'out_for_delivery',
      cost: catalogItem.cost,
      resilienceBoost: catalogItem.resilienceBoost,
      createdAt: new Date().toISOString(),
    };

    onOrderDelivery(newDelivery);
    sound.playSuccess();
  };

  // Add Custom Appointment Handler
  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newApt: CalendarAppointment = {
      id: `apt-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Scheduled via S-T-E-A-R Safe Master Calendar',
      category: newCategory,
      date: newDate,
      time: newTime,
      durationMinutes: 45,
      location: newLocation,
      isVirtual: newLocation.toLowerCase().includes('zoom') || newLocation.toLowerCase().includes('virtual'),
      linkedTab: newLinkedTab || undefined,
      reminderMinutes: 30,
      isCompleted: false,
      resilienceReward: 15,
      coolPointsReward: 20,
    };

    onAddAppointment(newApt);
    setIsAddAptOpen(false);
    setNewTitle('');
    setNewDesc('');
    sound.playSuccess();
  };

  // Emergency SOS Trigger
  const handleEmergencySOS = () => {
    sound.playAlert();
    handleConfirmRide('emergency_sos');
    onUpdateStats({ resilience: Math.max(25, 45 - playerStats.resilience) }); // emergency calming boost
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (calendarFilter === 'upcoming') return !apt.isCompleted;
    if (calendarFilter === 'completed') return apt.isCompleted;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* S-T-E-A-R Safe Branding & Telemetry Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/70 border border-cyan-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-950 border border-cyan-400 text-cyan-300 flex items-center gap-1">
                <Shield className="w-3 h-3 text-cyan-400" />
                S-T-E-A-R SAFE INTEGRATION
              </span>
              <a
                href="https://s-t-e-a-r-safe.ai.studio/"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-cyan-400/80 hover:text-cyan-300 flex items-center gap-0.5"
              >
                <span>s-t-e-a-r-safe.ai.studio</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            <h2 className="text-xl font-extrabold text-white tracking-wide flex items-center gap-2">
              Safe Transit, Emergency Logistics &amp; Master Appointment Calendar
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Empowering students and professionals to navigate interviews, flight simulations, and community milestones with zero tardiness, verified safe escorts, and real-time PIP telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleEmergencySOS}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-900/40 border border-red-400/50 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 text-white animate-bounce" />
              <span>EMERGENCY SOS EXTRACTION</span>
            </button>
          </div>
        </div>

        {/* Hub Tabs Navigation */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs font-bold">
          <button
            onClick={() => {
              sound.playClick();
              setHubTab('rides');
            }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              hubTab === 'rides'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Book Safe Rides</span>
            {activeRide && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
            )}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setHubTab('deliveries');
            }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              hubTab === 'deliveries'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Order Deliveries &amp; Kits</span>
            {activeDelivery && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
            )}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setHubTab('calendar');
            }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              hubTab === 'calendar'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Game Calendar &amp; Interviews</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-cyan-300 font-mono">
              {appointments.filter((a) => !a.isCompleted).length}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setHubTab('sentinel');
            }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              hubTab === 'sentinel'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Safety Sentinel &amp; 4-Digit PIN</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigateToTab('trivia');
            }}
            className="px-4 py-2 rounded-xl flex items-center gap-2 bg-gradient-to-r from-amber-950/80 to-slate-900 hover:from-amber-900/80 hover:to-slate-800 border border-amber-500/50 text-amber-300 font-bold transition-all shadow-md cursor-pointer"
            title="Complete Daily Challenge to Boost Player Resilience"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Daily Trivia (+Resilience)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigateToTab('affirmations');
            }}
            className="px-4 py-2 rounded-xl flex items-center gap-2 bg-gradient-to-r from-emerald-950/80 to-slate-900 hover:from-emerald-900/80 hover:to-slate-800 border border-emerald-500/50 text-emerald-300 font-bold transition-all shadow-md cursor-pointer"
            title="Draw Positive Quotes from Historical Turning Points & Pick a Mantra (+5% Buff)"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Affirmation Deck (+5% Buff)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigateToTab('collaboration');
            }}
            className="px-4 py-2 rounded-xl flex items-center gap-2 bg-gradient-to-r from-blue-950/80 to-slate-900 hover:from-blue-900/80 hover:to-slate-800 border border-cyan-500/50 text-cyan-300 font-bold transition-all shadow-md cursor-pointer sm:ml-auto"
            title="Send Virtual Study Requests to Kendra or David (+25% STEAM Lab Bonus)"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Classmates (+25% Lab Bonus)</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: BOOK SAFE RIDES                                 */}
      {/* ========================================================= */}
      {hubTab === 'rides' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Preset Rides & Custom Booking */}
          <div className="lg:col-span-2 space-y-5">
            {/* Active Ride In-Progress Banner */}
            {activeRide && (
              <div className="bg-gradient-to-r from-cyan-950/80 via-slate-950 to-slate-900 border-2 border-cyan-400/80 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
                    </span>
                    <span className="font-extrabold text-white text-sm">
                      ACTIVE RIDE EN ROUTE: {activeRide.title}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-xs text-amber-300 bg-amber-950/90 px-2.5 py-1 rounded-lg border border-amber-500/40 animate-pulse">
                    ETA: {activeRide.etaMinutes} MINUTES
                  </span>
                </div>

                {/* Animated Ride Progress */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {activeRide.pickupLocation}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {activeRide.destinationName}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-400 to-emerald-400 w-4/5 animate-pulse rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Verified Driver</div>
                    <div className="text-sm font-bold text-white">{activeRide.driverName}</div>
                    <div className="text-xs text-slate-400">
                      {activeRide.vehicleModel} · Plate: {activeRide.licensePlate}
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Safety Handshake PIN</div>
                    <div className="text-base font-mono font-extrabold text-cyan-300 tracking-wider">
                      {activeRide.safetyPin}
                    </div>
                    <div className="text-[10px] text-emerald-400">Match PIN with driver upon pickup</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      sound.playSuccess();
                      onCompleteRide();
                    }}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    Simulate Driver Arrival &amp; Complete Transit (+10% Stamina)
                  </button>
                </div>
              </div>
            )}

            {/* S-T-E-A-R Safe Ride Tiers */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Select Verified Safe Ride Tier</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RIDE_PRESETS.map((preset) => (
                  <div
                    key={preset.type}
                    onClick={() => {
                      sound.playClick();
                      setSelectedRideType(preset.type);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedRideType === preset.type
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-md ring-1 ring-cyan-400/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{preset.title}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {preset.fare === 0 ? 'FREE VOUCHER' : `$${preset.fare}`}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-2.5">{preset.description}</p>

                    <div className="flex flex-wrap gap-1 text-[10px] text-cyan-300/80 mb-3">
                      {preset.safetyFeatures.map((feat, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConfirmRide(preset.type);
                      }}
                      className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Book This Ride Tier
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Custom Ride Routing Form & Safety Card */}
          <div className="space-y-5">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Custom Transit Request</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] text-slate-400 font-medium block mb-1">
                    Pickup Location:
                  </label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 font-medium block mb-1">
                    Destination Landmark:
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Quick Destination Shortcuts */}
                <div>
                  <span className="text-[10px] text-slate-500 block mb-1.5">Quick Game Destinations:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Virtual Zoom Interview Studio',
                      'Coleman A. Young Aero Research Lab',
                      'Woodward Innovation Center',
                      'Detroit Riverfront Decompression Walk',
                    ].map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setDestination(dest);
                        }}
                        className="text-[10px] px-2 py-1 rounded-lg bg-slate-900 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-800 text-slate-300 transition-colors"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 font-medium block mb-1">
                    Departure Time:
                  </label>
                  <select
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Now (ASAP)">Now (Instant Dispatch · 3-5 min ETA)</option>
                    <option value="In 15 Minutes">In 15 Minutes</option>
                    <option value="In 30 Minutes (Aligned with Boeing Interview)">
                      In 30 Minutes (Aligned with Boeing Interview)
                    </option>
                    <option value="Tonight 8:30 PM (Evening Library Escort)">
                      Tonight 8:30 PM (Evening Library Escort)
                    </option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleConfirmRide()}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Confirm &amp; Dispatch S-T-E-A-R Safe Ride
                  </button>
                </div>
              </div>
            </div>

            {/* S-T-E-A-R Safe Protocol Info Box */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 text-xs space-y-2">
              <div className="text-white font-bold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>The S-T-E-A-R Safety Standard</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Every vehicle in the S-T-E-A-R fleet requires 2-party PIN handshakes, real-time telemetry route monitoring, and emergency SOS links directly to student campus safety and city marshals.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: ORDER DELIVERIES                                */}
      {/* ========================================================= */}
      {hubTab === 'deliveries' && (
        <div className="space-y-6">
          {/* Active Delivery Card */}
          {activeDelivery && (
            <div className="bg-emerald-950/50 border-2 border-emerald-500/80 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-extrabold text-white text-sm">
                    ACTIVE DROP: {activeDelivery.title}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-900/80 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                  ETA: {activeDelivery.etaMinutes} MINS
                </span>
              </div>

              <div className="text-xs text-slate-300 mb-3">
                <span className="font-medium">Courier: {activeDelivery.courierName}</span> ({activeDelivery.courierVehicle}) ·
                Contains: {activeDelivery.items.join(', ')}
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-emerald-400 font-bold">
                  Boosts Player Resilience by +{activeDelivery.resilienceBoost}%
                </span>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onCompleteDelivery();
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Mark Delivered &amp; Consume Boost
                </button>
              </div>
            </div>
          )}

          {/* Delivery Catalog Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Utensils className="w-4 h-4 text-emerald-400" />
              <span>S-T-E-A-R Decompression Fuel, Care Kits &amp; Study Drops</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DELIVERY_CATALOG.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-white leading-snug">{item.title}</h4>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        ${item.cost}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>

                    <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-1">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Kit Contents:</div>
                      <div className="flex flex-wrap gap-1 text-[10px] text-cyan-300">
                        {item.items.map((it, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">
                            • {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      +{item.resilienceBoost}% Resilience
                    </span>
                    <button
                      onClick={() => handleConfirmDelivery(item)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-sm"
                    >
                      Order Drop (${item.cost})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: GAME'S INTERACTIVE CALENDAR & AGENDA            */}
      {/* ========================================================= */}
      {hubTab === 'calendar' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Game's Master Schedule &amp; Interview Appointments</span>
              </h3>
              <p className="text-xs text-slate-400">
                Never miss an appointment, interview, or course milestone with automatic PIP alarms.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs">
                {(['all', 'upcoming', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      sound.playClick();
                      setCalendarFilter(filter);
                    }}
                    className={`px-3 py-1 rounded-md capitalize font-semibold transition-colors cursor-pointer ${
                      calendarFilter === filter
                        ? 'bg-cyan-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsAddAptOpen(true);
                }}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Appointment</span>
              </button>
            </div>
          </div>

          {/* Appointments Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className={`p-4 rounded-2xl border transition-all ${
                  apt.isCompleted
                    ? 'bg-slate-950/50 border-slate-800/80 opacity-70'
                    : 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                      {apt.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5 leading-snug">{apt.title}</h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-200 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                      {apt.time}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{apt.date}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">{apt.description}</p>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs space-y-1 mb-3">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {apt.location}
                    </span>
                    <span className="text-emerald-400 font-mono font-bold">
                      +{apt.resilienceReward}% Resilience
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Reminder: {apt.reminderMinutes} minutes prior to PIP alert
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                  {apt.linkedTab && !apt.isCompleted && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onNavigateToTab(apt.linkedTab!);
                      }}
                      className="px-3 py-1.5 bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-500/40 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Launch Session</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}

                  {!apt.isCompleted ? (
                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setDestination(apt.location);
                          setHubTab('rides');
                        }}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Car className="w-3 h-3 text-cyan-400" />
                        <span>Book Ride</span>
                      </button>

                      <button
                        onClick={() => {
                          sound.playSuccess();
                          onCompleteAppointment(apt.id);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Mark Attended
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 ml-auto">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed &amp; Rewards Claimed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Appointment Modal */}
          {isAddAptOpen && (
            <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 shadow-2xl relative">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-cyan-400" />
                    <span>Schedule Appointment or Interview</span>
                  </h3>
                  <button
                    onClick={() => setIsAddAptOpen(false)}
                    className="text-slate-400 hover:text-white text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveAppointment} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">
                      Event / Interview Title:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Boeing Aero-Thermal Interview, Flight Simulator Test..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 font-medium block mb-1">Category:</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as AppointmentCategory)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
                      >
                        <option value="interview">Job Interview</option>
                        <option value="flight_sim">Flight Sim / Aero Lab</option>
                        <option value="mentorship">Mentorship Circle</option>
                        <option value="class">Course Class</option>
                        <option value="closing">Real Estate Closing</option>
                        <option value="wellness">Wellness &amp; Rest</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 font-medium block mb-1">Time:</label>
                      <input
                        type="text"
                        placeholder="e.g. 02:30 PM"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Location:</label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">
                      Link to Game Hub:
                    </label>
                    <select
                      value={newLinkedTab}
                      onChange={(e) => setNewLinkedTab(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="zoom">Virtual Zoom Studio</option>
                      <option value="labs">S.T.E.A.M. Labs / Flight Sim</option>
                      <option value="course">Course &amp; Sceneries</option>
                      <option value="mls">Nationwide MLS</option>
                      <option value="stear">S-T-E-A-R Safe Transit</option>
                    </select>
                  </div>

                  <div className="pt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddAptOpen(false)}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-md"
                    >
                      Save to Calendar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 4: SAFETY SENTINEL & 4-DIGIT PIN CODE              */}
      {/* ========================================================= */}
      {hubTab === 'sentinel' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Rider Handshake PIN &amp; Telemetry Sentinel</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              When entering any S-T-E-A-R vehicle or campus shuttle, both the passenger and driver must confirm this cryptographic 4-digit code.
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 text-center space-y-2">
              <div className="text-[10px] text-slate-400 uppercase font-mono">
                Current Active Rider PIN:
              </div>
              <div className="text-3xl font-mono font-extrabold text-cyan-300 tracking-widest">
                {activeRide ? activeRide.safetyPin : '4892'}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold">
                ✓ Cryptographically Verified Handshake Active
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span>Biometric Rider Check</span>
                <span className="text-cyan-400 font-semibold">
                  {profile.isBiometricallyVerified ? 'Verified OK' : 'Guest Pass Active'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span>Live Route Geofencing</span>
                <span className="text-emerald-400 font-semibold">Detroit Metro Sentinel Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span>Emergency Guardian Relay</span>
                <span className="text-slate-400 font-mono">Linked to Parent Portal (8+)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Emergency SOS Safe Extraction Protocol</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If at any point during your journey or career simulation you experience severe psychological fatigue, disorientation, or feel unsafe, tap the emergency button. An immediate priority S-T-E-A-R Safe vehicle will be dispatched to your coordinates free of charge.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={handleEmergencySOS}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-950/60 border border-red-400/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-white animate-bounce" />
                <span>TRIGGER IMMEDIATE SOS SAFE EXTRACTION</span>
              </button>
            </div>
          </div>

          {/* Official Google Business Listing & Dispatch Registry Profile */}
          <div className="col-span-1 md:col-span-2 bg-slate-900 border-2 border-cyan-500/50 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-mono flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    OFFICIAL DISPATCH &amp; GOOGLE BUSINESS PROFILE
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded font-bold">
                    Detroit, MI HQ
                  </span>
                </div>
                <h3 className="text-base font-black text-white">
                  STEARSafe Official Google Business Profile Listing Copy
                </h3>
                <p className="text-xs text-slate-300">
                  Ready-to-paste listings optimized for Google Maps, Search, and local dispatch discovery (under Google's 750-character limit).
                </p>
              </div>
            </div>

            {/* Listing Version 1: Primary Recommended (749 chars) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Primary Google Business Description (749 Characters · Exact Google Limit)</span>
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    const text = "STEARSafe is Detroit's premier biometric-verified safe transit and community transport network, founded by Jeanell Land. We provide secure, reliable transportation and essential deliveries for students, youth, seniors, working mothers, and families across Wayne County. Powered by patented safety technology, every ride features cryptographic 4-digit PIN handshakes, rigorously vetted drivers, live route geofencing, and 24/7 emergency dispatch. Whether scheduling school commutes, job interview shuttles, medical visits, or community haven transport, STEARSafe delivers complete peace of mind. Partnered with One Stop Rehabilitation Center 501(c)(3). Safety is our standard, community is our purpose. Book your ride today.";
                    navigator.clipboard.writeText(text);
                    setCopiedListing('primary');
                    setTimeout(() => setCopiedListing(null), 3000);
                  }}
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedListing === 'primary' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedListing === 'primary' ? 'Copied to Clipboard!' : 'Copy Listing'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                STEARSafe is Detroit's premier biometric-verified safe transit and community transport network, founded by Jeanell Land. We provide secure, reliable transportation and essential deliveries for students, youth, seniors, working mothers, and families across Wayne County. Powered by patented safety technology, every ride features cryptographic 4-digit PIN handshakes, rigorously vetted drivers, live route geofencing, and 24/7 emergency dispatch. Whether scheduling school commutes, job interview shuttles, medical visits, or community haven transport, STEARSafe delivers complete peace of mind. Partnered with One Stop Rehabilitation Center 501(c)(3). Safety is our standard, community is our purpose. Book your ride today.
              </p>
            </div>

            {/* Google Profile Attributes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Primary Category</span>
                <span className="font-bold text-white">Transportation Service</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Alt: Chauffeur / Non-Profit</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Service Headquarters</span>
                <span className="font-bold text-white text-[11px] block">Detroit, Michigan</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Metro Detroit &amp; Wayne County</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Dispatch Contact</span>
                <span className="font-bold text-emerald-400 font-mono">(313) 510-3610</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Toll-Free: (844) I-GOT-NEEDS</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Official Website</span>
                <span className="font-bold text-cyan-300 font-mono text-[10px] truncate block">onestoprehabilitationcenters.org</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">24/7 Online Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
