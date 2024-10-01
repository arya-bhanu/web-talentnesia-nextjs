import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DropFile } from './components/drop-files-input/dropFilesInput';
import { UserData } from './setting.type';

interface SettingViewProps {
  userData: UserData | undefined;
  fullImageUrl: string | undefined;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileChange: (fileUrl: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const SettingView: React.FC<SettingViewProps> = ({
  userData,
  fullImageUrl,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-row space-x-8 p-6">
      <div className="w-1/3">
        <DropFile
          onChange={handleFileChange}
          initialImage={fullImageUrl || ''}
        />
      </div>
      <div className="w-2/3 space-y-4">
        {/* First Name input */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData?.firstName || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* Last Name input */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData?.lastName || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* Phone Number input */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData?.phoneNumber || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* Email input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData?.email || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* LinkedIn input */}
        <div>
          <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            type="url"
            id="linkedIn"
            name="linkedIn"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData?.linkedIn || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* Bio input */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData?.bio || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* Gender select */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData?.gender || ''}
            onChange={handleInputChange}
          >
            <option value="" hidden>
              Select gender
            </option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </div>

        {/* Password input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="block w-full pr-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                <Image
                  src={showPassword ? '/icons/icon-eyeslash.svg' : '/icons/icon-eye.svg'}
                  width={20}
                  height={20}
                  alt="Toggle password visibility"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Confirm Password input */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className="block w-full pr-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="focus:outline-none"
              >
                <Image
                  src={showConfirmPassword ? '/icons/icon-eyeslash.svg' : '/icons/icon-eye.svg'}
                  width={20}
                  height={20}
                  alt="Toggle password visibility"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Submit and Cancel buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <Link href="/backoffice/dashboard">
            <button
              type="button"
              className="cancel-button bg-white hover:bg-[#F04438] border-[#F04438] border-2 text-[#F04438] hover:text-white py-2 px-4 rounded-lg font-poppins"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="submit-button bg-[#FFC862] hover:bg-[#fbbf24] text-black py-2 px-4 rounded-lg font-poppins"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
