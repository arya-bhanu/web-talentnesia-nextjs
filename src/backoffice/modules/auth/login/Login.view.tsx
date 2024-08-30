'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoginViewProps } from './login.type';
import './login.style.css';
import useLogin from './hooks/useLogin';
import { login } from '@/lib/action';
import { Toast } from 'flowbite-react';
import { HiX } from 'react-icons/hi';

export const LoginView: React.FC<Partial<LoginViewProps>> = () => {
  const { showPassword, togglePasswordVisibility } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password
    };
    const result = await login(data);
    if (result.error) {
      setError(result.error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } else if (result.redirectTo) {
      window.location.href = result.redirectTo;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-poppins">
      <div className="flex flex-col justify-center w-full md:w-1/2 lg:w-[45%] p-8 md:p-12 lg:p-20 xl:p-28 bg-white">
        <div className="mb-8">
          <Link href="/" passHref>
            <Image
              src="/icons/logo-company-text.svg"
              alt="logo-talentnesia"
              width={300}
              height={300}
              className="w-32 md:w-48 h-auto mb-4 mx-auto md:mx-0"
            />
          </Link>
          <p className="text-sm text-gray-500 text-center md:text-left">
            Keunggulan dalam animasi dimulai dari tempat kami. Jadilah bagian
            dari kami, di mana mentor industri membentuk masa depan Anda.
          </p>
        </div>
        <button className="flex items-center justify-center w-full py-2 mb-4 border border-gray-300 rounded-full text-[#000000]">
          <Image
            src="/icons/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          Masuk dengan Google
        </button>
        <div className="flex items-center mb-4">
          <div className="flex-grow border-t border-gray-300 border-dashed" />
          <span className="mx-4 text-gray-500">atau</span>
          <div className="flex-grow border-t border-gray-300 border-dashed" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-[#219EBC] focus:border-[#219EBC] sm:text-sm text-gray-600"
            />
          </div>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Kata Sandi"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-[#219EBC] focus:border-[#219EBC] sm:text-sm text-gray-600"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3"
            >
              <Image
                src={
                  showPassword
                    ? '/icons/icon-eyeslash.svg'
                    : '/icons/icon-eye.svg'
                }
                alt={
                  showPassword
                    ? 'Sembunyikan kata sandi'
                    : 'Tampilkan kata sandi'
                }
                width={20}
                height={20}
              />
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#219EBC] text-white rounded-full shadow-lg text-sm"
          >
            MASUK
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Belum punya akun?{' '}
          <Link
            href={'/auth/register'}
            className="text-sm text-[#219EBC] hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
      <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-[#219EBC] relative">
        <div className="pl-8">
          <h2 className="text-xl lg:text-2xl font-medium mb-4 mt-20 text-white tracking-wide ml-5 lg:20">
            Kursus dan program menarik <br />
            menunggu Anda, bergabunglah dengan Talentnesia sekarang.
          </h2>
          <div className="absolute bottom-0 right-0">
            <Image
              src="/images/picture-woman.png"
              alt="gambar-wanita"
              width={490}
              height={575}
              className="md:w-[424px] md:h-[498px] xl:w-[490px] xl:h-[575px]"
            />
          </div>
        </div>
      </div>
      {showError && (
        <Toast className="fixed bottom-5 right-5">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{error}</div>
          <Toast.Toggle onDismiss={() => setShowError(false)} />
        </Toast>
      )}
    </div>
  );
};
