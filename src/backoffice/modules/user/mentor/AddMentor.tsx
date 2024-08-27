'use client';

import { useState } from 'react';

import { Education, MentorFormData } from './addMentor.type';
import { MentorView } from './AddMentor.view';
import { userAPI } from '../api/userApi';

export const useMentorForm = () => {
  const [form, setForm] = useState<MentorFormData>({
    role: 3,
    active: 1,
    profilePicture: '',
    name: '',
    nik: '',
    npwp: '',
    photoKtp: '',
    photoNpwp: '',
    placeOfBirth: '',
    dateOfBirth: '',
    religionId: null,
    gender: 0,
    mariageStatus: '',
    numberOfChildren: '',
    contract: '',
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
    educations: [
      {
        name: '',
        titleId: '',
        major: '',
        gpa: '',
        yearGraduate: '',
        certificateNumber: '',
        certificate: ''
      }
    ],
  });

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
    event: React.ChangeEvent<{ name?: string; value?: string }>,
    index: number
  ) => {
    const { name, value } = event.target;

    if (name) {
      setForm((prevForm) => ({
        ...prevForm,
        educations: prevForm.educations.map((edu, i) =>
          i === index ? { ...edu, [name]: value } : edu
        )
      }));
    }
  };

  const handleFileChange = (fieldName: string) => async (file: File | null) => {
    try {
      const response = file ? await userAPI.uploadFile(file, 'users') : null;
      console.log(response)
      setForm(prevForm => ({
        ...prevForm,
        [fieldName]: response || '',
      }));
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
    }
  };

  const handleProfilePictureChange = async (file: File | null) => {
    try {
      const response = file ? await userAPI.uploadFile(file, 'users') : null;
      console.log(response);
      setForm(prevForm => ({
        ...prevForm,
        profilePicture: response || '',
      }));
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
    }
  };

  const handleEducationFileChange = (index: number, fieldName: string) => async (file: File | null) => {
    try {
      const response = file ? await userAPI.uploadFile(file, 'users') : null;
      console.log(response);
      setForm(prevForm => ({
        ...prevForm,
        educations: prevForm.educations.map((edu, i) =>
          i === index ? { ...edu, [fieldName]: response || '' } : edu
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
          certificate: ''
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await userAPI.add(form);
      if (response) {
        console.log('Mentor added successfully');
        resetForm();
      }
    } catch (error) {
      console.error('Error adding mentor:', error);
    }
  };

  const resetForm = () => {
    setForm({
      role: 3,
      active: 1,
      profilePicture: '',
      name: '',
      nik: '',
      npwp: '',
      photoKtp: '',
      photoNpwp: '',
      placeOfBirth: '',
      dateOfBirth: '',
      religionId: null,
      gender: 0,
      mariageStatus: '',
      numberOfChildren: '',
      contract: '',
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
  };
};

export const Mentor: React.FC = () => {
  const mentorFormProps = useMentorForm();

  return <MentorView {...mentorFormProps} />;
};
