'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';       
import { RegisterView } from './Register.view';
import { loginApi } from './api/registerApi';
import { useRouter } from 'next/navigation';

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const response = await loginApi(email, password, `${firstName} ${lastName}`, firstName, lastName, token);
      if (response) {
        console.log('Registration successful:', response);
        router.push('/auth/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <RegisterView
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      onSubmit={handleSubmit}
      error={error}
      token={token}
    />
  );
};
