'use client';

import { useState, useEffect } from 'react';

import { SchoolOperatorFormData } from '../school-operator/schoolOperatorForm.type';
import { SchoolOperatorView } from './SchoolOperatorForm.view';
import { userAPI } from '../api/userApi';
import { useSearchParams } from 'next/navigation';
import { ResponseModal } from '../components/response-modal/responseModal';
import { useRouter } from 'next/navigation';
import { fileHelper } from '@/helpers/file-manager/fileUpload.helper';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';
import { useStatusModalStore } from '@/lib/store';
import ToasterProvider from '@/utils/ToasterProvider';

export const useSchoolOperatorForm = (id: string | null = null) => {

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { openModal } = useStatusModalStore();

  const [form, setForm] = useState<SchoolOperatorFormData>({
    id: id || '',
    role: 2,
    active: 1,
    profilePicture: '',
    profilePictureOrigin: '',
    name: '',
    password: '',
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
      if (file) {
        const response = await fileHelper.uploadFile(file, 'users');
        if (response && response.path && response.path.origins) {
          setForm(prevForm => ({
            ...prevForm,
            [fieldName]: response.path.origins,
            [`${fieldName}Origin`]: file.name,
          }));
        } else {
          throw new Error('File upload response is not in the expected format');
        }
      } else {
        setForm(prevForm => ({
          ...prevForm,
          [fieldName]: '',
          [`${fieldName}Origin`]: '',
        }));
      }
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
    }
  };

  const handleProfilePictureChange = async (file: File | null, originalFilename: string | null) => {
    try {
      if (file) {
        const response = await fileHelper.uploadFile(file, 'users');
        if (response && response.path && response.path.origins) {
          setForm(prevForm => ({
            ...prevForm,
            profilePicture: response.path.origins,
            profilePictureOrigin: originalFilename || file.name,
          }));
        } else {
          throw new Error('File upload response is not in the expected format');
        }
      } else {
        setForm(prevForm => ({
          ...prevForm,
          profilePicture: '',
          profilePictureOrigin: '',
        }));
      }
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
    
    const requiredFields = [
      'name', 'nik', 'placeOfBirth', 'dateOfBirth', 'religionId', 'gender','phone', 'email',
      'provinceId', 'districtId', 'subDistrictId', 'zipCode', 'addressDomicile', 'educationInstitutionId'
    ];
  
    const missingFields = requiredFields.filter(field => !form[field as keyof SchoolOperatorFormData]);
    
    if (missingFields.length > 0) {
      openModal({
        status: 'error',
        message: `Please fill in the following required fields: ${missingFields.join(', ')}`,
      });
      return;
    }
  
    setShowAlertModal(true);
  };
  
  
  useEffect(() => {
    if (isConfirmed) {
      confirmSubmit();
      setIsConfirmed(false);
    }
  }, [isConfirmed]);

  const confirmSubmit = async () => {
    setShowAlertModal(false);
    try {
      let response;
      if (form.id) {
        response = await userAPI.update(form.id, form);
      } else {
        response = await userAPI.add(form);
      }
      if (response && response.success) {
        openModal({
          status: 'success',
          action: form.id ? 'update' : 'create',
          message: `Successfully ${form.id ? 'updated' : 'added'} school operator`,
        });
        router.push('/backoffice/manage-user?userType=School Operator');
      } else {
        throw new Error(response?.message || 'API response indicates failure');
      }
    } catch (error) {
      console.log('error');
      console.error(form.id ? 'Error updating school operator:' : 'Error adding school operator:', error);
      openModal({
        status: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
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
      password: '',
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
    showAlertModal,
    setShowAlertModal,
    setIsConfirmed,
    openModal,
  };
};

export const SchoolOperator: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const schoolOperatorFormProps = useSchoolOperatorForm(id);

  return (
    <ToasterProvider>
      <SchoolOperatorView {...schoolOperatorFormProps} />
    </ToasterProvider>
  );
};
