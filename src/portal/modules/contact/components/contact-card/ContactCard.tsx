import React from 'react';
import { ContactCardView } from './ContactCard.view';
import clsx from 'clsx';

export const ContactCard = ({ className , isLoading}: { className?: string, isLoading?: boolean }) => {
  return (
    <>
      <ContactCardView className={clsx(className)} isLoading={isLoading} />
    </>
  );
};
