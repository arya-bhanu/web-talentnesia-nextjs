import React, { useState, useEffect } from 'react';
import { ModalFormProps } from './modalForm.type';
import { ModalFormView } from './ModalForm.view';
import { APIResponseZipCode } from '../../zipCode.type';

const ModalForm: React.FC<ModalFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null,
  id = undefined,
  title, 
}) => {

  const [formData, setFormData] = useState({
    zipCode: '',
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        zipCode: initialData.zipCode || '',
      });
    } else {
      setFormData({
        zipCode: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (zipCode: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [zipCode]: value }));
  };

  const handleSave = async () => {
    if (!formData.zipCode) {
      setHasError(true);
      return;
    }

    try {
      await onSave(id, { name: formData.zipCode } as APIResponseZipCode);
      onClose();
    } catch (error) {
      console.error('Failed to save data');
    }
  };

  return (
    <ModalFormView
      isOpen={isOpen}
      title={title}
      formData={formData}
      hasError={hasError}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      onClose={onClose}
    />
  );
};

export default ModalForm;
