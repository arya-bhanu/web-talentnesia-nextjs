'use client';
import React, { useState } from 'react';
import AddCertificateView from './AddCertificate.view';
import { useRouter } from 'next/navigation';
import { certificateAPI } from '../api/certificateApi';

const AddCertificate: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    file: '',
    active: 1,
  });

  const [hasError, setHasError] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setFormData({ name: '', file: '', active: 1 });
    setHasError(false);
    setIsOpen(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    if (field === 'active') {
      const activeValue = value === 'Active' ? 1 : 0;
      setFormData(prev => ({ ...prev, [field]: activeValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };
  
  const handleSave = async () => {
    if (!formData.name || !formData.file || formData.active === undefined) {
      setHasError(true);
      console.log('Missing required fields:', formData);
      return;
    }

    try {
      await certificateAPI.add(formData);
      
     
      router.push('/backoffice/master-data/certificate/');
    } catch (error) {
      console.error('Error saving certificate:', error);
      
    }
  };

  return (
    <AddCertificateView
      isOpen={isOpen}
      title="Add Certificate"
      formData={{
        ...formData,
        active: formData.active === 1 ? 1 : 0,
      }}
      hasError={hasError}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      onClose={handleClose}
    />
  );
};

export default AddCertificate;
