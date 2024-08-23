'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LabelForm from '@/backoffice/components/label-form';
import ProfileImageInput from '@/backoffice/components/profile-image-component/profileImageComponent';
import { ProfileData } from './profile.type';
import './profile.style.css';

const ProfileView: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    linkedin: '',
    phone: '',
    bio: '',
    gender: ''
  });
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Function to handle saving the profile
  };

  const handleCancel = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <div className={`p-6 mx-auto bg-white rounded-md transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
      <ProfileImageInput />
      
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <LabelForm isImportant htmlFor="firstName">First Name</LabelForm>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
            value={profile.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex-1">
          <LabelForm isImportant htmlFor="lastName">Last Name</LabelForm>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
            value={profile.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <LabelForm isImportant htmlFor="email">Email</LabelForm>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
          value={profile.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-4">
        <LabelForm isImportant htmlFor="linkedin">LinkedIn</LabelForm>
        <input
          type="text"
          id="linkedin"
          name="linkedin"
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
          value={profile.linkedin}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-4">
        <LabelForm isImportant htmlFor="phone">Phone Number</LabelForm>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
          value={profile.phone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-4">
        <LabelForm isImportant htmlFor="bio">Bio</LabelForm>
        <textarea
          id="bio"
          name="bio"
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
          value={profile.bio}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-4">
        <LabelForm isImportant htmlFor="gender">Gender</LabelForm>
        <div className="mt-1 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={profile.gender === 'male'}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={profile.gender === 'female'}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <button
          onClick={handleCancel}
          className="flex items-center focus:outline-none text-[#323232] border-[#FFC862] hover:bg-[#FFC862] border-2 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
        >
          <span className="text-black-xl font-semibold w-[100px] h-[25px] text-center ">Cancel</span>
        </button>
        <button
          onClick={handleSave}
          className="flex items-center focus:outline-none text-[#323232] bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-transparent font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
        >
          <span className="text-black-xl font-semibold w-[100px] h-[25px] text-center ">Save</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
