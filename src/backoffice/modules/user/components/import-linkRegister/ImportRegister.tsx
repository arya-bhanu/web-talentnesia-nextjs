import React, { useState } from 'react';
import { useStatusModalStore } from '@/lib/store';
import LinkRegisterModalView from './ImportRegister.view';

interface LinkRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinkRegisterModal: React.FC<LinkRegisterModalProps> = ({ isOpen, onClose }) => {
  const [newLink, setNewLink] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const { openModal } = useStatusModalStore();

  const handleGenerateLink = (generatedLink: string) => {
    setNewLink(generatedLink);
  };

  const handleClose = () => {
    // Reset state when modal closes
    setNewLink('');
    setSelectedSchoolId('');
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
    <LinkRegisterModalView
      isOpen={isOpen}
      onClose={handleClose}
      generatedLink={newLink} 
      setGeneratedLink={setNewLink} 
      onCopyLink={handleCopyLink}
      selectedSchoolId={selectedSchoolId} // Pass the selected school ID
      setSelectedSchoolId={setSelectedSchoolId} // Pass the setter for school ID
    />
  );
};
