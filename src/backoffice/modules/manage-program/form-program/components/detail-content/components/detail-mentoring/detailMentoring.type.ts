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

export interface Attendance {
  [key: string]: string;
};