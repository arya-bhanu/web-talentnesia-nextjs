import Checkmark from '@/components/checkmark-animation/CheckmarkAnimation';
import CrossmarkAnimation from '@/components/crossmark-animation/CrossmarkAnimation';
import { useStatusModalStore } from '@/lib/store';
import { Modal } from 'flowbite-react/components/Modal';
import React, { ReactNode, useMemo } from 'react';

const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const { isModalActive, closeModal, status, action, modalMessage } =
    useStatusModalStore();
  const actionMessage = useMemo(() => {
    if (action) {
      switch (action) {
        case 'create':
          return 'Create Data';
        case 'delete':
          return 'Delete Data';
        case 'update':
          return 'Update Data';
        default:
          return '';
      }
    }
  }, [action]);
  return (
    <>
      {isModalActive && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] flex z-50">
          <Modal
            className="m-auto"
            dismissible
            show={isModalActive}
            onClose={closeModal}
            size={status === 'error' ? 'xl' : 'md'}
          >
            <Modal.Body>
              <div className="flex flex-col items-center">
                <p>
                  {status === 'success' ? (
                    <Checkmark />
                  ) : (
                    <CrossmarkAnimation />
                  )}
                </p>
                <div className="mt-5 flex flex-col gap-y-2.5 items-center">
                  <p className="font-bold text-xl text-center">
                    {status === 'success' ? 'Success' : 'Failed'}
                  </p>
                  {actionMessage && (
                    <p className="text-center">
                      <span>{status === 'error' ? 'Unable to ' : 'Successfully'}</span>
                      <span>{actionMessage}</span>
                    </p>
                  )}
                  {modalMessage && (
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center">
                      {modalMessage}
                    </p>
                  )}
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
      {children}
    </>
  );
};

export default ToasterProvider;
