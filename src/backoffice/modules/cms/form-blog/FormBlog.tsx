"use client"
import React from 'react';
import FormBlogView from './FormBlog.view';
import { useSearchParams } from 'next/navigation';

const FormBlog = () => {
  const params = useSearchParams();
  const id = params.get('id');
  return <FormBlogView id={id} />;
};

export default FormBlog;
