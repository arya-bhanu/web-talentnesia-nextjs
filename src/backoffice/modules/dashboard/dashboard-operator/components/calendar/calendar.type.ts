

export interface Holiday {
  day: number;
  month: number;
  name: string;
}


export interface CalendarProps {
  currentDate: Date;
  changeMonth: (offset: number) => void;
  handleDateClick: (day: number) => void;
  handleSaveAgenda: () => void;
  agenda: Record<number, string>;
  newAgenda: string;
  setNewAgenda: React.Dispatch<React.SetStateAction<string>>;
  selectedDate: Date | null;
  calendarGrid: (number | null)[];
  isHoliday: (day: number) => boolean;
  isSunday: (day: number) => boolean;
  firstDay: number;
}
