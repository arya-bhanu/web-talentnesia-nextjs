'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from './api/settingApi';
import { getImageUrl } from '../school/api/minioApi';
import { DropFile } from './components/drop-files-input/dropFilesInput';
import Link from 'next/link';
import { DecodedToken, decodeToken } from '@/lib/tokenDecoder';
import Loading from '@/components/loading';
import { useStatusModalStore } from '@/lib/store';
import AlertModal from '@/backoffice/components/alert-modal';
import { UserData } from './setting.type';
import { SettingView } from './Setting.view';

export const Setting = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { openModal } = useStatusModalStore();

  const userId = decodeToken()?.userId || '';

  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });

  const { data: fullImageUrl } = useQuery({
    queryKey: ['profileImage', userData?.profilePicture],
    queryFn: () => getImageUrl(userData?.profilePicture || ''),
    enabled: !!userData?.profilePicture,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updatedData: UserData) =>
      updateUserProfile(userId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', userId] });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    updateProfileMutation.mutate({ ...userData, [name]: value } as UserData);
  };

  const handleFileChange = async (fileUrl: string) => {
    updateProfileMutation.mutate({
      ...userData,
      profilePicture: fileUrl,
    } as UserData);
  };

  useEffect(() => {
    if (isConfirmed) {
      handleConfirm();
      setIsConfirmed(false);
    }
  }, [isConfirmed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAlertModal(true);
  };

  const handleConfirm = () => {
    if (password !== confirmPassword) {
      openModal({
        status: 'error',
        message: 'Passwords do not match',
      });
      return;
    }
    updateProfileMutation.mutate({ ...userData, password } as UserData);
    openModal({
      status: 'success',
      message: 'Profile updated successfully',
      action: 'update',
    });
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <>
      <AlertModal
        openModal={showAlertModal}
        setOpenModal={setShowAlertModal}
        setIsConfirmed={setIsConfirmed}
        messageText="Are you sure you want to update your profile?"
      />
      <SettingView
        userData={userData}
        fullImageUrl={fullImageUrl}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
      />
    </>
  );
};
