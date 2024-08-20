import React, { useState } from 'react';
import { ProgramCardType } from './programCard.type';
import TrashBtn from '@/../public/icons/manage-program/trash-btn.svg';
import CourseDetail from '../../../components/course-detail';

interface ProgramCardViewProps {
  data: ProgramCardType;
}

export const ProgramCardView: React.FC<ProgramCardViewProps> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const handleSubmitSelectedModul = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              <dd className="text-xs mt-2 text-gray-500">{data.date}</dd>
            </div>
            <TrashBtn className="ml-4" />
          </dl>
        </div>
      </div>

        {modalOpen && (
        <CourseDetail
          openModal={modalOpen}
          setOpenModal={setModalOpen}
        />
      )}
    </>
  );
};
