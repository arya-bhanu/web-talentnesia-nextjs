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
    quizType: '',
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        quizType: initialData.quizType || '',
      });
    } else {
      setFormData({
        quizType: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (quizType: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [quizType]: value }));
  };

  const handleSave = async () => {
    if (!formData.quizType) {
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
