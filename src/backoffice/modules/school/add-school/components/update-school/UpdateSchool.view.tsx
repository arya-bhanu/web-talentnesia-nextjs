'use client';

import React from 'react';
import { APIResponseSchool } from '../../../school.type';
import ImageUploadInput from '../../../components/image-upload-input/ImageUploadInput';
import Link from 'next/link';
import NotificationModal from '@/backoffice/modules/school/components/notification-modal/notificationModal';

interface UpdateSchoolViewProps {
  initialData: APIResponseSchool;
  fullImageUrl: string;
  hasError: boolean;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (field: keyof APIResponseSchool, value: string) => void;
  handleImageChange: (imageUrl: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setModalMessage: (message: string) => void;
  modalMessage: string;
  handleModalClose: () => void;
}

const UpdateSchoolView: React.FC<UpdateSchoolViewProps> = ({
  initialData,
  fullImageUrl,
  hasError,
  showModal,
  handleModalClose,
  modalMessage,
  handleInputChange,
  handleImageChange,
  handleSubmit,
}) => {
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
          <label className="block mb-2 text-sm font-medium text-gray-900">
            School Name<label className="text-red-500">*</label>
          </label>
          <input
            type="text"
            placeholder="Input School Name"
            value={initialData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            className={`block w-full p-2 border ${
              hasError && !initialData.name
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-lg`}
          />
          {hasError && !initialData.name && (
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
            value={initialData.pic || ''}
            onChange={(e) => handleInputChange('pic', e.target.value)}
            required
            className={`block w-full p-2 border ${
              hasError && !initialData.pic
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-lg`}
          />
          {hasError && !initialData.pic && (
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
            value={initialData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className={`block w-full p-2 border ${
              hasError && !initialData.email
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-lg`}
          />
          {hasError && !initialData.email && (
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
            value={initialData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            className={`block w-full p-2 border ${
              hasError && !initialData.phone
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-lg`}
          />
          {hasError && !initialData.phone && (
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
            value={initialData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            required
            className={`block w-full p-2 border ${
              hasError && !initialData.address
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-lg`}
          />
          {hasError && !initialData.address && (
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
      <NotificationModal
        show={showModal}
        onClose={handleModalClose}
        message={modalMessage}
        isError={hasError}
      />
    </form>
  );
};

export default UpdateSchoolView;
