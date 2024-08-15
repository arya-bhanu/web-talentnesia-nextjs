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
  fields 
}) => {
  const initialFormState = fields.reduce((acc, field) => {
    acc[field.name] = initialData?.[field.name] || '';
    return acc;
  }, {} as { [key: string]: string });

  const [formData, setFormData] = useState(initialFormState);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setFormData(fields.reduce((acc, field) => {
      acc[field.name] = initialData?.[field.name] || '';
      return acc;
    }, {} as { [key: string]: string }));
  }, [initialData, fields]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    const emptyField = fields.find(field => !formData[field.name]);
    if (emptyField) {
      setHasError(true);
      return;
    }
    
    try {
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
      fields={fields}
      formData={formData}
      hasError={hasError}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      onClose={onClose}
    />
  );
};

export default ModalForm;
