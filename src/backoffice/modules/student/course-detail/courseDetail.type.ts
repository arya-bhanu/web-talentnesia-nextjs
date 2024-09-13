

export interface APIResponseCourseDetail {
    success: boolean;
    code: number;
    status: string;
    errors: null;
    messages: string;
    data: {
      course: CourseData;
      mentors: Mentor[];
      certificates: any[];
      joinGroup: JoinGroup;
      attendance: Attendance;
      assignment: Assignment;
      calendar: Calendar[];
    };
  }

  export interface Mentor {
    programId: string;
    mentorId: string;
    mentorName: string;
    mentorEmail: string;
    mentorPhone: string;
    mentorPhoto: string;
  }
  
  export interface JoinGroup {
    title: string;
    link: string;
  }
  
  export interface Attendance {
    presenceCount: number;
    absenceCount: number;
    totalCount: number;
    presencePercentage: number;
    absencePercentage: number;
  }
  
  export interface Assignment {
    onTimeCount: number;
    lateCount: number;
    totalCount: number;
    onTimePercentage: number;
    latePercentage: number;
  }

  export interface CourseData {
    id: string;
    code: string;
    name: string;
    active: number;
    startDate: string;
    endDate: string;
    image: string;
    description: string | null;
    createdBy: string | null;
    institutionId: string;
    type: string;
    progress: number;
    status: number;
    chapters: Chapter[];
  }

  export interface Chapter {
    id: string;
    title: string;
    active: number;
    order: number;
    duration: string | null;
    description: string | null;
    chapterProgramId: string;
    createdBy: string | null;
    contents: Content[];
  }
  
  export interface Content {
    id: string;
    chapterId: string;
    title: string;
    type: string;
    duration: string;
    order: number;
    isexam: number;
    isCompleted: number;
    body: string | null;
    date: string | null;
    createdBy: string;
  }
  
  export interface Certificate {
    id: string;
    title: string;
    image: string;
    isDownload: number;
    active: number;
  }

  export interface Calendar {
    id: string;
    title: string;
    startdate: string;
    enddate: string;
    location: string | null;
    link: string | null;
    description: string;
    type: number;
  }
  