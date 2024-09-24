export interface Agenda {
    date: string;
    title: string;
    startTime: string;
    endTime: string;
  }
  
  export interface DashboardMentorData {
    totalStudent: number;
    totalCourse: number;
    totalClassroom: number;
    agenda: Agenda[];
  }
  
  export interface DashboardMentorResponse {
    success: boolean;
    code: number;
    status: string;
    errors: null;
    messages: string;
    data: DashboardMentorData;
  }
  