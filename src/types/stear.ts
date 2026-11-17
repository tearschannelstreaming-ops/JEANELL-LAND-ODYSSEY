export type RideStatus = 'requested' | 'en_route' | 'arrived' | 'in_transit' | 'completed' | 'cancelled';
export type RideType =
  | 'aero_shuttle'
  | 'late_night_safe'
  | 'interview_priority'
  | 'community_transit'
  | 'emergency_sos';

export interface SafeRideBooking {
  id: string;
  type: RideType;
  title: string;
  pickupLocation: string;
  dropoffLocation: string;
  destinationName: string;
  driverName: string;
  driverPhone: string;
  driverRating: number;
  vehicleModel: string;
  licensePlate: string;
  safetyPin: string; // 4-digit verification code
  etaMinutes: number;
  status: RideStatus;
  fare: number;
  isFreeVoucher: boolean;
  createdAt: string;
  scheduledFor?: string;
  notes?: string;
}

export type DeliveryStatus = 'preparing' | 'dispatched' | 'out_for_delivery' | 'delivered';
export type DeliveryCategory =
  | 'brain_food'
  | 'study_supplies'
  | 'emergency_care'
  | 'pantry_groceries';

export interface SafeDeliveryOrder {
  id: string;
  category: DeliveryCategory;
  title: string;
  items: string[];
  courierName: string;
  courierVehicle: string;
  etaMinutes: number;
  status: DeliveryStatus;
  cost: number;
  resilienceBoost: number; // +10 to +20 on delivery
  createdAt: string;
  deliveredAt?: string;
}

export type AppointmentCategory =
  | 'interview'
  | 'class'
  | 'flight_sim'
  | 'mentorship'
  | 'closing'
  | 'ride'
  | 'wellness';

export interface CalendarAppointment {
  id: string;
  title: string;
  description: string;
  category: AppointmentCategory;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:30 AM"
  durationMinutes: number;
  location: string;
  isVirtual: boolean;
  linkedTab?: string; // tab to navigate to (e.g. 'zoom', 'labs', 'metaverse', 'stear')
  reminderMinutes: number; // e.g. 15, 30, 60
  isCompleted: boolean;
  resilienceReward: number;
  coolPointsReward: number;
  safetyCheckInRequired?: boolean;
}

export interface PipNotification {
  id: string;
  type: 'ride' | 'delivery' | 'calendar' | 'resilience' | 'emergency';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionTab?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface MentalStateAnalysis {
  state: 'critical_strain' | 'elevated_fatigue' | 'balanced' | 'high_fortitude' | 'peak_flow';
  headline: string;
  description: string;
  recommendedAction: string;
  colorScheme: {
    border: string;
    glow: string;
    badgeBg: string;
    textColor: string;
  };
}
