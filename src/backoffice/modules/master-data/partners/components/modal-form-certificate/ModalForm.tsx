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
    address: '',
    logo: '',
    description: ''
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        address: initialData.address || '',
        logo: initialData.logo || '',
        description: initialData.description || '',
      });
    } else {
      setFormData({
        name: '',
        address: '',
        logo: '',
        description: ''
      });
    }
  }, [initialData]);

  const handleInputChange = (partner: string , value: string) => {
    setFormData(prevData => ({ ...prevData, [partner]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.address || !formData.logo || !formData.description) {
      setHasError(true);
      return;
    }

    try {
      await onSave(id, formData);
      onClose();
    } catch (error) {
      console.error('Failed to save data');
      console.log(error)
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
