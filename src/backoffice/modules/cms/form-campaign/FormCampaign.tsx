"use client";
import React, { useState, useEffect } from "react";
import FormCampaignView from "./FormCampaign.view";
import { useSearchParams, useRouter } from "next/navigation";
import { cmsApi } from "../Api/cmsApi";
import { useFormDetailStore } from "@/backoffice/modules/manage-program/form-program/components/form-detail/formDetail.store";
import { CampaignPayload, Discount, FormErrors } from "./formCampaign.type";
import { getImageUrl } from "../../school/api/minioApi";
import { useStatusModalStore } from '@/lib/store';
import { discountAPI } from "../../master-data/discount/api/discountApi";

const FormCampaign = () => {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("Id");
  const [formData, setFormData] = useState<CampaignPayload>({
    title: "",
    discountId: "",
    startDate: "",
    endDate: "",
    status: 3,
    content: "",
    image: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { data } = useFormDetailStore();
  const [fullImageUrl, setFullImageUrl] = useState<string>('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { openModal } = useStatusModalStore();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      const response = await discountAPI.getAllDiscounts();
      setDiscounts(response);
    };
    fetchDiscounts();
  }, []);

  useEffect(() => {
    if (id) {
      fetchCampaignData(id);
    }
  }, [id]);

  const fetchCampaignData = async (campaignId: string) => {
    try {
      const response = await cmsApi.showCampaign(campaignId);
      if (response && response.data) {
        setFormData(response.data);
        if (response.data.discountId) {
          const discountResponse = await discountAPI.getById(response.data.discountId);
          setSelectedDiscount(discountResponse);
          setFormData(prevData => ({ ...prevData, discountId: response.data.discountId }));
        }
        if (response.data.image) {
          try {
            const imageUrl = await getImageUrl(response.data.image);
            setFullImageUrl(imageUrl);
          } catch (imageError) {
            console.error('Error fetching image');
            setFullImageUrl('');
          }
        } else {
          setFullImageUrl('');
        }
      }
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    }
  };

  useEffect(() => {
    if (data.image) {
      handleFileChange(data.image);
    }
  }, [data.image]);

  useEffect(() => {
    if (isConfirmed) {
      confirmSubmit();
      setIsConfirmed(false);
    }
  }, [isConfirmed]);

  const handleInputChange = (name: string, value: string | number | Date) => {
    if (name === 'discountId') {
      const selectedDiscount = discounts.find(d => d.id === value);
      setSelectedDiscount(selectedDiscount || null);
    }
    if (value instanceof Date) {
      setFormData((prevData) => ({ ...prevData, [name]: value.toISOString().split('T')[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const requiredFields = [
      'title', 'discountId', 'startDate', 'endDate', 'content', 'image'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof CampaignPayload]);
    
    if (missingFields.length > 0 || formData.status === undefined) {
      openModal({
        status: 'error',
        message: `Please fill in the following required fields: ${missingFields.join(', ')}${formData.status === undefined ? ', Status' : ''}`,
      });
      return;
    }
    
    setShowAlertModal(true);
  };

  const confirmSubmit = async () => {
    setShowAlertModal(false);
    try {
      let response;
      if (id) {
        response = await cmsApi.updateCampaign(id, formData);
      } else {
        response = await cmsApi.addCampaign(formData);
      }
      if (response && response.success) {
        openModal({
          status: 'success',
          action: id ? 'update' : 'create',
          message: `Successfully ${id ? 'updated' : 'added'} campaign`,
        });
        router.push('/backoffice/cms');
      } else {
        throw new Error(response?.message || 'API response indicates failure');
      }
    } catch (error) {
      console.error(id ? "Error updating campaign:" : "Error adding campaign:", error);
      openModal({
        status: 'error',
        message: `Failed to ${id ? 'update' : 'add'} campaign: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`,
      });
    }
  };

  const handleFileChange = async (fileUrl: string) => {
    const fullUrl = await getImageUrl(fileUrl);
    setFormData((prevData) => ({ ...prevData, image: fileUrl }));
    setFullImageUrl(fullUrl);
  };

  return (
    <FormCampaignView
      id={id}
      onSubmit={handleSubmit}
      onChange={handleInputChange}
      formData={formData}
      errors={errors}
      onFileChange={handleFileChange}
      fullImageUrl={fullImageUrl}
      showAlertModal={showAlertModal}
      setShowAlertModal={setShowAlertModal}
      setIsConfirmed={setIsConfirmed}
      discounts={discounts}
      selectedDiscount={selectedDiscount}
    />
  );
};

export default FormCampaign;
