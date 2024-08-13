import clsx from 'clsx';
import React from 'react';
import { ContactFormView } from './ContactForm.view';

export const ContactForm = ({ className }: { className?: string }) => {
  return (
    <>
      <ContactFormView className={clsx(className)} />
    </>
  );
};
