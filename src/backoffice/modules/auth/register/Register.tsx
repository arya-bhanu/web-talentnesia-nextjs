'use client';

import React, { useState } from 'react';
import { RegisterView } from './Register.view';

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <RegisterView
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
    />
  );
};
