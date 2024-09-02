'use client';
import { Button } from 'flowbite-react/components/Button';
import { Modal } from 'flowbite-react/components/Modal';
import React, { useEffect, useRef, useState } from 'react';
import { IModal } from './modal.type';
import AlertEditModal from '../alert-edit-modal';

const ModalView: React.FC<IModal> = ({
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
  }, [isConfrm]);
  return (
    <Modal
      size={'4xl'}
      show={state.openModal}
      onClose={() => state.setOpenModal(false)}
    >
      <AlertEditModal
        openModal={isEditModal}
        setIsConfirmed={setIsConfrm}
        setOpenModal={setIsEditModal}
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

export default ModalView;
