import { useState } from 'react';

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return { showPassword, togglePasswordVisibility };
};

export default useLogin;
