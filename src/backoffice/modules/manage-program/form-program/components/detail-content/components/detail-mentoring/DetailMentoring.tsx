import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { fetchStudentsJoined } from '../../../table-students/api/tableStudents.api';
import { addAttendance } from './api/detailMentoring.api';
import { APIContentChapterProps } from '../../detailContent.type';
import DetailMentoringView from './DetailMentoring.view';

const columnHelper = createColumnHelper<any>();

interface Attendance {
  [key: string]: string;
}

const DetailMentoring: React.FC<{
  content: { data: APIContentChapterProps };
}> = ({ content }) => {
  const [filter, setFilter] = useState('');
  const [attendances, setAttendances] = useState<Attendance>({});

  const searchParams = useSearchParams();
  const programId = searchParams.get('programId');
  const contentId = searchParams.get('contentId');

  const { data: studentsJoined, isLoading } = useQuery({
    queryKey: ['students', programId],
    queryFn: () => fetchStudentsJoined(programId),
    enabled: !!programId,
  });

  const addAttendanceMutation = useMutation({
    mutationFn: addAttendance,
    onSuccess: () => {
      // Handle success (e.g., show a success message)
    },
    onError: (error) => {
      console.error('Error in addAttendanceMutation:', error);
      // Handle error (e.g., show an error message)
    },
  });

  const handleAttendanceChange = (userId: string, status: string) => {
    setAttendances((prev) => ({ ...prev, [userId]: status }));
  };

  const handleInputPresence = () => {
    if (!contentId || !programId) {
      console.error('Content ID or Program ID is not available');
      return;
    }

    const payload = {
      dateAttendance: new Date().toISOString().split('T')[0],
      programId,
      contentId,
      attendances: studentsJoined?.data?.data?.items?.map((student) => ({
        userId: student.userId ?? '',
        status: student.userId ? (attendances[student.userId] ?? '') : '',
        desc: '',
      })) || [],
    };

    addAttendanceMutation.mutate(payload);
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('no', {
        header: 'No',
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: 'Student Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('userId', {
        id: 'presence',
        header: 'Presence',
        cell: ({ row }) => {
          const statuses = ['Alpha', 'Masuk', 'Izin'];
          return statuses.map((status, index) => (
            <label key={status} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={`presence-${row.original.userId}`}
                value={index.toString()}
                checked={attendances[row.original.userId] === index.toString()}
                onChange={() => handleAttendanceChange(row.original.userId, index.toString())}
                className="mr-1 cursor-pointer"
              />
              <span className="cursor-pointer">{status}</span>
            </label>
          ));
        },
      }),
    ],
    [attendances],
  );

  return (
    <DetailMentoringView
      content={content}
      studentsJoined={studentsJoined}
      isLoading={isLoading}
      filter={filter}
      setFilter={setFilter}
      columns={columns}
      handleInputPresence={handleInputPresence}
    />
  );
};

export default DetailMentoring;