import { APIContentChapterProps } from "../../detailContent.type";
import { ColumnDef } from '@tanstack/react-table';

export interface Attendance {
  userId: string;
  status: string;
  desc: string;
}

export interface AttendancePayload {
  dateAttendance: string;
  programId: string;
  contentId: string;
  attendances: Attendance[];
}

export interface DetailMentoringViewProps {
  content: { data: APIContentChapterProps };
  studentsJoined: StudentsJoinedResponse;
  isLoading: boolean;
  filter: string;
  setFilter: (value: string) => void;
  columns: ColumnDef<any>[];
  handleInputPresence: () => void;
}

export interface Student {
  userId: string;
  name: string;
}
export interface StudentsJoinedResponse {
  data: {
    data: {
      items: Student[];
    };
  };
}

export interface AttendanceItem {
  userId: string;
  status: string;
  desc: string;
}

export interface AttendanceResponse {
  dateAttendance: string;
  programId: string;
  contentId: string;
  attendances: AttendanceItem[];
}