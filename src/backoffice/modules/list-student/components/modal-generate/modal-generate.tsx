import React, { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { useStatusModalStore } from '@/lib/store';
import LinkRegis from '@/../public/icons/manage-user/link.svg';
import LinkRegis2 from '@/../public/icons/manage-user/linkGray.svg';
import Regenerate from '@/../public/icons/manage-user/regenerate.svg';
import CloseIcon from '@/../public/icons/manage-user/close.svg';
import { InviteTokenAPI } from './generateTokenApi';
import { decodeToken } from '@/lib/tokenDecoder';

interface LinkRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LinkRegisterModal: React.FC<LinkRegisterModalProps> = ({ isOpen, onClose }) => {
  const [newLink, setNewLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { openModal } = useStatusModalStore();

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setNewLink('');
    }
  }, [isOpen]);

  const handleGenerateLink = async () => {
    const decodedToken = decodeToken();
    if (!decodedToken || !decodedToken.educationInstitutionId) {
      setError('Institution ID is missing from the session data');
      openModal({
        status: 'error',
        message: 'Unable to generate link: Institution ID is missing',
      });
      return;
    }
    try {
      const { registrationUrl } = await InviteTokenAPI.generate(decodedToken.educationInstitutionId);
      setNewLink(registrationUrl);
      setError(null);
    } catch (error) {
      console.error('Error generating link:', error);
      setError('Error generating link. Please try again later.');
      openModal({
        status: 'error',
        message: 'Error generating link. Please try again later.',
      });
    }
  };

  const handleClose = () => {
    setNewLink('');
    setError(null);
    onClose();
  };

  const handleCopyLink = () => {
    if (newLink) {
      navigator.clipboard.writeText(newLink)
        .then(() => {
          openModal({
            status: 'success',
            message: 'Link copied to clipboard successfully',
          });
        })
        .catch(err => {
          console.error('Failed to copy link: ', err);
          openModal({
            status: 'error',
            message: 'Failed to copy link to clipboard',
          });
        });
    } else {
      openModal({
        status: 'error',
        message: 'No link to copy',
      });
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <CloseIcon className="w-6 h-6" />
        </button>
        <div className="text-lg font-semibold mb-8">Generate Link Registrasi</div>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        <div className="space-y-6 mt-6">
          <label className="flex mb-[-22px]">
            Link<div className="text-red-600">*</div>
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative w-full">
              <div className="w-full absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#858D9D]">
                <LinkRegis2 className="w-6 h-6 text-[#858D9D]" />
              </div>
              <input
                type="text"
                value={newLink}
                readOnly
                className="w-full pl-12 p-3 text-base border rounded-lg text-[#858D9D] bg-[#EAECF0] border-none"
              />
            </div>
            <button
              onClick={handleGenerateLink}
              className="flex items-center text-[#323232] bg-[#FFC862] hover:bg-[#FFB347] font-semibold rounded-lg text-sm px-5 py-3"
            >
              <Regenerate />
              <span className='ml-2'>Regenerate</span>
            </button>
          </div>
        </div>
        <div className='w-full flex justify-between mt-10'>
          <button
            onClick={handleCopyLink}
            className="flex items-center px-6 py-3 text-sm font-semibold bg-transparent border-2 border-[#FFC862] text-[#323232] rounded-lg hover:bg-[#FFB347]"
          >
            <LinkRegis />
            <span className='ml-2'>Copy Link</span>
          </button>
          <button
            onClick={handleClose}
            className="px-8 py-3 text-sm font-semibold bg-[#FFC862] text-[#323232] border rounded-lg hover:bg-[#FFB347]"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LinkRegisterModal;