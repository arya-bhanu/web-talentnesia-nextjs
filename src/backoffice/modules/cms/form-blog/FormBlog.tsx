"use client";
import React, { useState, useEffect, useCallback } from "react";
import FormBlogView from "./FormBlog.view";
import { useSearchParams, useRouter } from "next/navigation";
import { cmsApi } from "../Api/cmsApi";
import { categoryAPI } from "../../master-data/category/api/categoryApi";
import { fileHelper } from "@/helpers/file-manager/fileUpload.helper";
import { useFormDetailStore } from "@/backoffice/modules/manage-program/form-program/components/form-detail/formDetail.store";
import { BlogPostPayload, FormErrors } from "./formBlog.type";
import { getImageUrl } from "../../school/api/minioApi";
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';
import { useStatusModalStore } from '@/lib/store';

const FormBlog = () => {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("Id");
  const [formData, setFormData] = useState<BlogPostPayload>({
    title: "",
    content: "",
    status: 0,
    image: "",
    categoryId: "",
    tags: [],
    slug: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { data } = useFormDetailStore();
  const [fullImageUrl, setFullImageUrl] = useState<string>('');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { openModal } = useStatusModalStore();

  useEffect(() => {
    if (id) {
      fetchBlogData(id);
    }
  }, [id]);

  const fetchBlogData = async (blogId: string) => {
    try {
      const response = await cmsApi.show(blogId);
      if (response && response.data) {
        setFormData(response.data);
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
      console.error("Error fetching blog data:", error);
    }
  };

  const loadMoreCategories = useCallback(async () => {
    if (!hasMore) return;

    const newCategories = await categoryAPI.fetch(page);
    if (newCategories && newCategories.items) {
      setCategories((prev) => {
        const uniqueCategories = new Set(
          [...prev, ...newCategories.items].map((cat) => JSON.stringify(cat))
        );
        return Array.from(uniqueCategories).map((cat) => JSON.parse(cat));
      });
      setPage((prev) => prev + 1);
      setHasMore(
        newCategories.meta.currentPage < newCategories.meta.lastPage
      );
    }
  }, [page, hasMore]);

  useEffect(() => {
    loadMoreCategories();
  }, []);

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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const validateSlug = (slug: string) => {
    return /^[a-z0-9-]+$/.test(slug);
  };

  const handleInputChange = (name: string, value: string | string[] | number) => {
    if (name === "blog_title") {
      const generatedSlug = generateSlug(value as string);
      setFormData((prevData) => ({
        ...prevData,
        title: value as string,
        slug: generatedSlug,
      }));
    } else if (name === "slug") {
      setFormData((prevData) => ({ ...prevData, [name]: value as string }));
      if (!validateSlug(value as string)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          slug: "Invalid slug format",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, slug: undefined }));
      }
    } else if (name === "tags") {
      setFormData((prevData) => ({ ...prevData, tags: value as string[] }));
    } else if (name === "status") {
      setFormData((prevData) => ({ ...prevData, [name]: Number(value) }));
    } else if (name === 'categoryId') {
      setFormData((prevData) => ({ ...prevData, categoryId: value as string }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value as string }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const requiredFields = [
      'title', 'content', 'status', 'image', 'categoryId', 'tags', 'slug'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof BlogPostPayload]);
    
    if (missingFields.length > 0) {
      openModal({
        status: 'error',
        message: `Please fill in the following required fields: ${missingFields.join(', ')}`,
      });
      return;
    }
    
    setShowAlertModal(true);
  };
  

  const confirmSubmit = async () => {
    setShowAlertModal(false);
    if (errors.slug) {
      console.error("Cannot submit form with invalid slug");
      return;
    }
    try {
      let response;
      if (id) {
        response = await cmsApi.update(id, formData);
      } else {
        response = await cmsApi.add(formData);
      }
      if (response && response.success) {
        openModal({
          status: 'success',
          action: id ? 'update' : 'create',
          message: `Successfully ${id ? 'updated' : 'added'} blog post`,
        });
        router.push('/backoffice/cms');
      } else {
        throw new Error(response?.message || 'API response indicates failure');
      }
    } catch (error) {
      console.error(id ? "Error updating blog:" : "Error adding blog:", error);
      openModal({
        status: 'error',
        message: `Failed to ${id ? 'update' : 'add'} blog post: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`,
      });
    }
  };
  

  const handleFileChange = async (fileUrl: string) => {
    const fullUrl = await getImageUrl(fileUrl);
    setFormData((prevData) => ({ ...prevData, image: fileUrl }));
    setFullImageUrl(fullUrl);
  };

  return (
    <FormBlogView
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
    />
  );
};

export default FormBlog;
