import { ColumnDef } from '@tanstack/react-table';

export interface ScoreData {
  no: number;
  student: string;
  status: 'On Time' | 'Late' | 'Missed';
  submitDate: string;
  taskDeadline: string;
}

export const scoreData: ScoreData[] = [
  { no: 1, student: 'Ancika', status: 'On Time', submitDate: '2024-08-01T20:30:00', taskDeadline: '2024-08-01T23:59:59' },
  { no: 2, student: 'Bram', status: 'Late', submitDate: '2024-08-02T20:30:00', taskDeadline: '2024-08-02T18:00:00' },
  { no: 3, student: 'Cinda', status: 'Missed', submitDate: '2024-08-03T00:00:00', taskDeadline: '2024-08-02T23:59:59' },
  { no: 4, student: 'Dani', status: 'On Time', submitDate: '2024-08-04T17:00:00', taskDeadline: '2024-08-04T23:59:59' },
  { no: 5, student: 'Eko', status: 'Late', submitDate: '2024-08-05T20:30:00', taskDeadline: '2024-08-05T18:00:00' },
];

export const questions = [
  {
    no: 1,
    question: "Apa itu User Experience (UX) dan mengapa penting?",
  },
  {
    no: 2,
    question: "Sebutkan dan jelaskan lima prinsip dasar desain UX.",
  },
  {
    no: 3,
    question: "Bagaimana cara melakukan penelitian pengguna yang efektif?",
  },
  {
    no: 4,
    question: "Apa perbedaan antara wireframes dan prototypes dalam desain UX?",
  },
  {
    no: 5,
    question: "Jelaskan metode usability testing dan manfaatnya.",
  },
  {
    no: 6,
    question: "Jelaskan metode usability testing dan manfaatnya.",
  },
];

export const columns: ColumnDef<ScoreData>[] = [
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
    accessorFn: (row) => row.taskDeadline,
    header: 'Task Deadline',
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
          <div className='text-xs font-normal text-gray-500'>{formattedTime}</div>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.submitDate,
    header: 'Submit Date',
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
          <div className='text-xs font-normal text-gray-500'>{formattedTime}</div>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.status,
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as ScoreData['status'];
      const statusClass =
        status === 'On Time'
          ? 'bg-green-200 text-green-500'
          : 'bg-red-200 text-red-500';

      return (
        <span className={`p-1.5 rounded-md ${statusClass}`}>
          {status}
        </span>
      );
    },
  },
];
