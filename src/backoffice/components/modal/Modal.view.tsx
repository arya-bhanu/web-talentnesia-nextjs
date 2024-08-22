'use client';
import { Button } from 'flowbite-react/components/Button';
import { Modal } from 'flowbite-react/components/Modal';
import React from 'react';
import { IModal } from './modal.type';

const ModalView: React.FC<IModal> = ({
  state,
  children,
  title,
  handleSubmit,
  buttonConfirmTitle = 'Submit',
}) => {
  return (
    <Modal  size={'4xl'} show={state.openModal} onClose={() => state.setOpenModal(false)}>
      <Modal.Header>{title}</Modal.Header>
      <form className='overflow-auto' onSubmit={handleSubmit}>
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
            type="submit"
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
