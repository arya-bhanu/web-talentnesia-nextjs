import React from 'react';
import { ContactCardView } from './ContactCard.view';
import clsx from 'clsx';

export const ContactCard = ({ className }: { className?: string }) => {
  return (
    <>
      <ContactCardView className={clsx(className)} />
    </>
  );
};
