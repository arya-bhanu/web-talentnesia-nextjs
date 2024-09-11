'use client';
import React from 'react';
import FormCampaignView from './FormCampaign.view';
import { useSearchParams } from 'next/navigation';

const FormCampaign = () => {
  const params = useSearchParams();
  const id = params.get('id');
  return <FormCampaignView id={id} />;
};

export default FormCampaign;
