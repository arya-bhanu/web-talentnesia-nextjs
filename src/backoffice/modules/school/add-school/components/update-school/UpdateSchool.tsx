'use client';
import React, { useEffect, useState } from 'react';
import UpdateSchoolView from './UpdateSchool.view';
import { SchoolAPI } from '../../../api/schoolApi';
import { APIResponseSchool } from '../../../school.type';
import { useSearchParams, useRouter } from 'next/navigation';
import { getImageUrl } from '../../../api/minioApi';
import { useStatusModalStore } from '@/lib/store';
import Loading from '@/components/loading';
import AlertModal from '@/backoffice/components/alert-modal';

const UpdateSchool: React.FC = () => {
  const [schoolData, setSchoolData] = useState<APIResponseSchool | null>(null);
  const [fullImageUrl, setFullImageUrl] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [tempFormData, setTempFormData] = useState<APIResponseSchool | null>(null);
  const { openModal } = useStatusModalStore();

  const id = params.get('schoolId');

  useEffect(() => {
    const fetchSchoolData = async () => {
      if (id) {
        try {
          const data = await SchoolAPI.getById(id);
          setSchoolData(data);

          if (data.imageUrl) {
            const imageUrl = await getImageUrl(data.imageUrl);
            setFullImageUrl(imageUrl || '');
          }
        } catch (error) {
          console.error('Failed to fetch school data:', error);
        }
      }
    };

    fetchSchoolData();
  }, [id]);

  useEffect(() => {
    if (isConfirmed && tempFormData) {
      handleConfirmedSubmit(tempFormData);
      setTempFormData(null);
      setIsConfirmed(false);
    }
  }, [isConfirmed]);

  const handleInputChange = (field: keyof APIResponseSchool, value: string) => {
    setSchoolData((prevData) =>
      prevData ? { ...prevData, [field]: value } : null,
    );
  };

  const handleImageChange = async (imageUrl: string) => {
    try {
      const fullUrl = await getImageUrl(imageUrl);
      setFullImageUrl(fullUrl);
      handleInputChange('imageUrl', imageUrl);
    } catch (error) {
      console.error('Failed to get full image URL:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!schoolData) return;

    setHasError(true);

    const requiredFields: (keyof APIResponseSchool)[] = [
      'name',
      'pic',
      'email',
      'phone',
      'address',
    ];
    const isFormValid = requiredFields.every((field) => schoolData[field]);

    if (!isFormValid) {
      openModal({
        status: 'error',
        timeOut: 2000,
        message: 'Please fill in all required fields.',
      });
      return;
    }

    setTempFormData(schoolData);
    setOpenAlertModal(true);
  };

  const handleConfirmedSubmit = async (data: APIResponseSchool) => {
    try {
      await SchoolAPI.update(data.id, data);
      setHasError(false);
      openModal({
        status: 'success',
        timeOut: 2000,
        action: 'update',
        message: 'School updated successfully',
      });
      router.push('/backoffice/school');
    } catch (error) {
      console.error('Failed to update school:', error);
      openModal({
        status: 'error',
        timeOut: 2000,
        message: 'Failed to update school',
      });
    }
  };

  if (!schoolData) return <Loading isLoading />;

  return (
    <>
      <UpdateSchoolView
        initialData={schoolData}
        fullImageUrl={fullImageUrl}
        hasError={hasError}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
      <AlertModal
        openModal={openAlertModal}
        setOpenModal={setOpenAlertModal}
        setIsConfirmed={setIsConfirmed}
        messageText="Are you sure you want to update this school?"
      />
    </>
  );
};

export default UpdateSchool;
