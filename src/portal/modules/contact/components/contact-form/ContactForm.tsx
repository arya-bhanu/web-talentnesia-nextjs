'use client';

import React, { useState } from 'react';
import { ContactFormView } from './ContactForm.view';
import { issues } from './contactForm.data';

export const ContactForm = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  const [selectedIssue, setSelectedIssue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIssue(event.target.value);
  };

  return (
    <ContactFormView
      className={className}
      selectedIssue={selectedIssue}
      onIssueChange={handleChange}
      issues={issues}
      isLoading={isLoading}
    />
  );
};
