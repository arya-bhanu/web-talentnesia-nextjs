'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getUserProfile, updateUserProfile } from './api/settingApi';
import { getImageUrl } from '../school/api/minioApi';
import { DropFile } from './components/drop-files-input/dropFilesInput';
import Link from 'next/link';
import { Modal } from 'flowbite-react';
import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { DecodedToken, decodeToken } from '@/lib/tokenDecoder';

export interface UserData extends DecodedToken {
  firstName?: string;
  lastName?: string;
  linkedIn?: string;
  phoneNumber?: string;
  bio?: string;
  gender?: string;
  password?: string;
  hashedPassword?: string;
}

export const Setting = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    userId: '',
    name: '',
    email: '',
    role: 0,
    profilePicture: '',
    isLoggedIn: '',
    token: '',
    password: '',
    hashedPassword: '',
    educationInstitutionId: '',
  });
  const [fullImageUrl, setFullImageUrl] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const decodedToken = decodeToken();
      console.log(decodedToken);
      if (decodedToken) {
        setUserData(decodedToken as UserData);
        try {
          const data = await getUserProfile(
            decodedToken.userId || '',
          );
          if (data.profilePicture) {
            try {
              const imageUrl = await getImageUrl(data.profilePicture);
              setFullImageUrl(imageUrl);
            } catch (imageError) {
              console.error('Error fetching image');
              setFullImageUrl('');
            }
          } else {
            setFullImageUrl('');
          }
          setUserData((prevData) => ({
            ...prevData,
            ...data,
            hashedPassword: data.password,
          }));
        } catch (error) {
          console.error('Error fetching user data');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (fileUrl: string) => {
    const fullUrl = await getImageUrl(fileUrl);
    setUserData((prevData) => ({ ...prevData, profilePicture: fileUrl }));
    setFullImageUrl(fullUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setModalMessage('Passwords do not match');
        setIsError(true);
        setShowModal(true);
        return;
      }
      const updatedData = { ...userData };
      if (password) {
        updatedData.password = password;
      }
      await updateUserProfile(userData.userId, updatedData);

      setModalMessage('Profile updated successfully!');
      setIsError(false);
      setShowModal(true);
    } catch (error) {
      console.error('Error updating profile', error);
      setModalMessage('Failed to update profile');
      setIsError(true);
      setShowModal(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row space-x-8 p-6">
      <div className="w-1/3">
        <DropFile
          onChange={handleFileChange}
          initialImage={fullImageUrl || ''}
        />
      </div>
      <div className="w-2/3 space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData.firstName || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData.lastName || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData.phoneNumber || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData.email || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="linkedIn"
            className="block text-sm font-medium text-gray-700"
          >
            LinkedIn
          </label>
          <input
            type="url"
            id="linkedIn"
            name="linkedIn"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData.linkedIn || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData.bio || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData.gender || ''}
            onChange={handleInputChange}
          >
            <option value="" hidden>
              Select gender
            </option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
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
                  src={
                    showPassword
                      ? '/icons/icon-eyeslash.svg'
                      : '/icons/icon-eye.svg'
                  }
                  width={20}
                  height={20}
                  alt="Toggle password visibility"
                />
              </button>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
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
                  src={
                    showConfirmPassword
                      ? '/icons/icon-eyeslash.svg'
                      : '/icons/icon-eye.svg'
                  }
                  width={20}
                  height={20}
                  alt="Toggle password visibility"
                />
              </button>
            </div>
          </div>
        </div>

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
