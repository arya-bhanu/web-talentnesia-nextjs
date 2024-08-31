import React from 'react';
import { ContactView } from './Contact.view';
import { ContactProps } from './contact.type';

export const Contact: React.FC<ContactProps> = ({ className, isLoading }) => {
  return <ContactView className={className} isLoading={isLoading}/>;
};
