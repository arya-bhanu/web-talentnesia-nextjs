'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoginViewProps } from './login.type';
import './login.style.css';

export const LoginView: React.FC<LoginViewProps> = ({
  showPassword,
  togglePasswordVisibility,
}) => {
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
            Excellence in animation begins at our doorstep. Be part of us, where
            industry mentors shape your future.
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
          Sign in with Google
        </button>
        <div className="flex items-center mb-4">
          <div className="flex-grow border-t border-gray-300 border-dashed" />
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300 border-dashed" />
        </div>
        <form className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-[#219EBC] focus:border-[#219EBC] sm:text-sm text-gray-600"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
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
                alt={showPassword ? 'Hide password' : 'Show password'}
                width={20}
                height={20}
              />
            </button>
          </div>
          <div className="flex items-center justify-end">
            <Link href={'#'} className="text-sm text-[#219EBC] hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#219EBC] text-white rounded-full shadow-lg text-sm"
          >
            LOGIN
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account yet?{' '}
          <Link href={'#'} className="text-sm text-[#219EBC] hover:underline">
            Let's register
          </Link>
        </p>
      </div>
      <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-[#219EBC] relative">
        <div className="pl-8">
          <h2 className="text-xl lg:text-2xl font-medium mb-4 mt-20 text-white tracking-wide ml-5 lg:20">
            Exciting courses and programs <br />
            await you, join Talentnesia now.
          </h2>
          <div className="absolute bottom-0 right-0">
            <Image
              src="/images/picture-woman.png"
              alt="picture-woman"
              width={490}
              height={575}
              className="md:w-[424px] md:h-[498px] xl:w-[490px] xl:h-[575px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
