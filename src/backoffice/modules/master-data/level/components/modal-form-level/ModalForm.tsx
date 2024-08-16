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
    level: '',
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        level: initialData.level || '',
      });
    } else {
      setFormData({
        level: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (level: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [level]: value }));
  };

  const handleSave = async () => {
    if (!formData.level) {
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
