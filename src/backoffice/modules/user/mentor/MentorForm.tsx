'use client';

import { useState, useEffect } from 'react';

import { Education, MentorFormData } from '../mentor/mentorForm.type';
import { MentorView } from './MentorForm.view';
import { userAPI } from '../api/userApi';
import { useSearchParams } from 'next/navigation';
import { ResponseModal } from '../components/response-modal/responseModal';
import { useRouter } from 'next/navigation';
import { fileHelper } from '@/helpers/file-manager/fileUpload.helper';

export const useMentorForm = (id: string | null = null) => {
  const [form, setForm] = useState<MentorFormData>({
    id: id || '',
    role: 3,
    active: 1,
    profilePicture: '',
    profilePictureOrigin: '',
    name: '',
    nik: '',
    npwp: '',
    photoKtp: '',
    photoKtpOrigin: '',
    photoNpwp: '',
    photoNpwpOrigin: '',
    placeOfBirth: '',
    dateOfBirth: '',
    religionId: null,
    gender: 0,
    mariageStatus: '',
    numberOfChildren: '',
    contract: '',
    contractOrigin: '',
    phone: '',
    email: '',
    linkedin: '',
    emergencyContact: '',
    provinceId: null,
    districtId: null,
    subDistrictId: null,
    zipCode: '',
    addressKtp: '',
    addressDomicile: '',
    educations: !id ? [{
      name: '',
      titleId: null,
      major: '',
      gpa: '',
      yearGraduate: '',
      certificateNumber: '',
      certificate: '',
      certificateOrigin: ''
    }] : [],
  });

  useEffect(() => {
    if (id) {
      fetchMentorData(id);
    }
  }, [id]);

  const fetchMentorData = async (id: string) => {
    try {
      const response = await userAPI.show(id);
      if (response.success && response.data) {
        const mentorData = response.data;
        setForm(prevForm => ({
          ...prevForm,
          ...mentorData,
          photoKtp: mentorData.photoKtp || '',
          photoNpwp: mentorData.photoNpwp || '',
          contract: mentorData.contract || '',
          profilePicture: mentorData.profilePicture || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching mentor data:', error);
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

  const handleEducationChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    index: number
  ) => {
    const { name, value } = event.target;
    if (name) {
      setForm((prevForm) => ({
        ...prevForm,
        educations: prevForm.educations.map((edu, i) =>
          i === index ? { ...edu, [name.split('.')[1]]: value } : edu
        )
      }));
    }
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
      if (file) {
        const response = await fileHelper.uploadFile(file, 'users');
        if (response) {
          setForm(prevForm => ({
            ...prevForm,
            profilePicture: response,
            profilePictureOrigin: originalFilename || file.name,
          }));
        } else {
          throw new Error('File upload failed');
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

  const handleEducationFileChange = (index: number, fieldName: string) => async (file: File | null) => {
    try {
      const response = file ? await fileHelper.uploadFile(file, 'users') : null;
      setForm(prevForm => ({
        ...prevForm,
        educations: prevForm.educations.map((edu, i) =>
          i === index ? {
            ...edu,
            [fieldName]: response || '',
            [`${fieldName}Origin`]: file ? file.name : ''
          } : edu
        )
      }));
    } catch (error) {
      console.error(`Failed to upload education file (${fieldName}):`, error);
    }
  };
  

  const addEducation = () => {
    setForm((prevForm) => ({
      ...prevForm,
      educations: [
        ...prevForm.educations,
        {
          name: '',
          titleId: null,
          major: '',
          gpa: '',
          yearGraduate: '',
          certificateNumber: '',
          certificate: '',
          certificateOrigin: ''
        }
      ],
    }));
  };

  const removeEducation = (index: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      educations: prevForm.educations.filter((_, i) => i !== index),
    }));
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
        router.push('/backoffice/manage-user?success=true&action=' + (form.id ? 'edit' : 'add'));
      }
    } catch (error) {
      console.error(form.id ? 'Error updating mentor:' : 'Error adding mentor:', error);
      router.push('/backoffice/manage-user?success=false');
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
      npwp: '',
      photoKtp: '',
      photoKtpOrigin: '',
      photoNpwp: '',
      photoNpwpOrigin: '',
      placeOfBirth: '',
      dateOfBirth: '',
      religionId: null,
      gender: 0,
      mariageStatus: '',
      numberOfChildren: '',
      contract: '',
      contractOrigin: '',
      phone: '',
      email: '',
      linkedin: '',
      emergencyContact: '',
      provinceId: null,
      districtId: null,
      subDistrictId: null,
      zipCode: '',
      addressKtp: '',
      addressDomicile: '',
      educations: []
    });
  };

  return {
    form,
    handleInputChange,
    handleEducationChange,
    addEducation,
    removeEducation,
    resetForm,
    handleFileChange,
    handleProfilePictureChange,
    handleEducationFileChange,
    handleSubmit,
    showConfirmModal,
    setShowConfirmModal,
    showResultModal,
    setShowResultModal,
    isSuccess,
    confirmSubmit,
  };
};

export const Mentor: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const mentorFormProps = useMentorForm(id);

  return <MentorView {...mentorFormProps} />;
};
