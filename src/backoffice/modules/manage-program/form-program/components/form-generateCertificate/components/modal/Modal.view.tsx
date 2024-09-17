'use client';
import { Button } from 'flowbite-react/components/Button';
import { Modal } from 'flowbite-react/components/Modal';
import React, { useEffect, useRef, useState } from 'react';
import { IModal } from './modal.type';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';

const ModalGenerateView: React.FC<IModal> = ({
  state,
  children,
  title,
  handleSubmit,
  buttonConfirmTitle = 'Submit',
  childProps,
  isEdit,
}) => {
  const formRef = useRef(null);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isConfrm, setIsConfrm] = useState(false);
  useEffect(() => {
    const form = formRef.current;
    if (isConfrm && form) {
      (form as HTMLFormElement).requestSubmit();
    }
    setIsConfrm(false);
  }, [isConfrm]);
  return (
    <Modal
      size={'7xl'}
      show={state.openModal}
      onClose={() => state.setOpenModal(false)}
    >
      <AlertModal
        openModal={isEditModal}
        setIsConfirmed={setIsConfrm}
        setOpenModal={setIsEditModal}
        messageText='Are you sure you want to update this item?'
      />
      <Modal.Header>{title}</Modal.Header>
      <form ref={formRef} className="overflow-auto" onSubmit={handleSubmit}>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer className="w-full justify-end">
          <Button
            onClick={() => state.setOpenModal(false)}
            type="button"
            outline
            className="border transition-none delay-0 border-[#F04438] text-[#F04438] outline-transparent bg-transparent enabled:hover:bg-[#F04438] enabled:hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (isEdit) {
                setIsEditModal(true);
              } else {
                setIsConfrm(true);
              }
            }}
            type="button"
            color={'warning'}
            className="bg-[#FFC862] text-black"
          >
            {buttonConfirmTitle}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalGenerateView;
