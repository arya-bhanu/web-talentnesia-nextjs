import React from 'react';
import ManageModulView from './ManageModul.view';
import { revalidateTag } from 'next/cache';

const ManageModul = async () => {
  let data = await fetch(`${process.env.API_SKRIPSI}/backoffice/modul`, {
    next: { tags: ['modules'], revalidate: 1500 },
  });
  let posts = await data.json();
  const handleDeleteModulSubmit = async (formData: FormData) => {
    'use server';
    const defaultId = formData.get('default_id');
    try {
      await fetch(`${process.env.API_SKRIPSI}/backoffice/modul/${defaultId}`, {
        method: 'DELETE',
      });
      revalidateTag('modules');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ManageModulView
      data={posts}
      handleDeleteModulSubmit={handleDeleteModulSubmit}
    />
  );
};

export default ManageModul;
