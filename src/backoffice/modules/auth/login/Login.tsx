'use client'

import React from 'react';
import { LoginView } from './Login.view';
import { useState } from 'react';

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginView 
      showPassword={showPassword} 
      togglePasswordVisibility={togglePasswordVisibility}
    />
  );
};
