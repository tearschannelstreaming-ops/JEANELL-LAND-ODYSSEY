import React, { useState } from 'react';
import {
  Car,
  Utensils,
  Calendar,
  Bell,
  X,
  Minimize2,
  Maximize2,
  Shield,
  Phone,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Volume2,
  Compass,
  Sparkles,
  Users,
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { SafeRideBooking, SafeDeliveryOrder, CalendarAppointment, PipNotification } from '../../types/stear';

interface STEARPipOverlayProps {
  activeRide: SafeRideBooking | null;
  activeDelivery: SafeDeliveryOrder | null;
  upcomingAppointments: CalendarAppointment[];
  notifications: PipNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  onOpenStearHub: (tab?: 'rides' | 'deliveries' | 'calendar') => void;
  onNavigateToTab: (tab: string) => void;
  onCompleteRide: () => void;
  onCompleteDelivery: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const STEARPipOverlay: React.FC<STEARPipOverlayProps> = ({
  activeRide,
  activeDelivery,
  upcomingAppointments,
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  onOpenStearHub,
  onNavigateToTab,
  onCompleteRide,
  onCompleteDelivery,
  isOpen,
  onToggleOpen,
}) => {
  const [pipTab, setPipTab] = useState<'alerts' | 'ride' | 'delivery' | 'calendar'>('alerts');
  const [isMinimized, setIsMinimized] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const nextAppointment = upcomingAppointments.find((a) => !a.isCompleted);

  // If overlay is toggled completely closed, render the floating PIP summon badge
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            sound.playClick();
            onToggleOpen();
            setIsMinimized(false);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900/95 hover:bg-slate-800 text-white rounded-xl border border-cyan-500/50 shadow-lg shadow-cyan-950/40 backdrop-blur-md transition-all group cursor-pointer"
          title="Open S-T-E-A-R Safe Picture-in-Picture Sentinel"
        >
          <div className="relative">
            <Shield className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            )}
          </div>
          <span className="text-xs font-bold tracking-wide">S-T-E-A-R PIP</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 bg-rose-600 text-[10px] font-bold rounded-full text-white">
              {unreadCount}
            </span>
          )}
          {activeRide && (
            <span className="flex items-center gap-1 text-[10px] text-cyan-300 font-mono bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
              <Car className="w-3 h-3 text-cyan-400 animate-pulse" />
              {activeRide.etaMinutes}m
            </span>
          )}
        </button>
      </div>
    );
  }

  // Minimized Compact Bar Mode
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40 w-80 bg-slate-900/95 border border-cyan-500/50 rounded-xl shadow-2xl backdrop-blur-md p-2.5 flex items-center justify-between animate-in slide-in-from-bottom-2 duration-200">
        <div
          onClick={() => {
            sound.playClick();
            setIsMinimized(false);
          }}
          className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
        >
          <div className="relative p-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Shield className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>S-T-E-A-R PIP Mini</span>
              {unreadCount > 0 && (
                <span className="text-[9px] px-1 bg-rose-900 text-rose-200 rounded font-mono">
                  {unreadCount} alerts
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {activeRide ? `Ride ETA ${activeRide.etaMinutes}m (PIN: ${activeRide.safetyPin})` : nextAppointment ? `Next: ${nextAppointment.title}` : 'Safe Sentinel Active'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            onClick={() => {
              sound.playClick();
              setIsMinimized(false);
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            title="Expand PIP"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onToggleOpen();
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            title="Close PIP"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-88 sm:w-96 bg-slate-900/95 border border-cyan-500/40 rounded-2xl shadow-2xl shadow-black/60 backdrop-blur-lg overflow-hidden flex flex-col max-h-[520px] transition-all animate-in slide-in-from-bottom-3 duration-200">
      {/* PIP Window Header */}
      <div className="px-3.5 py-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/60 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>S-T-E-A-R SAFE PIP</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[9px] text-cyan-400/80 font-mono">
              Live Sentinel &amp; Notifications
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              sound.playClick();
              onOpenStearHub();
            }}
            className="text-[10px] text-cyan-400 hover:text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 flex items-center gap-1 cursor-pointer"
            title="Open Full S-T-E-A-R Safe Workspace"
          >
            <span>Hub</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setIsMinimized(true);
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            title="Minimize to Compact Bar"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onToggleOpen();
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            title="Dismiss PIP Window"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* PIP Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/80 text-[11px] font-semibold">
        <button
          onClick={() => {
            sound.playClick();
            setPipTab('alerts');
          }}
          className={`flex-1 py-1.5 text-center flex items-center justify-center gap-1 border-b-2 transition-colors cursor-pointer ${
            pipTab === 'alerts'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-3 h-3" />
          <span>Alerts</span>
          {unreadCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setPipTab('ride');
          }}
          className={`flex-1 py-1.5 text-center flex items-center justify-center gap-1 border-b-2 transition-colors cursor-pointer ${
            pipTab === 'ride'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Car className="w-3 h-3" />
          <span>Ride</span>
          {activeRide && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setPipTab('delivery');
          }}
          className={`flex-1 py-1.5 text-center flex items-center justify-center gap-1 border-b-2 transition-colors cursor-pointer ${
            pipTab === 'delivery'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Utensils className="w-3 h-3" />
          <span>Drops</span>
          {activeDelivery && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setPipTab('calendar');
          }}
          className={`flex-1 py-1.5 text-center flex items-center justify-center gap-1 border-b-2 transition-colors cursor-pointer ${
            pipTab === 'calendar'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-3 h-3" />
          <span>Agenda</span>
        </button>
      </div>

      {/* PIP Body Content */}
      <div className="p-3 overflow-y-auto space-y-3 flex-1 text-xs">
        {/* TAB 1: NOTIFICATION FEED */}
        {pipTab === 'alerts' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800">
              <span>S-T-E-A-R Sentinel Live Notifications</span>
              {notifications.length > 0 && (
                <button
                  onClick={onClearAllNotifications}
                  className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Daily Trivia Challenge Resilience Banner */}
            <div
              onClick={() => {
                sound.playClick();
                onNavigateToTab('trivia');
              }}
              className="p-2 rounded-xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/70 border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer flex items-center justify-between gap-2 group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-white flex items-center gap-1">
                    <span>Jeanell's Historical Trivia</span>
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  </div>
                  <div className="text-[10px] text-amber-200/80 truncate">
                    Daily Aero &amp; Real Estate (+Resilience Bonus)
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>

            {/* Quick Affirmation Deck Boost */}
            <div
              onClick={() => {
                sound.playClick();
                onNavigateToTab('affirmations');
              }}
              className="p-2 rounded-xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between gap-2 group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-white flex items-center gap-1">
                    <span>Jeanell's Affirmation Deck</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 py-0.2 rounded font-mono">+5% Buff</span>
                  </div>
                  <div className="text-[10px] text-emerald-200/80 truncate">
                    Daily Turning Points &amp; Resilient Mantras
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>

            {/* Quick Classmate Collaboration Boost */}
            <div
              onClick={() => {
                sound.playClick();
                onNavigateToTab('collaboration');
              }}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer flex items-center justify-between gap-2 group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-white flex items-center gap-1">
                    <span>Classmate Study Requests</span>
                    <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1 py-0.2 rounded font-mono">+25% Bonus</span>
                  </div>
                  <div className="text-[10px] text-cyan-200/80 truncate">
                    Team up with Kendra or David on STEAM Labs
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>

            {notifications.length === 0 ? (
              <div className="text-center py-6 text-slate-500">
                <Bell className="w-6 h-6 mx-auto mb-1.5 text-slate-600 opacity-60" />
                <p>No new notifications</p>
                <p className="text-[10px] text-slate-600 mt-0.5">
                  Ride updates, delivery alerts, and calendar reminders will stream here.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => onMarkNotificationRead(notif.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    !notif.isRead
                      ? 'bg-slate-950/90 border-cyan-500/40 shadow-sm'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          notif.urgency === 'critical'
                            ? 'bg-rose-500 animate-ping'
                            : notif.urgency === 'high'
                            ? 'bg-amber-400'
                            : 'bg-cyan-400'
                        }`}
                      />
                      <span className="font-bold text-white text-xs">{notif.title}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">{notif.timestamp}</span>
                  </div>

                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">{notif.message}</p>

                  {notif.actionLabel && (
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (notif.actionTab) {
                            sound.playClick();
                            onNavigateToTab(notif.actionTab);
                          }
                        }}
                        className="text-[10px] font-semibold text-cyan-300 hover:text-white bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{notif.actionLabel}</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE RIDE */}
        {pipTab === 'ride' && (
          <div className="space-y-3">
            {activeRide ? (
              <div className="space-y-2.5">
                <div className="bg-slate-950 p-3 rounded-xl border border-cyan-500/50 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 animate-pulse" />
                      Active Ride: {activeRide.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                      ETA {activeRide.etaMinutes} MIN
                    </span>
                  </div>

                  {/* Route progress visual */}
                  <div className="space-y-1 mb-2.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="truncate max-w-[140px]">{activeRide.pickupLocation}</span>
                      <span className="truncate max-w-[140px] text-right font-medium text-slate-200">
                        {activeRide.destinationName}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-3/4 animate-pulse rounded-full" />
                    </div>
                  </div>

                  {/* Driver Details & Safety PIN Handshake */}
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-xs">{activeRide.driverName}</div>
                        <div className="text-[10px] text-slate-400">
                          {activeRide.vehicleModel} · {activeRide.licensePlate}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-slate-400 uppercase font-mono">Safety PIN</div>
                        <div className="text-sm font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40 tracking-wider">
                          {activeRide.safetyPin}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Shield className="w-3 h-3" />
                        S-T-E-A-R Verified Safe
                      </span>
                      <span className="font-mono">{activeRide.driverPhone}</span>
                    </div>
                  </div>

                  {/* Simulation Quick Actions */}
                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <button
                      onClick={onCompleteRide}
                      className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] text-center transition-colors cursor-pointer"
                    >
                      Arrived / Complete Ride
                    </button>
                    <button
                      onClick={() => onOpenStearHub('rides')}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 space-y-2">
                <Car className="w-7 h-7 mx-auto text-slate-600" />
                <p className="text-xs">No active ride in transit</p>
                <button
                  onClick={() => onOpenStearHub('rides')}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  Book Safe Ride Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DELIVERIES */}
        {pipTab === 'delivery' && (
          <div className="space-y-3">
            {activeDelivery ? (
              <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/50 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5" />
                    Drop: {activeDelivery.title}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                    ETA {activeDelivery.etaMinutes}m
                  </span>
                </div>

                <div className="text-[11px] text-slate-300">
                  <div className="font-semibold text-white">Courier: {activeDelivery.courierName}</div>
                  <div className="text-[10px] text-slate-400">{activeDelivery.courierVehicle}</div>
                  <div className="text-[10px] text-emerald-400 mt-1">
                    Delivers: +{activeDelivery.resilienceBoost}% Player Resilience
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={onCompleteDelivery}
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] text-center transition-colors cursor-pointer"
                  >
                    Mark Delivered (+{activeDelivery.resilienceBoost}% Resilience)
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 space-y-2">
                <Utensils className="w-7 h-7 mx-auto text-slate-600" />
                <p className="text-xs">No active deliveries</p>
                <button
                  onClick={() => onOpenStearHub('deliveries')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  Order Brain Food / Supplies
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CALENDAR AGENDA */}
        {pipTab === 'calendar' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800">
              <span>Upcoming Appointments &amp; Interviews</span>
              <button
                onClick={() => onOpenStearHub('calendar')}
                className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
              >
                Full Calendar
              </button>
            </div>

            <div className="space-y-2">
              {upcomingAppointments.slice(0, 3).map((apt) => (
                <div
                  key={apt.id}
                  className={`p-2.5 rounded-xl border text-xs space-y-1.5 ${
                    apt.isCompleted
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                      : 'bg-slate-950 border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-bold text-white text-xs">{apt.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400 shrink-0 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {apt.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate max-w-[180px]">{apt.location}</span>
                    <span className="text-emerald-400 font-mono">+{apt.resilienceReward}% Res</span>
                  </div>

                  {!apt.isCompleted && (
                    <div className="pt-1 flex items-center justify-between border-t border-slate-900 gap-1.5">
                      {apt.linkedTab && (
                        <button
                          onClick={() => {
                            sound.playClick();
                            onNavigateToTab(apt.linkedTab!);
                          }}
                          className="flex items-center gap-1 text-[10px] font-semibold text-cyan-300 hover:text-white bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 cursor-pointer"
                        >
                          <span>Launch Session</span>
                          <ChevronRight className="w-2.5 h-2.5" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          sound.playClick();
                          onOpenStearHub('rides');
                        }}
                        className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <Car className="w-2.5 h-2.5 text-cyan-400" />
                        <span>Book Ride</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PIP Footer Shortcut Bar */}
      <div className="px-3 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>Never Miss An Appointment</span>
        </span>
        <button
          onClick={() => onOpenStearHub('calendar')}
          className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
        >
          <span>Open Game Calendar</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
