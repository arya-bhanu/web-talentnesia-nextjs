import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fileHelper } from '@/helpers/file-manager/fileUpload.helper';

interface ProfilePictureInputProps {
  onChange: (file: File | null, originalFilename: string | null) => void;
  onReset?: (resetFunction: () => void) => void;
  initialValue?: string;
  id: string | null;
  idCheck: string | null;
}

export function ProfilePictureInput({ onChange, onReset, initialValue, id, idCheck }: ProfilePictureInputProps) {
  const defaultImage = '/img/manage-user/profile-template.svg';
  const [profileImage, setProfileImage] = useState(defaultImage);

  useEffect(() => {
    if (initialValue && initialValue !== '') {
      loadProfilePicture(initialValue);
    } else if (profileImage !== defaultImage) {
      // Keep the uploaded image if it's not the default one
    } else {
      setProfileImage(defaultImage);
    }
  }, [initialValue, profileImage]);

  useEffect(() => {
    if (onReset) {
      onReset(() => {
        setProfileImage(defaultImage);
        onChange(null, null);
      });
    }
  }, [onReset, onChange]);

  const loadProfilePicture = async (path: string) => {
    try {
      const imageUrl = `${process.env.API_SERVER_URL}/v1/file/${path}`;
      const response = await fetch(imageUrl);
      if (response.ok) {
        setProfileImage(imageUrl);
      } else {
        throw new Error('Failed to load image');
      }
    } catch (error) {
      console.error('Error loading profile picture:', error);
      setProfileImage(defaultImage);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        const uploadedPath = await fileHelper.uploadFile(file, 'users');
        if (uploadedPath) {
          const imageUrl = `${process.env.API_SERVER_URL}/v1/file/${uploadedPath}`;
          setProfileImage(imageUrl);
          onChange(file, file.name);
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(defaultImage);
    const fileInput = document.getElementById('profile-picture-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    onChange(null, null);
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
        <div className="flex text-[12px] md:text-lg font-poppins">
        <Image
            src={profileImage}
            width={150}
            height={150}
            alt="Profile Picture"
            className="w-[150px] h-[150px] cursor-pointer rounded-[10px] object-cover"
            onError={() => setProfileImage(defaultImage)}
          />
          <Image
            src="/img/manage-user/edit-profil.svg"
            width={50}
            height={50}
            alt="Edit Profile"
            className="w-[50px] h-[50px] cursor-pointer ml-[-45px] mt-[-5px]"
          />
          {(id === idCheck || (!id && !idCheck)) && (
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
          )}
        </div>
      </label>
    </div>
  );
}
