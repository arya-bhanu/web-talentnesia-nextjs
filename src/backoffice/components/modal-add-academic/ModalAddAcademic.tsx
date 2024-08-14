import React, { useState } from 'react';
import { ModalAddAcademicLevelView } from './ModalAddAcademic.view';
import { ModalAddAcademicProps } from './modalAddAcademic.type';

const ModalAddAcademicLevel: React.FC<ModalAddAcademicProps> = ({ isOpen, onClose, onSave }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSave = () => {
    if (!code || !name) {
      setHasError(true);
      return;
    }
    onSave(code, name);
    setCode('');
    setName('');
    setHasError(false);
    onClose();
  };

  const handleCancel = () => {
    setCode('');
    setName('');
    setHasError(false);
    onClose();
  };

  return (
    <ModalAddAcademicLevelView
      isOpen={isOpen}
      onClose={handleCancel}
      onSave={handleSave}
      code={code}
      setCode={setCode}
      name={name}
      setName={setName}
      hasError={hasError}
    />
  );
};

export default ModalAddAcademicLevel;
