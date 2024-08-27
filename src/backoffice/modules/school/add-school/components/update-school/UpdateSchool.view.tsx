'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SchoolAPI } from '../../../api/schoolApi';
import ImageUploadInput from '../../../components/image-upload-input/ImageUploadInput';
import Link from 'next/link';
import { APIResponseSchool } from '../../../school.type';
import { getImageUrl } from '../../../api/minioApi';

interface UpdateSchoolViewProps {
  initialData: APIResponseSchool;
}

const UpdateSchoolView: React.FC<UpdateSchoolViewProps> = ({ initialData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<APIResponseSchool | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
  
      if (initialData.imageUrl) {
        getImageUrl(initialData.imageUrl)
          .then(url => {
            if (url) {
              setFormData(prevData => ({
                ...prevData!,
                imageUrl: url
              }));
            } else {
              console.error('Fetched image URL is undefined or empty');
            }
          })
          .catch(error => console.error('Error fetching image URL:', error));
      }
    }
  }, [initialData]);

  const handleInputChange = (field: keyof APIResponseSchool, value: string) => {
    setFormData((prevData) => prevData ? ({
      ...prevData,
      [field]: value,
    }) : null);
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData(prevData => ({
      ...prevData!,
      imageUrl: imageUrl
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) {
      return;
    }

    setHasError(true);

    // Check if all required fields are filled
    const requiredFields: (keyof APIResponseSchool)[] = ['name', 'pic', 'email', 'phone', 'address'];
    const isFormValid = requiredFields.every(field => formData[field]);

    if (!isFormValid) {
      return;
    }

    try {
      const updatedSchool = await SchoolAPI.update(formData.id, formData);
      router.push('/backoffice/school');
    } catch (error) {
      console.error('Failed to update school:');
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg bg-white">
      <div className="mb-6 flex">
        <ImageUploadInput
          onChange={handleImageChange}
          initialImage={formData.imageUrl || ''}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            School Name<label className="text-red-500">*</label>
          </label>
          <input
            type="text"
            placeholder="Input School Name"
            value={formData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            className={`block w-full p-2 border ${hasError && !formData.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
          />
          {hasError && !formData.name && (
            <p className="text-red-500 text-xs mt-1">
              School Name is required.
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            PIC<label className="text-red-500">*</label>
          </label>
          <input
            type="text"
            placeholder="Input PIC"
            value={formData.pic || ''}
            onChange={(e) => handleInputChange('pic', e.target.value)}
            required
            className={`block w-full p-2 border ${hasError && !formData.pic ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
          />
          {hasError && !formData.pic && (
            <p className="text-red-500 text-xs mt-1">PIC is required.</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Email<label className="text-red-500">*</label>
          </label>
          <input
            type="email"
            placeholder="Input Email"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className={`block w-full p-2 border ${hasError && !formData.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
          />
          {hasError && !formData.email && (
            <p className="text-red-500 text-xs mt-1">Email is required.</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nomor Telepon<label className="text-red-500">*</label>
          </label>
          <input
            type="tel"
            placeholder="Input Phone Number"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            className={`block w-full p-2 border ${hasError && !formData.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
          />
          {hasError && !formData.phone && (
            <p className="text-red-500 text-xs mt-1">
              Phone Number is required.
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Address<label className="text-red-500">*</label>
          </label>
          <input
            type="text"
            placeholder="Input School Address"
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            required
            className={`block w-full p-2 border ${hasError && !formData.address ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
          />
          {hasError && !formData.address && (
            <p className="text-red-500 text-xs mt-1">Address is required.</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/backoffice/school" className="p-0 m-0 block">
          <button className="border-2 border-[#F04438] text-[#F04438] bg-white hover:bg-[#F04438] hover:text-white px-3 py-2 rounded-lg">
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="text-black bg-[#FFC862] hover:bg-yellow-400 px-3 py-2 rounded-lg"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateSchoolView;
