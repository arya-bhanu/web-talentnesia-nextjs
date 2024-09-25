import React, { useState, useEffect } from 'react';
import { ModalFormProps } from './modalForm.type';
import { ModalFormView } from './ModalForm.view';
import { APIResponseRole } from '../../role.type';

const ModalForm: React.FC<ModalFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null,
  id = undefined,
  title, 
}) => {

  const [formData, setFormData] = useState({
    role: '',
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        role: initialData.role || '',
      });
    } else {
      setFormData({
        role: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (role: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [role]: value }));
  };

  const handleSave = async () => {
    if (!formData.role) {
      setHasError(true);
      return;
    }

    try {
      const roleData: APIResponseRole = {
        id: id || '',
        code: '',
        name: formData.role,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await onSave(id, roleData);
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
