"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export function ProfilePictureInput() {
  const [profileImage, setProfileImage] = useState("/img/manage-user/profile-template.svg");
  const defaultImage = "/img/manage-user/profile-template.svg";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(defaultImage);
    // Reset the file input
    const fileInput = document.getElementById('profile-picture-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="relative">
      <input 
        type="file" 
        id="profile-picture-upload" 
        className="hidden" 
        onChange={handleFileChange}
        accept="image/*"
      />
      <label htmlFor="profile-picture-upload" className="cursor-pointer">
        <div className='flex text-[12px] md:text-lg font-poppins'>
          <Image src={profileImage} width={150} height={150} alt="Profile Picture" className="w-[150px] h-[150px] cursor-pointer rounded-[10px] object-cover" />
          <Image src="/img/manage-user/edit-profil.svg" width={50} height={50} alt="Edit Profile" className="w-[50px] h-[50px] cursor-pointer ml-[-45px] mt-[-5px]" />
          <Image 
            src="/img/manage-user/delete-profil.svg" 
            width={50} 
            height={50} 
            alt="Delete Profile" 
            className="w-[50px] h-[50px] cursor-pointer ml-[-50px] mt-[105px]" 
            onClick={(e) => {
              e.preventDefault();
              handleDeleteImage();
            }}
          />
        </div>
      </label>
    </div>
  );
}
