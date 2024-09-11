import React from 'react';
import Image from 'next/image';
import { DataTable } from '@/backoffice/components/data-table';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import Loading from '@/components/loading';
import { DetailMentoringViewProps } from './detailMentoring.type';

const DetailMentoringView: React.FC<DetailMentoringViewProps> = ({
  content,
  studentsJoined,
  isLoading,
  filter,
  setFilter,
  columns,
  handleInputPresence,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return new Date(0, 0, 0, parseInt(hours), parseInt(minutes)).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const handleJoinNow = () => {
    const meetLink = content.data?.mentoring?.link;
    if (meetLink) {
      window.open(meetLink, '_blank');
    } else {
      console.error('Meet link is not available');
    }
  };

  const renderContent = () => {
    if (!studentsJoined?.data?.data?.items || studentsJoined.data.data.items.length === 0) {
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
    <Loading isLoading={isLoading}>
      <div>
        <div className="bg-[#323232] rounded-lg px-8 py-[100px] text-white mb-8 flex flex-col items-center">
          <h1 className="text-xl font-bold mb-2 text-center">Join Mentoring</h1>
          <h3 className="text-md mb-10 text-center">
            Mentoring available on{' '}
            {content.data?.mentoring?.date && formatDate(content.data.mentoring.date)}{' '}
            at{' '}
            {content.data?.mentoring?.startTime && formatTime(content.data.mentoring.startTime)}
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
    </Loading>
  );
};

export default DetailMentoringView;