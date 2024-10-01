'use client';

import { useState, useEffect } from 'react';

import { Education, MentorFormData } from '../mentor/mentorForm.type';
import { MentorView } from './MentorForm.view';
import { userAPI } from '../api/userApi';
import { useSearchParams } from 'next/navigation';
import { ResponseModal } from '../components/response-modal/responseModal';
import { useRouter } from 'next/navigation';
import { fileHelper } from '@/helpers/file-manager/fileUpload.helper';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';
import { useStatusModalStore } from '@/lib/store';
import ToasterProvider from '@/utils/ToasterProvider';
import { User } from '../user.type';


export const useMentorForm = (id: string | null = null) => {

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { openModal } = useStatusModalStore();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const [form, setForm] = useState<MentorFormData>({
    id: id || '',
    role: 3,
    active: 1,
    profilePicture: '',
    profilePictureOrigin: '',
    name: '',
    password: '',
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
    numberOfChildren: null,
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

  const formatNPWP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const chars = numbers.split('');
    let formatted = '';
  
    for (let i = 0; i < chars.length; i++) {
      if (i === 2 || i === 5 || i === 8 || i === 12) {
        formatted += '.';
      } else if (i === 9) {
        formatted += '-';
      }
      formatted += chars[i];
    }
  
    return formatted;
  };

  const formatNIK = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const chars = numbers.split('');
    let formatted = '';
  
    for (let i = 0; i < chars.length; i++) {
      if (i === 4 || i === 8 || i === 12) {
        formatted += ' ';
      }
      formatted += chars[i];
    }
  
    return formatted;
  };
  
  const handleNIKChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNIK(event.target.value);
    setForm(prevForm => ({
      ...prevForm,
      nik: formatted
    }));
  };
  

  const handleNPWPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNPWP(event.target.value);
    setForm(prevForm => ({
      ...prevForm,
      npwp: formatted
    }));
  };

  const handleNumberOfChildrenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setForm(prevForm => ({
        ...prevForm,
        numberOfChildren: value
      }));
    }
  };

  const fetchMentorData = async (id: string) => {
    try {
      const response = await userAPI.show(id);
      if (response.success && response.data) {
        const mentorData = response.data;
        const { password, ...mentorDataWithoutPassword } = mentorData;
        setForm(prevForm => ({
          ...prevForm,
          ...mentorDataWithoutPassword,
          photoKtp: mentorDataWithoutPassword.photoKtp || '',
          photoNpwp: mentorDataWithoutPassword.photoNpwp || '',
          contract: mentorDataWithoutPassword.contract || '',
          profilePicture: mentorDataWithoutPassword.profilePicture || '',
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

  const handlePhoneChange = (value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      phone: value
    }));
  };

  const handleEmergencyContactChange = (value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      emergencyContact: value
    }));
  };

  const formatGPA = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    let formattedValue = '';
  
    if (numericValue.length > 0) {
      const firstDigit = parseInt(numericValue[0]);
      if (firstDigit >= 1 && firstDigit <= 4) {
        formattedValue = numericValue[0];
        if (numericValue.length > 1) {
          formattedValue += '.';
          if (firstDigit === 4) {
            formattedValue += numericValue.slice(1, 2);
            if (numericValue.length > 2) {
              formattedValue += '0';
            }
          } else {
            formattedValue += numericValue.slice(1, 3);
          }
        }
      }
    }
  
    return formattedValue;
  };

  const handleGPAChange = (index: number, value: string) => {
    const formattedGPA = formatGPA(value);
    setForm(prevForm => ({
      ...prevForm,
      educations: prevForm.educations.map((edu, i) =>
        i === index ? { ...edu, gpa: formattedGPA } : edu
      )
    }));
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 5);
    setForm(prevForm => ({
      ...prevForm,
      zipCode: value
    }));
  };

  const handleEducationFileChange = (index: number, fieldName: string) => async (file: File | null) => {
    try {
      if (file) {
        const response = await fileHelper.uploadFile(file, 'users');
        if (response && response.path && response.path.origins) {
          setForm(prevForm => ({
            ...prevForm,
            educations: prevForm.educations.map((edu, i) =>
              i === index ? {
                ...edu,
                [fieldName]: response.path.origins,
                [`${fieldName}Origin`]: file.name
              } : edu
            )
          }));
        } else {
          throw new Error('File upload response is not in the expected format');
        }
      } else {
        setForm(prevForm => ({
          ...prevForm,
          educations: prevForm.educations.map((edu, i) =>
            i === index ? {
              ...edu,
              [fieldName]: '',
              [`${fieldName}Origin`]: ''
            } : edu
          )
        }));
      }
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
    
    const requiredFields = [
      'name', 'nik', 'placeOfBirth', 'dateOfBirth', 'religion', 'gender',
      'mariageStatus', 'contract', 'phone', 'email', 'linkedin', 'emergencyContact',
      'province', 'district', 'subDistrict', 'zipCode', 'addressKtp', 'addressDomicile'
    ];
  
    const fieldMapping: { [key: string]: string } = {
      religionId: 'religion',
      provinceId: 'province',
      districtId: 'district',
      subDistrictId: 'subDistrict'
    };
  
    const missingFields = requiredFields.filter(field => {
      const formField = fieldMapping[field] || field;
      return !form[formField as keyof MentorFormData];
    });
    
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
        response = await userAPI.update(form.id, form as unknown as { [key: string]: User });
      } else {
        response = await userAPI.add(form as unknown as { [key: string]: User });
      }
      if (response && response.success) {
        openModal({
          status: 'success',
          action: form.id ? 'update' : 'create',
          message: `Successfully ${form.id ? 'updated' : 'added'} mentor`,
        });
        router.push('/backoffice/manage-user?userType=Mentor');
      } else {
        throw new Error(response?.message || 'API response indicates failure');
      }
    } catch (error) {
      console.error(form.id ? 'Error updating mentor:' : 'Error adding mentor:', error);
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
      numberOfChildren: null,
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
    showAlertModal,
    setShowAlertModal,
    setIsConfirmed,
    openModal,
    handleNPWPChange,
    handleNIKChange,
    handlePhoneChange,
    handleEmergencyContactChange,
    handleGPAChange,
    showPassword,
    togglePasswordVisibility,
    handleNumberOfChildrenChange,
    handleZipCodeChange,
  };
};

export const Mentor: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const mentorFormProps = useMentorForm(id);

  return (
    <ToasterProvider>
      <MentorView {...mentorFormProps} />
    </ToasterProvider>
  );
};
