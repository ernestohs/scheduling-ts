/**
 * Valid day of the week values
 */
export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

/**
 * Represents a time unit with a value and unit type
 */
export interface TimeUnit {
  value: number; // minimum: 0
  unit: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
}

/**
 * Represents a time range with start and end times
 */
export interface TimeRange {
  start: string; // format: time (e.g., "13:30:00")
  end: string; // format: time (e.g., "14:30:00")
}

/**
 * Represents a date and time, optionally with a timezone
 */
export interface DateTime {
  date: string; // format: date (e.g., "2023-09-15")
  time: string; // format: time (e.g., "13:30:00")
  timeZone?: string; // optional
}

/**
 * Represents a duration with a value and unit
 */
export interface Duration {
  value: number; // minimum: 1
  unit: 'second' | 'minute' | 'hour' | 'day';
}

/**
 * Represents an attendee for an appointment
 */
export interface Attendee {
  name: string;
  email: string; // format: email
  status: 'confirmed' | 'tentative' | 'declined' | 'invited';
}

/**
 * Metadata for the scheduling framework
 */
export interface Metadata {
  version?: string;
  calendarId?: string;
  defaultTimeZone?: string;
  icalURI?: string; // format: uri
}

/**
 * Represents a single appointment
 */
export interface Appointment {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: DateTime;
  end: DateTime;
  duration?: Duration;
  attendees?: Attendee[];
  reminders?: TimeUnit[];
}

/**
 * Represents a recurring schedule
 */
export interface RecurringSchedule {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  pattern?: string; // Advanced recurrence pattern using RRULE format
  interval?: number; // minimum: 1
  weekDays?: WeekDay[];
  monthDays?: number[]; // Each number between 1-31
  months?: number[]; // Each number between 1-12
  timeRanges?: TimeRange[];
  startDate?: string; // format: date
  endDate?: string; // format: date
  exceptions?: string[]; // format: date (for exception dates)
}

/**
 * Represents a holiday exception for business hours
 */
export interface HolidayException {
  name: string;
  date: string; // format: date
  isFullDay: boolean;
  altHours?: TimeRange[];
}

/**
 * Represents business hours for a schedule
 */
export interface BusinessHours {
  timeZone: string;
  schedule: {
    monday?: TimeRange[];
    tuesday?: TimeRange[];
    wednesday?: TimeRange[];
    thursday?: TimeRange[];
    friday?: TimeRange[];
    saturday?: TimeRange[];
    sunday?: TimeRange[];
  };
  holidayExceptions?: HolidayException[];
}

/**
 * The main scheduling framework interface
 */
export interface SchedulingFramework {
  metadata?: Metadata;
  appointments?: Appointment[];
  recurringSchedules?: RecurringSchedule[];
  businessHours?: BusinessHours;
}

