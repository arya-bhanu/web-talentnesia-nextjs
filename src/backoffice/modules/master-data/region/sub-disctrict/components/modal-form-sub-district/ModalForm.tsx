import React, { useState, useEffect } from 'react';
import { ModalFormProps } from './modalForm.type';
import { ModalFormView } from './ModalForm.view';
import { APIResponseSubDistrict } from '../../subDistrict.type';

const ModalForm: React.FC<ModalFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null,
  id = undefined,
  title, 
}) => {

  const [formData, setFormData] = useState({
    subDistrict: '',
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        subDistrict: initialData.subDistrict || '',
      });
    } else {
      setFormData({
        subDistrict: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (subDistrict: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [subDistrict]: value }));
  };

  const handleSave = async () => {
    if (!formData.subDistrict) {
      setHasError(true);
      return;
    }

    try {
      await onSave(id, { name: formData.subDistrict } as APIResponseSubDistrict);
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
