export interface AttendanceData {
    no: number;
    session: string;
    subsession: string;
    course: string;
    mentor: string;
    date: string;
    status: 'Attended' | 'Missed'; 
  }
  