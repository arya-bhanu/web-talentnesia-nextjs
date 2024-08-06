'use client';
import React from 'react';
import FormExampleView from './FormExample.view';

const FormExample: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return <FormExampleView onSubmit={handleSubmit} />;
};

export default FormExample;
