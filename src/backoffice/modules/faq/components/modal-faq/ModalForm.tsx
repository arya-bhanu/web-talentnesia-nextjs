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
    question: '',
    answer: '',
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        question: initialData.question || '',
        answer: initialData.answer || '',
      });
    } else {
      setFormData({
        question: '',
        answer: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.question || !formData.answer) {
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
