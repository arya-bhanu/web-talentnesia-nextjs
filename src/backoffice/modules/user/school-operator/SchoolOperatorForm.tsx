'use client';

import { useState, useEffect } from 'react';

import { SchoolOperatorFormData } from '../school-operator/schoolOperatorForm.type';
import { SchoolOperatorView } from './SchoolOperatorForm.view';
import { userAPI } from '../api/userApi';
import { useSearchParams } from 'next/navigation';
import { ResponseModal } from '../components/response-modal/responseModal';
import { useRouter } from 'next/navigation';
import { fileHelper } from '@/helpers/file-manager/fileUpload.helper';

export const useSchoolOperatorForm = (id: string | null = null) => {
  const [form, setForm] = useState<SchoolOperatorFormData>({
    id: id || '',
    role: 2,
    active: 1,
    profilePicture: '',
    profilePictureOrigin: '',
    name: '',
    nik: '',
    placeOfBirth: '',
    dateOfBirth: '',
    religionId: null,
    gender: 0,

    phone: '',
    email: '',

    provinceId: null,
    districtId: null,
    subDistrictId: null,
    zipCode: '',
    addressDomicile: '',

    educationInstitutionId: '',
  });

  useEffect(() => {
    if (id) {
      fetchSchoolOperatorData(id);
    }
  }, [id]);

  const fetchSchoolOperatorData = async (id: string) => {
    try {
      const response = await userAPI.show(id);
      if (response.success && response.data) {
        const schoolOperatorData = response.data;
        setForm(prevForm => ({
          ...prevForm,
          ...schoolOperatorData,
          profilePicture: schoolOperatorData.profilePicture || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching schoolOperator data:', error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === 'gender' ? parseInt(value, 10) : value,
    }));
  };
  

  const handleFileChange = (fieldName: string) => async (file: File | null) => {
    try {
      const response = file ? await fileHelper.uploadFile(file, 'users') : null;
      setForm(prevForm => ({
        ...prevForm,
        [fieldName]: response || '',
        [`${fieldName}Origin`]: file ? file.name : '',
      }));
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
    }
  };

  const handleProfilePictureChange = async (file: File | null, originalFilename: string | null) => {
    try {
      const response = file ? await fileHelper.uploadFile(file, 'users') : null;
      setForm(prevForm => ({
        ...prevForm,
        profilePicture: response || '',
        profilePictureOrigin: originalFilename,
      }));
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
    }
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    setShowConfirmModal(false);
    try {
      let response;
      if (form.id) {
        response = await userAPI.update(form.id, form);
      } else {
        response = await userAPI.add(form);
      }
      if (response) {
        router.push('/backoffice/manage-user?success=true&action=' + (form.id ? 'edit' : 'add') + '&userType=School Operator');
      }
    } catch (error) {
      console.error(form.id ? 'Error updating School Operator:' : 'Error adding School Operator:', error);
      router.push('/backoffice/manage-user?success=false&userType=School Operator');
    }
  };

  const resetForm = () => {
    setForm({
      id: id || '',
      role: 3,
      active: 1,
      profilePicture: '',
      profilePictureOrigin: '',
      name: '',
      nik: '',
      placeOfBirth: '',
      dateOfBirth: '',
      religionId: null,
      gender: 0,

      phone: '',
      email: '',

      provinceId: null,
      districtId: null,
      subDistrictId: null,
      zipCode: '',
      addressDomicile: '',

      educationInstitutionId: '',
    });
  };

  return {
    form,
    handleInputChange,
    resetForm,
    handleFileChange,
    handleProfilePictureChange,
    handleSubmit,
    showConfirmModal,
    setShowConfirmModal,
    showResultModal,
    setShowResultModal,
    isSuccess,
    confirmSubmit,
  };
};

export const SchoolOperator: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const schoolOperatorFormProps = useSchoolOperatorForm(id);

  return <SchoolOperatorView {...schoolOperatorFormProps} />;
};
