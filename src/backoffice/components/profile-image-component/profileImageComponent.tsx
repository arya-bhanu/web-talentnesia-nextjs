'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import EditIcon from '@/../public/icons/student/edit.svg';

const ProfileImageInput: React.FC = () => {
  const [profileImage, setProfileImage] = useState('/images/profile.png');
  const defaultImage = '/images/profile.png';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(defaultImage);
    const fileInput = document.getElementById('profile-picture-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="flex items-center mb-6">
      <div className="relative w-[164px] h-[164px]">
        <input
          type="file"
          id="profile-picture-upload"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        <label htmlFor="profile-picture-upload" className="cursor-pointer block w-full h-full rounded-full overflow-hidden">
          <Image
            src={profileImage}
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
          <div className="absolute bottom-2 right-2 bg-[#219EBC] rounded-full p-2">
            <EditIcon width={24} height={24} />
          </div>
        </label>
      </div>
      <div className="ml-10 flex flex-col justify-center">
        <p className="font-semibold">Select your picture</p>
        <p className="text-sm text-gray-500">Accepted Image Files: JPEG, JPG, PNG</p>
        <p className="text-sm text-gray-500">Accepted Size: 300 x 300 (1 MB)</p>
      </div>
    </div>
  );
};

export default ProfileImageInput;
