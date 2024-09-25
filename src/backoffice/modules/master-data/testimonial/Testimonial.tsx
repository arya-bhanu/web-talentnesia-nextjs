'use client';

import React, { useState, useCallback, useEffect } from 'react';
import TestimonialView from './Testimonial.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { decodeToken } from '@/lib/tokenDecoder';
import { testimonialAPI } from './api/testimonialApi';
import { useTestimonialActions } from './hooks/useTestimonialAction';
import { TestimonialRequest } from './testimonial.type';


const Testimonial = () => {
  const queryClient = useQueryClient();
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userRole, setUserRole] = useState<number>(NaN);

  const { handleDeleteTestimonial, handleAddTestimonial } = useTestimonialActions();

  useEffect(() => {
    const decodedToken = decodeToken();
    if (decodedToken) {
      setUserRole(decodedToken.role);
    }
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['testimonial'],
    queryFn: async () => {
      const response = await testimonialAPI.fetch();
      return response.data.items;
    },
  });

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['testimonial'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(
    async (id: string, action: 'delete' | 'edit', rowData?: string) => {
      if (action === 'delete') {
        await handleDeleteTestimonial(id);
        fetchData();
      } else if (action === 'edit' && rowData) {
        setSelectedId(id);
        setSelectedId(rowData);
        setIsPopupOpen(true);
      }
    },
    [fetchData, handleDeleteTestimonial],
  );
  

  const handleAdd = useCallback(
    async (data: TestimonialRequest) => {
      await handleAddTestimonial(data)
      fetchData();
      setIsPopupOpen(false);
    },
    [fetchData],
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <TestimonialView
      role={userRole}
      data={data || []}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
      openPopoverIndex={-1}  
      setOpenPopoverIndex={() => {}} 
      handleActionButtonRow={handleActionButtonRow}
      handleAddTestimonial={handleAdd}
    />
  );
  
};


export default Testimonial;
function setSelectedId(id: string) {
  throw new Error('Function not implemented.');
}

