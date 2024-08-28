import React, { useState } from 'react';
import { ListProgramCardType } from './listProgramCard.type';
import CourseDetail from '../../../components/course-detail';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

interface ProgramCardViewProps {
  data: ListProgramCardType;
}

export const ListProgramCardView: React.FC<ProgramCardViewProps> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!isValid(start) || !isValid(end)) {
      return 'Invalid date range';
    }

    const formattedStart = format(start, 'dd MMMM yyyy', { locale: id });
    const formattedEnd = format(end, 'dd MMMM yyyy', { locale: id });

    return `Periode ${formattedStart} - ${formattedEnd}`;
  };

  return (
    <>
      <div className="block p-4 shadow-sm shadow-indigo-100 cursor-pointer" onClick={handleOpenModal}>
        <img
          alt={data.name}
          src={data.imageUrl}
          className="h-[150px] w-full rounded-t-xl object-cover"
        />
        <div className="mt-2">
          <dl className="flex justify-between items-center">
            <div>
              <dd className="font-medium">{data.name}</dd>
              <dd className="text-xs mt-2 text-gray-500">
                {formatDate(data.startDate, data.endDate)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {modalOpen && (
        <CourseDetail
          openModal={modalOpen}
          setOpenModal={setModalOpen}
          courseId={data.id}
        />
      )}
    </>
  );
};
