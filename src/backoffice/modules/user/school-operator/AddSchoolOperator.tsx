'use client';

import { useState } from 'react';
import { SchoolOperatorView } from './AddSchoolOperator.view';
import { SchoolOperatorFormData } from './addSchoolOperator.type';

export const useSchoolOperatorForm = () => {
  const [form, setForm] = useState<SchoolOperatorFormData>({
    // Section A
    profilePicture: '',

    name: '',
    nik: '',
    placeOfBirth: '',
    dateOfBirth: '',
    religion: '',
    gender: '',

    // Section B
    phoneNumber: '',
    email: '',

    // Section C
    province: '',
    district: '',
    subDistrict: '',
    zipCode: '',
    addressDomicile: '',

    // Section D
    school: '',
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
    setForm((prevForm) => ({
      ...prevForm,
    }));
  };

  const resetForm = () => {
    setForm({
      // Reset all fields to their initial state
      // Section A
      profilePicture: '',
      name: '',
      nik: '',
      placeOfBirth: '',
      dateOfBirth: '',
      religion: '',
      gender: '',

      // Section B
      phoneNumber: '',
      email: '',

      // Section C
      province: '',
      district: '',
      subDistrict: '',
      zipCode: '',
      addressDomicile: '',

      // Section D
      school: '',
    });
  };

  return {
    form,
    handleInputChange,
    handleEducationChange,
    resetForm,
  };
};

export const SchoolOperator: React.FC = () => {
  const schoolOperatorFormProps = useSchoolOperatorForm();

  return <SchoolOperatorView {...schoolOperatorFormProps} />;
};
