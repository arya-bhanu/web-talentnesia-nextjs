'use client';

import { useState, useEffect } from 'react';

import { StudentFormData } from '../student/studentForm.type';
import { StudentView } from './StudentForm.view';
import { userAPI } from '../api/userApi';
import { useSearchParams } from 'next/navigation';
import { ResponseModal } from '../components/response-modal/responseModal';
import { useRouter } from 'next/navigation';
import { fileHelper } from '@/helpers/file-manager/fileUpload.helper';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';
import { useStatusModalStore } from '@/lib/store';
import ToasterProvider from '@/utils/ToasterProvider';
import { User } from '../user.type';

export const useStudentForm = (id: string | null = null) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { openModal } = useStatusModalStore();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [form, setForm] = useState<StudentFormData>({
    id: id || '',
    role: 4,
    active: 1,
    profilePicture: '',
    profilePictureOrigin: '',
    name: '',
    password: '',
    nik: '',
    photoKtp: '',
    photoKtpOrigin: '',
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
    addressKtp: '',
    addressDomicile: '',

    educationName: '',
    educationLevelId: '',
    educationStart: '',
    educationEnd: '',
  });

  useEffect(() => {
    if (id) {
      fetchStudentData(id);
    }
  }, [id]);

  const fetchStudentData = async (id: string) => {
    try {
      const response = await userAPI.show(id);
      if (response.success && response.data) {
        const studentData = response.data;
        const { password, ...studentDataWithoutPassword } = studentData;
        setForm(prevForm => ({
          ...prevForm,
          ...studentDataWithoutPassword,
          photoKtp: studentDataWithoutPassword.photoKtp || '',
          profilePicture: studentDataWithoutPassword.profilePicture || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: unknown } }
  ) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === 'gender' 
        ? typeof value === 'string' ? parseInt(value, 10) : prevForm.gender
        : ['educationStart', 'educationEnd'].includes(name)
          ? typeof value === 'string' ? value : prevForm[name as keyof StudentFormData]
          : value,
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

  const handleNIKChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = event.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim().slice(0, 19);
    setForm(prevForm => ({
      ...prevForm,
      nik: formatted
    }));
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 5);
    setForm(prevForm => ({
      ...prevForm,
      zipCode: value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      phone: value
    }));
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const requiredFields = [
      'name', 'nik', 'placeOfBirth', 'dateOfBirth', 'religionId', 'gender',
      'phone', 'email', 'provinceId', 'districtId', 'subDistrictId', 'zipCode',
      'addressKtp', 'addressDomicile', 'educationName', 'educationLevelId',
      'educationStart', 'educationEnd'
    ];
  
    const missingFields = requiredFields.filter(field => !form[field as keyof StudentFormData]);
    
    if (missingFields.length > 0) {
      openModal({
        status: 'error',
        message: `Please fill in the following required fields: ${missingFields.join(', ')}`,
      });
      return;
    }
  
    setShowAlertModal(true);
  };
  

  const confirmSubmit = async () => {
    setShowAlertModal(false);
    try {
      let response;
      if (form.id) {

        response = await userAPI.update(form.id, form as unknown as { [key: string]: User });
      } else {

        response = await userAPI.add(form as unknown as FormData);
      }
      if (response && response.success) {
        openModal({
          status: 'success',
          action: form.id ? 'update' : 'create',
          message: `Successfully ${form.id ? 'updated' : 'added'} Student`,
        });
        router.push('/backoffice/manage-user?userType=Student');
      } else {
        throw new Error(response?.message || 'API response indicates failure');
      }
    } catch (error) {
      console.log('error');
      console.error(form.id ? 'Error updating Student:' : 'Error adding Student:', error);
      openModal({
        status: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }

  };
  useEffect(() => {
    if (isConfirmed) {
      confirmSubmit();
      setIsConfirmed(false);
    }
  }, [isConfirmed, confirmSubmit]);

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
      photoKtp: '',
      photoKtpOrigin: '',
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
      addressKtp: '',
      addressDomicile: '',

      educationName: '',
      educationLevelId: '',
      educationStart: '',
      educationEnd: '',
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
    handleNIKChange,
    handleZipCodeChange,
    handlePhoneChange,
    showPassword,
    togglePasswordVisibility,
  };
};

export const Student: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const studentFormProps = useStudentForm(id);

  return (
    <ToasterProvider>
      <StudentView {...studentFormProps} />
    </ToasterProvider>
  );
};
