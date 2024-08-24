'use client';

import { useState } from 'react';

import { Education, MentorFormData } from './addMentor.type';
import { MentorView } from './AddMentor.view';

export const useMentorForm = () => {
  const [form, setForm] = useState<MentorFormData>({
    // Section A
    profilePicture: null,
    name: '',
    nik: '',
    npwp: '',
    fotoKtp: null,
    fotoNpwp: null,
    placeOfBirth: '',
    dateOfBirth: '',
    religion: '',
    gender: '',
    isMarried: '',
    numberOfChildren: '',
    contract: null,

    // Section B
    phone: '',
    linkedin: '',
    email: '',
    emergencyContact: '',

    // Section C
    province: '',
    district: '',
    subDistrict: '',
    zipCode: '',
    addressKtp: '',
    addressDomicile: '',

    // Section D
    education: [
      {
        name: '',
        title: '',
        major: '',
        gpa: '',
        yearGraduated: '',
        certificateNumber: '',
        certificate: null,
      },
    ],
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleEducationChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    const newEducation = [...form.education];
    newEducation[index] = {
      ...newEducation[index],
      [name]: value,
    };
    setForm((prevForm) => ({
      ...prevForm,
      education: newEducation,
    }));
  };

  const addEducation = () => {
    if (form.education.length < 3) {
      setForm((prevForm) => ({
        ...prevForm,
        education: [
          ...prevForm.education,
          {
            name: '',
            title: '',
            major: '',
            gpa: '',
            yearGraduated: '',
            certificateNumber: '',
            certificate: null,
          },
        ],
      }));
    }
  };

  const removeEducation = (index: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      education: prevForm.education.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setForm({
      // Reset all fields to their initial state
      profilePicture: null,

      name: '',
      nik: '',
      npwp: '',
      fotoKtp: null,
      fotoNpwp: null,
      placeOfBirth: 'date',
      dateOfBirth: 'date',
      religion: '',
      gender: '',
      isMarried: '',
      numberOfChildren: '',
      contract: null,

      phone: '',
      linkedin: '',
      email: '',
      emergencyContact: '',

      province: '',
      district: '',
      subDistrict: '',
      zipCode: '',
      addressKtp: '',
      addressDomicile: '',
      education: [
        {
          name: '',
          title: '',
          major: '',
          gpa: '',
          yearGraduated: 'date',
          certificateNumber: '',
          certificate: null,
        },
      ],
    });
  };

  return {
    form,
    handleInputChange,
    handleEducationChange,
    addEducation,
    removeEducation,
    resetForm,
  };
};

export const Mentor: React.FC = () => {
  const mentorFormProps = useMentorForm();

  return <MentorView {...mentorFormProps} />;
};
