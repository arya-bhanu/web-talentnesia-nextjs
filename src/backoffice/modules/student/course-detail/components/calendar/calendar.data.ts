// calendar.data.ts
export interface ScheduleItem {
    month: number;
    day: number;
    time: string;
    event: string;
    icon: string; 
  }
  
  export const scheduleData: ScheduleItem[] = [
    {
      month: 8, 
      day: 27, 
      time: '08:00',
      event: 'Mentoring Session',
      icon: 'mentoring',
    },
    {
      month: 8,
      day: 27, 
      time: '12:00',
      event: 'Quiz',
      icon: 'quiz', 
    },
    {
      month: 8,
      day: 28, 
      time: '12:00',
      event: 'Quiz',
      icon: 'quiz', 
    },
];
  