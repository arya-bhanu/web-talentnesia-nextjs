import React, { useState, useEffect } from 'react';
import { ModalFormProps } from './modalForm.type';
import { ModalFormView } from './ModalForm.view';
import AlertAddModal from 'src/backoffice/components/alert-add-modal/AlertAddModal';

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  id = undefined,
  title,
}) => {
  const [formData, setFormData] = useState({ name: '' });
  const [hasError, setHasError] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(isOpen);

  useEffect(() => {
    setShowFormModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
      });
    } else {
      setFormData({
        name: '',
      });
    }
  }, [initialData]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name) {
      setHasError(true);
      return;
    }
    setShowAlertModal(true);
    setShowFormModal(false);
  };

  const handleAlertConfirm = async (confirmed: boolean) => {
    if (confirmed) {
      try {
        await onSave(id, { name: formData.name });
        setFormData({ name: '' });
        onClose();
      } catch (error) {
        console.error('Failed to save data', error);
      }
    } else {
      setShowFormModal(true);
    }
    setShowAlertModal(false);
  };
  return (
    <>
      <ModalFormView
        isOpen={showFormModal}
        title={title}
        formData={formData}
        hasError={hasError}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        onClose={onClose}
      />
      <AlertAddModal
        openModal={showAlertModal}
        setOpenModal={setShowAlertModal}
        setIsConfirmed={(confirmed: boolean | ((prevState: boolean) => boolean)) => {
          if (typeof confirmed === 'boolean') {
            handleAlertConfirm(confirmed);
          }
        }}
      />
    </>
  );

};
export default ModalForm;