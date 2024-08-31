'use client';
import React, { useEffect, useState } from 'react';
import UpdateSchoolView from './UpdateSchool.view';
import { SchoolAPI } from '../../../api/schoolApi';
import { APIResponseSchool } from '../../../school.type';
import { useSearchParams, useRouter } from 'next/navigation';
import { getImageUrl } from '../../../api/minioApi';

const UpdateSchool: React.FC = () => {
  const [schoolData, setSchoolData] = useState<APIResponseSchool | null>(null);
  const [fullImageUrl, setFullImageUrl] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

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

  const handleInputChange = (field: keyof APIResponseSchool, value: string) => {
    setSchoolData((prevData) =>
      prevData ? { ...prevData, [field]: value } : null
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

    if (!isFormValid) return;

    try {
      await SchoolAPI.update(schoolData.id, schoolData);
      router.push('/backoffice/school');
    } catch (error) {
      console.error('Failed to update school:', error);
    }
  };

  if (!schoolData) return <div>Loading...</div>;

  return (
    <UpdateSchoolView
      initialData={schoolData}
      fullImageUrl={fullImageUrl}
      hasError={hasError}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default UpdateSchool;
