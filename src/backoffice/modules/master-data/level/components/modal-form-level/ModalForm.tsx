import React, { useState, useEffect } from 'react';
import { ModalFormProps } from './modalForm.type';
import { ModalFormView } from './ModalForm.view';
import { levelAPI } from '../../api/levelApi';

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
    code: '',
    status: 1,
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          level: initialData.name || '',
          code: initialData.code || '',
          status: initialData.active === 1 ? 1 : 0,
        });
      } else {
        setFormData({
          level: '',
          code: '',
          status: 1,
        });
      }
    } 
    // Reset form data when the modal is closed
    else {
      setFormData({
        level: '',
        code: '',
        status: 1,
      });
      setHasError(false);
    }
  }, [isOpen, initialData]);

  const handleInputChange = (field: string, value: string) => {
    const newValue = field === 'status' ? (value === 'Active' ? 1 : 0) : value;
    setFormData(prevData => ({ ...prevData, [field]: newValue }));
  };

  const handleSave = async () => {
    if (!formData.level || !formData.code || formData.status === undefined) {
      setHasError(true);
      return;
    }

    try {
      const data = {
        name: formData.level,
        code: formData.code,
        active: formData.status,
      };

      if (id) {
        //update
      } else {
        await levelAPI.add(data);
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
    setFormData({
      level: '',
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
        status: formData.status === 1 ? 'Active' : 'Inactive', 
      }}
      hasError={hasError}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      onClose={handleClose}
    />
  );
};

export default ModalForm;
