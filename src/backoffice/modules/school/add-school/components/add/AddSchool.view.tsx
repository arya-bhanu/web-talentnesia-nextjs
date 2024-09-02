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
import { getImageUrl } from '../../../api/minioApi';
import NotificationModal from '@/backoffice/modules/school/components/notification-modal/notificationModal';

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
  const [fullImageUrl, setFullImageUrl] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleInputChange = (field: keyof APIResponseSchool, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = async (imageUrl: string) => {
    try {
      const fullUrl = await getImageUrl(imageUrl);
      console.log('Image URL:', imageUrl);
      console.log('Full image URL:', fullUrl);
      setFullImageUrl(fullUrl);
      handleInputChange('imageUrl', imageUrl);
    } catch (error) {
      console.error('Failed to get full image URL:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(true);

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
      setModalMessage('Please fill in all required fields.');
      setShowModal(true);
      return;
    }

    try {
      const newSchool = await SchoolAPI.add(formData as APIResponseSchool);
      console.log('School added successfully:', newSchool);
      setModalMessage('School added successfully!');
      setHasError(false);
      setShowModal(true);
      router.push('/backoffice/school');
    } catch (error) {
      console.error('Failed to add school:', error);
      setModalMessage('Failed to add school. Please try again.');
      setHasError(true);
      setShowModal(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg bg-white">
      <div className="mb-6 flex">
        <ImageUploadInput
          onChange={handleImageChange}
          initialImage={fullImageUrl || ''}
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
      <NotificationModal
      show={showModal}
      onClose={() => setShowModal(false)}
      message={modalMessage}
      isError={hasError}
    />
    </form>
  );
};

export default AddSchoolView;
