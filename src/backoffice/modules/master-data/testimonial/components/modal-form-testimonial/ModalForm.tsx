import React, { useState, useEffect } from 'react';
import { ModalFormProps } from './modalForm.type';
import { ModalFormView } from './ModalForm.view';
import { TestimonialRequest } from '../../testimonial.type';

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  id, 
  title,
}) => {
  const isEditMode = !!id; 
  const [formData, setFormData] = useState<TestimonialRequest>({
    code: '',
    name: '',
    description: '',
    active: 0,
    userId: '', 
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        name: initialData.name || '',
        description: initialData.description || '',
        active: initialData.active || 0,
        userId: initialData.user?.id || '', 
      });
    } else {
      setFormData({
        code: '',
        name: '',
        description: '',
        active: 0,
        userId: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateFields = () => {
    const requiredFields: (keyof TestimonialRequest)[] = isEditMode
      ? ['name', 'active']
      : ['code', 'name', 'active', 'userId'];
    
    return requiredFields.every((field) => formData[field] !== '' && formData[field] !== undefined);
  };

  const handleSave = async () => {
    if (!validateFields()) {
      return;
    }
  
    try {
      console.log('Submitting data:', formData);
      await onSave(id, formData); 
      setFormData({ code: '', name: '', description: '', active: 0, userId: '' });
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
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      onClose={onClose}
      isEditMode={isEditMode}
    />
  );
};

export default ModalForm;
