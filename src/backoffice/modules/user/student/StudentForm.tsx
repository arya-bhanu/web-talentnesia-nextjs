'use client';

import { useState, useEffect } from 'react';

import { StudentFormData } from '../student/studentForm.type';
import { StudentView } from './StudentForm.view';
import { userAPI } from '../api/userApi';
import { useSearchParams } from 'next/navigation';
import { ResponseModal } from '../components/response-modal/responseModal';
import { useRouter } from 'next/navigation';
import { fileHelper } from '@/helpers/file-manager/fileUpload.helper';

export const useStudentForm = (id: string | null = null) => {
  const [form, setForm] = useState<StudentFormData>({
    id: id || '',
    role: 4,
    active: 1,
    profilePicture: '',
    profilePictureOrigin: '',
    name: '',
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
        setForm(prevForm => ({
          ...prevForm,
          ...studentData,
          photoKtp: studentData.photoKtp || '',
          profilePicture: studentData.profilePicture || '',
          educationStart: studentData.educationStart ? parseInt(studentData.educationStart, 10) : null,
          educationEnd: studentData.educationEnd ? parseInt(studentData.educationEnd, 10) : null,
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
        router.push('/backoffice/manage-user?success=true&action=' + (form.id ? 'edit' : 'add') + '&userType=student');
      }
    } catch (error) {
      console.error(form.id ? 'Error updating student:' : 'Error adding student:', error);
      router.push('/backoffice/manage-user?success=false&userType=student');
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
  };
};

export const Student: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const studentFormProps = useStudentForm(id);

  return <StudentView {...studentFormProps} />;
};
