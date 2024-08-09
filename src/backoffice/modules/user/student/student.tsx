'use client';

import { useState } from "react";
import { StudentView } from "./student.view";
import { StudentFormData } from "./student.type";

export const useStudentForm = () => {
  const [form, setForm] = useState<StudentFormData>({
    // Section A
    profilePicture: "",
    name: "",
    nik: "",
    fotoKtp: "",
    placeOfBirth: "",
    dateOfBirth: "",
    religion: "",
    gender: "",

    // Section B
    phoneNumber: "",
    email: "",

    // Section C
    province: "",
    city: "",
    subDistrict: "",
    zipCode: "",
    addressKtp: "",
    addressDomicile: "",

    // Section D
    institutionName: "",
    academicLevel: "",
    startFrom: "",
    Until: "",
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
    setForm((prevForm) => ({
      ...prevForm,
    }));
  };

  const resetForm = () => {
    setForm({
      // Reset all fields to their initial state
      // Section A
    profilePicture: "",
    name: "",
    nik: "",
    fotoKtp: "",
    placeOfBirth: "",
    dateOfBirth: "",
    religion: "",
    gender: "",

    // Section B
    phoneNumber: "",
    email: "",

    // Section C
    province: "",
    city: "",
    subDistrict: "",
    zipCode: "",
    addressKtp: "",
    addressDomicile: "",

    // Section D
    institutionName: "",
    academicLevel: "",
    startFrom: "",
    Until: "",
    });
  };
  
  return {
    form,
    handleInputChange,
    handleEducationChange,
    resetForm,
  };
};

export const Student: React.FC = () => {
  const studentFormProps = useStudentForm();

  return <StudentView {...studentFormProps} />;
};
