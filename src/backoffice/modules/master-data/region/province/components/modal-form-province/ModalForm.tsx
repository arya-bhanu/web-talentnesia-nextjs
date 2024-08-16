import React, { useState, useEffect } from 'react';
import { ModalFormProps } from './modalForm.type';
import { ModalFormView } from './ModalForm.view';

const ModalForm: React.FC<ModalFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null,
  id = undefined,
  title, 
}) => {

  const [formData, setFormData] = useState({
    province: '',
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        province: initialData.province || '',
      });
    } else {
      setFormData({
        province: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (province: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [province]: value }));
  };

  const handleSave = async () => {
    if (!formData.province) {
      setHasError(true);
      return;
    }

    try {
      await onSave(id, formData);
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
