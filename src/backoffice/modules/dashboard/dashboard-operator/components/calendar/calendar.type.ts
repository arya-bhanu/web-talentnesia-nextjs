export interface Holiday {
  day: number;
  month: number;
}

export interface CalendarProps {
  currentDate: Date;
  changeMonth: (offset: number) => void;
  handleDateClick: (day: number) => void;
  calendarGrid: (number | null)[];
  isHoliday: (day: number) => boolean;
  isSunday: (day: number) => boolean;
  selectedDate: Date | null;
}
