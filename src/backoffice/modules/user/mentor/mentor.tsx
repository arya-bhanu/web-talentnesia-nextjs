'use client';

import { useState } from "react";
import { MentorView } from "./mentor.view";
import { Education, MentorFormData } from "./mentor.type";

export const useMentorForm = () => {
  const [form, setForm] = useState<MentorFormData>({
    // Section A
    profilePicture: null,
    name: "",
    nik: "",
    npwp: "",
    fotoKtp: null,
    fotoNpwp: null,
    placeOfBirth: "",
    dateOfBirth: "",
    religion: "",
    gender: "",
    maritalStatus: "",
    numberOfChildren: "",

    // Section B
    phoneNumber: "",
    linkedin: "",
    email: "",
    emergencyContact: "",

    // Section C
    province: "",
    city: "",
    subDistrict: "",
    zipCode: "",
    addressKtp: "",
    addressDomicile: "",

    // Section D
    education: [
      {
        universityName: "",
        academicTitle: "",
        major: "",
        gpa: "",
        yearGraduated: "",
        certificateNumber: "",
      },
    ],
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleEducationChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
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
            universityName: "",
            academicTitle: "",
          major: "",
          gpa: "",
          yearGraduated: "",
          certificateNumber: "",
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
      name: "",
      nik: "",
      npwp: "",
      fotoKtp: null,
      fotoNpwp: null,
      placeOfBirth: "",
      dateOfBirth: "",
      religion: "",
      gender: "",
      maritalStatus: "",
      numberOfChildren: "",
      phoneNumber: "",
      linkedin: "",
      email: "",
      emergencyContact: "",
      province: "",
      city: "",
      subDistrict: "",
      zipCode: "",
      addressKtp: "",
      addressDomicile: "",
      education: [{
        universityName: "",
        academicTitle: "",
        major: "",
        gpa: "",
        yearGraduated: "",
        certificateNumber: "",
      }],
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
