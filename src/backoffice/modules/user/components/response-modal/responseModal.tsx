import React from 'react';
import { Modal, Button } from 'flowbite-react';

interface ResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  showCancel?: boolean;
}

export const ResponseModal: React.FC<ResponseModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  showCancel = false,
}) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        <h1 className="text-xl font-semibold">{title}</h1>
      </Modal.Header>
      <Modal.Body>
        <h2 className="text-lg">{message}</h2>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end w-full">
          <Button
            color="warning"
            onClick={onConfirm}
            className="bg-[#FFC862] border-none text-black"
          >
            {confirmText}
          </Button>
          {showCancel && (
            <Button
              color="failure"
              onClick={onClose}
              className="ml-2 bg-transparent border-[#F04438] text-[#F04438]"
            >
              Cancel
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};
