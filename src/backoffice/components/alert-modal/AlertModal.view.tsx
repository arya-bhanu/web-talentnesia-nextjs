'use client';
import { Button } from 'flowbite-react/components/Button';
import { Modal } from 'flowbite-react/components/Modal';
import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { IAlertModal } from './alertModal.type';

const AlertModalView: React.FC<IAlertModal> = ({
  openModal,
  setOpenModal,
  setIsConfirmed,
}) => {
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => {
                setIsConfirmed(true);
                setOpenModal(false);
              }}
            >
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AlertModalView;
