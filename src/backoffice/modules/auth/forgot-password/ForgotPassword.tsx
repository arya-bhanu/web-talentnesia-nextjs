'use client';

import React from 'react';
import { ForgotPasswordView } from './ForgotPassword.view';

export const ForgotPassword: React.FC = () => {
  const handleSubmit = (email: string) => {
    console.log('Email:', email);
  };

  return <ForgotPasswordView handleSubmit={handleSubmit} />;
};
