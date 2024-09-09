import React, { useState, useMemo, useEffect } from 'react';
import { DataTable } from '@/backoffice/components/data-table';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import Image from 'next/image';
import { APIContentChapterProps } from '../../detailContent.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchStudentsJoined } from '../../../table-students/api/tableStudents.api';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import { useSearchParams } from 'next/navigation';
import { addAttendance } from './api/detailMentoring.api';

const columnHelper = createColumnHelper<any>();

interface Attendance {
  [key: string]: string;
}

const DetailMentoring: React.FC<{
  content: { data: APIContentChapterProps };
}> = ({ content }) => {
  const [filter, setFilter] = useState('');
  const [attendances, setAttendances] = useState<Attendance>({});
  const meetLink = content.data?.mentoring?.link || '';

  const searchParams = useSearchParams();
  const programId = searchParams.get('programId');
  const contentId = searchParams.get('contentId');

  const { data: studentsJoined, isLoading } = useQuery({
    queryKey: ['students', programId],
    queryFn: () => fetchStudentsJoined(programId),
  });

  // console.log('Mentoring', content.data);
  // console.log('attendances', attendances);
  // console.log('studentsJoined', studentsJoined);
  // console.log('Content ID:', studentsJoined?.data?.data?.items);

  const handleJoinNow = () => {
    if (meetLink) {
      const meetCode = meetLink.split('/').pop();
      const googleMeetUrl = `https://meet.google.com/${meetCode}`;
      window.open(googleMeetUrl, '_blank');
    } else {
      console.error('Meet link is not available');
    }
  };

  const addAttendanceMutation = useMutation({
    mutationFn: addAttendance,
    onError: (error) => {
      console.error('Error in addAttendanceMutation:', error);
    },
  });

  const handleAttendanceChange = (userId: string, status: string) => {
    setAttendances((prev) => ({ ...prev, [userId]: status }));
  };

  const handleInputPresence = () => {
    if (!contentId) {
      console.error('Content ID is not available');
      return;
    }

    const payload = {
      dateAttendance: new Date().toISOString().split('T')[0],
      programId: programId!,
      contentId: contentId,
      attendances:
        studentsJoined?.data?.data?.items?.map((student) => ({
          userId: student.userId ?? '',
          status: student.userId ? (attendances[student.userId] ?? '') : '',
          desc: '',
        })) || [],
    };
    console.log('Payload being sent:', payload);

    addAttendanceMutation.mutate(payload);
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('no', {
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => (
          <SortingTable column={column} title="Student Name" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('userId', {
        id: 'presence',
        header: ({ column }) => (
          <SortingTable column={column} title="Presence" />
        ),
        cell: ({ row }) => {
          const defaultValue = '1';
          if (!attendances[row.original.userId]) {
            handleAttendanceChange(row.original.userId, defaultValue);
          }
          return (
            <div className="flex space-x-2">
              {['Alpha', 'Masuk', 'Izin'].map((status, index) => (
                <label key={status} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`presence-${row.original.userId}`}
                    value={index.toString()}
                    checked={
                      attendances[row.original.userId] === index.toString()
                    }
                    onChange={() =>
                      handleAttendanceChange(
                        row.original.userId,
                        index.toString(),
                      )
                    }
                    className="mr-1 cursor-pointer"
                  />
                  <span className="cursor-pointer">{status}</span>
                </label>
              ))}
            </div>
          );
        },
      }),
      
    ],
    [attendances],
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return new Date(
      0,
      0,
      0,
      parseInt(hours),
      parseInt(minutes),
    ).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (
      !studentsJoined?.data?.data?.items ||
      studentsJoined.data.data.items.length === 0
    ) {
      return (
        <div className="flex flex-col items-center mt-8">
          <Image
            src="/img/course-sidebar/No results.svg"
            alt="No results"
            width={80}
            height={80}
          />
          <p className="mt-4 text-gray-500">No students have joined yet</p>
        </div>
      );
    }

    return (
      <DataTable
        columns={columns}
        data={studentsJoined.data.data.items}
        filter={{ Filter: filter, setFilter: setFilter }}
        sorting={[{ id: 'no', desc: false }]}
      />
    );
  };

  return (
    <div>
      <div className="bg-[#323232] rounded-lg px-8 py-[100px] text-white mb-8 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-2 text-center">Join Mentoring</h1>
        <h3 className="text-md mb-10 text-center">
          Mentoring available on{' '}
          {content.data?.mentoring?.date &&
            formatDate(content.data.mentoring.date)}{' '}
          at{' '}
          {content.data?.mentoring?.startTime &&
            formatTime(content.data.mentoring.startTime)}
        </h3>

        <div className="flex space-x-4 justify-center">
          <button
            className="px-4 py-2 rounded-md bg-[#B9BDC7] text-white"
            onClick={handleJoinNow}
          >
            Join Now
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Presence</h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md bg-white text-black"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            className="px-4 py-2 rounded-md border bg-[#FFC862]"
            onClick={handleInputPresence}
          >
            Input Presence
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default DetailMentoring;
