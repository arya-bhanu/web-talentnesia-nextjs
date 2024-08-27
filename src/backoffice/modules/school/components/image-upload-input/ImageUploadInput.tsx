import React, { useState } from 'react';
import Image from 'next/image';
import { uploadFile } from '../../api/uploadMinio';

interface ImageUploadInputProps {
  onChange: (imageUrl: string) => void;
  initialImage?: string | null;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ onChange, initialImage }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };

      reader.readAsDataURL(file);

      setIsUploading(true);
      try {
        const response = await uploadFile(file, 'institutions');
        const imageUrl = response.path.thumbs;  
        onChange(imageUrl);
      } catch (error) {
        console.error('Failed to upload image:', error); 
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDeleteImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setImageSrc(null);
    onChange('');
    const fileInput = document.getElementById('image-upload-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('image-upload-input')?.click();
  };

  return (
    <div className="relative w-[150px] h-[150px] border border-gray-200 rounded-lg bg-gray-100 flex items-center justify-center">
      <input
        type="file"
        id="image-upload-input"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
        disabled={isUploading}
      />
      
      <Image
        src={imageSrc || '/img/manage-user/profile-template.svg'}
        alt="Uploaded Image"
        className="object-cover w-full h-full rounded-lg"
        width={150}
        height={150}
      />

      <button
        type="button"
        className="absolute top-2 right-2 rounded-full p-1 bg-white shadow-md"
        onClick={handleEditClick}
        disabled={isUploading}
      >
        <Image
          src="/icons/icons-edit.svg"
          alt="Edit"
          width={20}
          height={20}
          className="p-1"
        />
      </button>

      <button
        type="button"
        className="absolute bottom-2 right-2 rounded-full p-1 bg-white shadow-md"
        onClick={handleDeleteImage}
        disabled={isUploading}
      >
        <Image
          src="/icons/icons-delete.svg"
          alt="Delete"
          width={20}
          height={20}
          className="p-1"
        />
      </button>

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
          <span>Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;