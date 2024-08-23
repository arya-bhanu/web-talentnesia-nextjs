import { ColumnDef } from '@tanstack/react-table';

export interface AttendanceData {
  no: number;
  student: string;
  status: 'Absent' | 'Attended';
  mentoringDate: string;
}

export const attendanceData: AttendanceData[] = [
  { no: 1, student: 'Ancika', status: 'Absent', mentoringDate: '2024-08-01T20:30:00' },
  { no: 2, student: 'Bram', status: 'Absent', mentoringDate: '2024-08-02T20:30:00' },
  { no: 3, student: 'Cinda', status: 'Absent', mentoringDate: '2024-08-03T20:30:00' },
  { no: 4, student: 'Dani', status: 'Attended', mentoringDate: '2024-08-04T20:30:00' },
  { no: 5, student: 'Eko', status: 'Attended', mentoringDate: '2024-08-05T20:30:00' },
];

export const columns: ColumnDef<AttendanceData>[] = [
  {
    accessorFn: (row) => row.no,
    header: 'No',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.student,
    header: 'Student Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.mentoringDate,
    header: 'Mentoring Date',
    cell: (info) => {
      const date = new Date(info.getValue() as string);
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(date);
      const formattedTime = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date);

      return (
        <div>
          <div className="text-sm font-semibold">{formattedDate}</div>
          <div className='text-xs font-normal'>{formattedTime}</div>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.status,
    header: 'Status',
    cell: (info) => (
      <span className={info.getValue() as AttendanceData['status'] === 'Absent' ? 'bg-green-200 p-1.5 rounded-md text-green-400' : 'bg-red-200 rounded-md p-1.5 text-red-400'}>
        {info.getValue() as AttendanceData['status']}
      </span>
    ),
  },
];
