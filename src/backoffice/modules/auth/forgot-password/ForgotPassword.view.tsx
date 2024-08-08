'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ForgotPasswordViewProps } from './forgotPassword.type';
import './forgotPassword.style.css';

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
  handleSubmit,
}) => {
  const [email, setEmail] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(email);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-poppins">
      <div className="flex flex-col justify-center w-full md:w-1/2 lg:w-[45%] p-8 md:p-12 lg:p-20 xl:p-28 bg-white">
        <div className="mb-8">
          <Link href="/">
            <Image
              src="/icons/logo-company-text.svg"
              alt="logo-talentnesia"
              width={300}
              height={300}
              className="w-32 md:w-48 h-auto mb-4 mx-auto md:mx-0 cursor-pointer"
            />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 mt-10 tracking-wide">
            Lupa Sandi
          </h1>
          <p className="text-sm text-gray-500 tracking-wide">
            Masukkan alamat email yang Anda gunakan saat bergabung dan kami akan
            mengirimkan instruksi untuk mengatur ulang kata sandi Anda. Demi
            alasan keamanan, kami TIDAK menyimpan kata sandi Anda. Jadi,
            yakinlah bahwa kami tidak akan pernah mengirimkan kata sandi Anda
            melalui email.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#219EBC] text-white rounded-full shadow-lg text-sm"
          >
            Kirim
          </button>
        </form>
        <p className="mt-10 text-sm text-gray-500">
          Kembali ke halaman{' '}
          <Link href="login" className="text-[#219EBC] hover:underline">
            Login
          </Link>
        </p>
      </div>
      <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-[#219EBC] relative">
        <div className="pl-8">
          <h2 className="text-xl lg:text-2xl font-medium mb-4 mt-20 text-white tracking-wide">
            Forgot your account password?
          </h2>
          <div className="absolute bottom-0 right-0">
            <Image
              src="/images/picture-woman-thinking.png"
              alt="picture-woman"
              width={490}
              height={575}
              className="md:w-[421px] md:h-[565px] lg:w-[486px] lg:h-[652px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
