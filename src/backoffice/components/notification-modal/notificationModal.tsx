import React from 'react';
import { Modal } from 'flowbite-react';
import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';

interface NotificationModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
  isError: boolean;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ show, onClose, message, isError }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>
        <div className="flex items-center">
          {isError ? (
            <HiOutlineExclamationCircle className="mr-2 h-5 w-5 text-red-500" />
          ) : (
            <HiOutlineCheckCircle className="mr-2 h-5 w-5 text-green-500" />
          )}
          <span>{isError ? 'Error' : 'Success'}</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <p className={`text-base leading-relaxed ${isError ? 'text-red-500' : 'text-gray-500'} dark:text-gray-400`}>
            {message}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className={`px-4 py-2 ${isError ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
          onClick={onClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
