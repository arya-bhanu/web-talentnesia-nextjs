import React from 'react';
import ManageModulView from './ManageModul.view';
import { revalidateTag } from 'next/cache';

export const revalidate = 1;

export const dynamic = true;

const ManageModul = async () => {
  let data = await fetch(`${process.env.API_SKRIPSI}/backoffice/modul`, {
    next: { tags: ['modules'] },
    cache: 'no-store',
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

  const testRevalidate = async () => {
    'use server';
    setInterval(async () => {
      await fetch(`${process.env.API_SKRIPSI}/backoffice/modul/refresh`, {
        method: 'POST',
      });
      revalidateTag('modules');
    }, 1000);
  };

  const handleStartExperiment = async () => {
    'use server';
    testRevalidate();
    fetch(`${process.env.API_SKRIPSI}/backoffice/modul/test`, {
      method: 'POST',
    });
  };

  return (
    <ManageModulView
      handleStartExperiment={handleStartExperiment}
      data={posts}
      handleDeleteModulSubmit={handleDeleteModulSubmit}
      revalidateFunc={testRevalidate}
    />
  );
};

export default ManageModul;
