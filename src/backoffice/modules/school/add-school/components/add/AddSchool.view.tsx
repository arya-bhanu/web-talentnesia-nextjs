// AddSchool.view.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LabelForm from '@/backoffice/components/label-form';
import { APIResponseSchool } from '../../../school.type';
import ImageUploadInput from '../../../components/image-upload-input/ImageUploadInput';
import Link from 'next/link';
import { SchoolAPI } from '../../../api/schoolApi';
import { AddSchoolViewProps } from './addSchool.type';

const AddSchoolView: React.FC<AddSchoolViewProps> = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<APIResponseSchool>>({
    name: '',
    pic: '',
    email: '',
    phone: '',
    address: '',
    imageUrl: '',
  });
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (field: keyof APIResponseSchool, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    console.log('New image URL:', imageUrl);
    handleInputChange('imageUrl', imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setHasError(true);

    // Check if all required fields are filled
    const requiredFields: (keyof APIResponseSchool)[] = [
      'name',
      'pic',
      'email',
      'phone',
      'address',
      'imageUrl',
    ];
    const isFormValid = requiredFields.every((field) => formData[field]);

    if (!isFormValid) {
      console.log(formData)
      return;
    }

    try {
      const newSchool = await SchoolAPI.add(formData as APIResponseSchool);
      console.log('School added successfully:', newSchool);
      router.push('/backoffice/school');
    } catch (error) {
      console.error('Failed to add school:', error);
    }
  };

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
          <LabelForm isImportant htmlFor="name">
            School Name
          </LabelForm>
          <input
            id="name"
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
          <LabelForm isImportant htmlFor="pic">
            PIC
          </LabelForm>
          <input
            id="pic"
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
          <LabelForm isImportant htmlFor="email">
            Email
          </LabelForm>
          <input
            id="email"
            placeholder="Input Email"
            type="email"
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
          <LabelForm isImportant htmlFor="phone">
            Nomor Telepon
          </LabelForm>
          <input
            id="phone"
            placeholder="Input Phone Number"
            type="tel"
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
          <LabelForm isImportant htmlFor="address">
            Address
          </LabelForm>
          <input
            id="address"
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
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddSchoolView;
