'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getUserProfile, updateUserProfile } from './api/settingApi';
import { getImageUrl } from '../school/api/minioApi';
import { DropFile } from './components/drop-files-input/dropFilesInput';
import Link from 'next/link';
import { Modal } from 'flowbite-react';
import { HiOutlineCheckCircle } from 'react-icons/hi';

interface UserData {
  id: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  phoneNumber: string;
  bio: string;
  gender: string;
}

export const Setting = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    id: '',
    profilePicture: '',
    firstName: '',
    lastName: '',
    email: '',
    linkedIn: '',
    phoneNumber: '',
    bio: '',
    gender: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile('fngdme2va5ndvivq');
        if (data.profilePicture) {
          const imageUrl = await getImageUrl(data.profilePicture);
          setUserData({ ...data, profilePicture: imageUrl });
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:');
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
    setUserData((prevData) => ({ ...prevData, profilePicture: fileUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setModalMessage('Passwords do not match');
        setShowModal(true);
        return;
      }
      const updatedData = { ...userData, password };
      await updateUserProfile(userData.id, updatedData);
      setModalMessage('Profile updated successfully!');
      setShowModal(true);
    } catch (error) {
      console.error('Error updating profile:');
      setModalMessage('Failed to update profile');
      setShowModal(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row space-x-8 p-6">
      <div className="w-1/3">
        <DropFile
          onChange={handleFileChange}
          initialImage={userData.profilePicture}
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
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
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
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>
            <div className="flex items-center">
              <HiOutlineCheckCircle className="mr-2 h-5 w-5 text-green-500" />
              <span>Success</span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {modalMessage}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </form>
  );
};
