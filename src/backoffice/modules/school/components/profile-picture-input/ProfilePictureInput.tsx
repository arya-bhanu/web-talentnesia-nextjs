import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProfilePictureInputProps {
  imageUrl?: string | null;
  onChange?: (imageUrl: string) => void;
  onReset?: (resetFunction: () => void) => void;
}

export function ProfilePictureInput({
  imageUrl = '/img/manage-user/profile-template.svg',
  onChange,
  onReset,
}: ProfilePictureInputProps) {
  const [profileImage, setProfileImage] = useState(imageUrl);

  useEffect(() => {
    if (imageUrl !== profileImage) {
      setProfileImage(imageUrl || '/img/manage-user/profile-template.svg');
    }
  }, [imageUrl]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          const uploadedImageUrl = result.url;
          setProfileImage(uploadedImageUrl);
          if (onChange) {
            onChange(uploadedImageUrl);
          }
        } else {
          console.error('Gagal mengunggah file');
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengunggah file', error);
      }
    }
  };

  const handleDeleteImage = () => {
    const defaultImage = '/img/manage-user/profile-template.svg';
    setProfileImage(defaultImage);
    if (onChange) {
      onChange(defaultImage);
    }
    const fileInput = document.getElementById('profile-picture-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  useEffect(() => {
    if (onReset) {
      onReset(handleDeleteImage);
    }
  }, [onReset]);

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
        <div className="flex text-[12px] md:text-lg font-poppins">
          <Image
            src={profileImage ?? ''}
            width={150}
            height={150}
            alt="Profile Picture"
            className="w-[150px] h-[150px] cursor-pointer rounded-[10px] object-cover"
          />
          <Image
            src="/img/manage-user/edit-profil.svg"
            width={50}
            height={50}
            alt="Edit Profile"
            className="w-[50px] h-[50px] cursor-pointer ml-[-45px] mt-[-5px]"
          />
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
