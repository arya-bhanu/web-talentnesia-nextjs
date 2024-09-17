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
  studentsJoined: any;
  isLoading: boolean;
  filter: string;
  setFilter: (value: string) => void;
  columns: ColumnDef<any>[];
  handleInputPresence: () => void;
}