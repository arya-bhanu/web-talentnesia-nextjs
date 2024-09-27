'use client';

import React, { useState } from 'react';
import { RegisterView } from './Register.view';
import { loginApi } from './api/registerApi';
import { useRouter } from 'next/navigation';

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (firstName: string, lastName: string, email: string, password: string) => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
  
    try {
      const response = await loginApi(email, password, `${firstName} ${lastName}`, firstName, lastName);
      if (response) {
        console.log('Registration successful:', response);
        router.push('/auth/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setError('Email is already taken. Please use a different email.');
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    }
  };
  

  return (
    <RegisterView
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};
