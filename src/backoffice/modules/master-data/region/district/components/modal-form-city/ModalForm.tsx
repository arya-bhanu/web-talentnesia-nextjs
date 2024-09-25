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
    city: '',
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        city: initialData.city || '',
      });
    } else {
      setFormData({
        city: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (city: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [city]: value }));
  };

  const handleSave = async () => {
    if (!formData.city) {
      setHasError(true);
      return;
    }

    try {
      await onSave(id, { name: formData.city });
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
