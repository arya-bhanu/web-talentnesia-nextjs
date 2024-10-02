import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { LogoutModalProps } from './logoutModal.type';

const LogoutModal: React.FC<LogoutModalProps> = ({
  show,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal show={show} onClose={onClose} size="md" popup>
      <Modal.Header className="border-none items-center p-4">
        Log Out
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-gray-100 p-3 justify-end">
        <div className="flex gap-4">
          <Button color="gray" onClick={onClose} className="underline text-gray-600">
            {'Cancel'}
          </Button>
          <Button color="failure" onClick={onConfirm}>
            {'Log Out'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
