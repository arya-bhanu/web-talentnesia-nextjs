import { ColumnDef } from '@tanstack/react-table';

export interface AttendanceData {
  no: number;
  student: string;
  status: 'Present' | 'Not - Present';
}

export const attendanceData: AttendanceData[] = [
  { no: 1, student: 'Ancika', status: 'Present' },
  { no: 2, student: 'Bram', status: 'Present' },
  { no: 3, student: 'Cinda', status: 'Present' },
  { no: 4, student: 'Dani', status: 'Not - Present' },
  { no: 5, student: 'Eko', status: 'Not - Present' },
];

export const columns: ColumnDef<AttendanceData>[] = [
  {
    accessorFn: (row) => row.no,
    header: 'No',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.student,
    header: 'Student',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.status,
    header: 'Status',
    cell: (info) => (
      <span className={info.getValue() as AttendanceData['status'] === 'Present' ? 'text-green-500' : 'text-red-500'}>
        {info.getValue() as AttendanceData['status']}
      </span>
    ),
  },
];
