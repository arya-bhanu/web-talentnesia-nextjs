import React, { useState, useEffect } from 'react';
import { ModalFormProps } from './modalForm.type';
import { ModalFormView } from './ModalForm.view';
import { discountAPI } from '../../api/discountApi'; 

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  id = undefined,
  title,
}) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    persentage: 0,
    startDate: '',
    endDate: '',
    active: 0,
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          code: initialData.code || '',
          name: initialData.name || '',
          persentage: Number(initialData.persentage) || 0,
          startDate: initialData.startDate || '',
          endDate: initialData.endDate || '',
          active: initialData.active === 1 ? 1 : 0,
        });
      } else {
        setFormData({
          code: '',
          name: '',
          persentage: 0,
          startDate: '',
          endDate: '',
          active: 0,
        });
      }
    } else {
      
      setFormData({
        code: '',
        name: '',
        persentage: 0,
        startDate: '',
        endDate: '',
        active: 0,
      });
      setHasError(false);
    }
  }, [isOpen, initialData]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    let newValue = value;
    if (field === 'persentage' && (typeof value === 'number' || !isNaN(Number(value)))) {
      newValue = Math.min(Math.max(Number(value), 0), 100);
    } else if (field === 'active') {
      newValue = value === 'Active' ? 1 : 0;
    }
    setFormData((prevData) => ({ ...prevData, [field]: newValue }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.code || formData.persentage === undefined || !formData.startDate || !formData.endDate || formData.active === undefined) {
      setHasError(true);
      return;
    }

    try {
      const data = {
        code: formData.code,
        name: formData.name,
        persentage: Number(formData.persentage),
        startDate: formData.startDate,
        endDate: formData.endDate,
        active: Number(formData.active),
      };

      if (id) {
        await discountAPI.update(id, data); 
      } else {
        await discountAPI.add(data); 
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
      code: '',
      name: '',
      persentage: 0,
      startDate: '',
      endDate: '',
      active: 1,
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
        active: formData.active === 1 ? 1 : 0,
      }}
      hasError={hasError}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      onClose={handleClose}
    />
  );
};
export default ModalForm;
