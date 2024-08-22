import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import TableScore from '../table-score/TableScore';
import { IExamModalProps } from './modalExam.type';
import Question from '../question/Question';

export const ModalExam: React.FC<IExamModalProps & { closeModal: () => void }> = ({ closeModal }) => {

  const title = 'Exam Hick`s Law';
  return (
    <Modal show onClose={closeModal} size="7xl">
      <Modal.Header className='border-b-2'>
        <div className="flex justify-between w-full font-poppins text-2xl font-semibold">
          {title}
        </div>
      </Modal.Header>
      <Modal.Body className='p-0'>
        <div className="flex flex-1 gap-6">
          <div className="w-[35%] border-r-2 h-full pl-4 pt-4">
            <Question />
          </div>
          <div className="w-[65%] overflow-x-auto"> 
            <div className="gap-4 pr-4 pt-4">
              <TableScore />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
