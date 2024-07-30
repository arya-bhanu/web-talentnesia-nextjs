'use client';

import React, { useState } from 'react';
import { LoginView } from './Login.view';
import { LoginViewProps } from './login.type';

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
