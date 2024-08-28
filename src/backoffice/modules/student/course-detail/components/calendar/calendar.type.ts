export interface Day {
    date: number;
    isToday?: boolean;
  }
  
  export interface CalendarProps {
    currentMonth: string;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
    days: Day[][];
    selectedDate?: Date;
  }
  