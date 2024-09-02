import React, { useState, useEffect } from 'react';
import { ModalFormProps } from './modalForm.type';
import { ModalFormView } from './ModalForm.view';
import { categoryAPI } from '../../api/categoryApi';

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  id = undefined,
  title,
}) => {
  const [formData, setFormData] = useState({
    category: '',
    code: '',
    status: 1,
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.name || '',
        code: initialData.code || '',
        status: initialData.active === 1 ? 1 : 0,
      });
    } else {
      setFormData({
        category: '',
        code: '',
        status: 1,
      });
    }
  }, [initialData]);

  const handleInputChange = (field: string, value: string) => {
    const newValue = field === 'status' ? (value === 'Active' ? 1 : 0) : value;
    setFormData(prevData => ({ ...prevData, [field]: newValue }));
  };

  const handleSave = async () => {
    if (!formData.category || !formData.code || formData.status === undefined) {
      setHasError(true);
      return;
    }

    try {
      const data = {
        name: formData.category,
        code: formData.code,
        active: formData.status,
      };

      if (id) {
        
      } else {
        await categoryAPI.add(data);
      }

      handleClose(); 
      if (onSave) {
        await onSave(id, data);
      }
    } catch (error) {
      console.error('Failed to save data', error);
      alert('An error occurred while saving the data. Please try again.');
    }
  };

  const handleClose = () => {
    console.log('Handle close called');
    setFormData({
      category: '',
      code: '',
      status: 1,
    });
    setHasError(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <ModalFormView
      isOpen={isOpen}
      title={title}
      formData={{
        ...formData,
        status: formData.status === 1 ? 'Active' : 'Non Active',
      }}
      hasError={hasError}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      onClose={handleClose} 
    />
  );
};

export default ModalForm;
