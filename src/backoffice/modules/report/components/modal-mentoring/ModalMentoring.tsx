import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import TableScore from '../table-score/TableScore';
import { IModalMentoringProps } from './modalMentoring.type';
import Question from '../question/Question';

export const ModalMentoring: React.FC<
  IModalMentoringProps & { closeModal: () => void }
> = ({ closeModal }) => {
  const title = 'Mentoring 1';

  return (
    <Modal show onClose={closeModal} size="7xl">
      <Modal.Header className="border-b-2">
        <div className="flex justify-between w-full font-poppins text-2xl font-semibold">
          {title}
        </div>
      </Modal.Header>
      <Modal.Body>
        <TableScore title='Score' />
      </Modal.Body>
    </Modal>
  );
};
