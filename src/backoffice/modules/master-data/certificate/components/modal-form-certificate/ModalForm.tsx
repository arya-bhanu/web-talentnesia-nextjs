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
    name: '',
    file: ''
  });
  
  
  const [hasError, setHasError] = useState(false);
  
  const handleClose = () => {
    setFormData({ name: '', file: '' });
    setHasError(false);
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        file: initialData.file || '',
      });
    } else {
      setFormData({
        name: '',
        file: '',
      });
    }

  }, [initialData]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', file: '' });
      setHasError(false);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.file) {
      setHasError(true);
      console.log('Missing required fields:', formData); 
      return;
    }
  
    try {
      console.log('Saving data with formData:', formData);
      await onSave(id, formData);
      onClose();
    } catch (error) {
      console.error('Failed to save data', error);
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
      onClose={handleClose}
    />
  );
};

export default ModalForm;

