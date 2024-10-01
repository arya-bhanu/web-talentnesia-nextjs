import React from 'react';
import { TextInput } from 'flowbite-react/components/TextInput';
import LabelForm from '@/backoffice/components/label-form/LabelForm';
import clsx from 'clsx';
import ReactQuill from 'react-quill';
import Dropdown from '@/backoffice/components/dropdown/Dropdown';
import { categoryAPI } from '../../master-data/category/api/categoryApi';
import { BlogPostPayload, FormErrors } from './formBlog.type';
import TagInput from '@/backoffice/components/tag-input/TagInput';
import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';
import Link from 'next/link';

export interface IFormBlogView {
  id: string | null;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (name: string, value: string | string[]) => void;
  formData: BlogPostPayload;
  errors: FormErrors;
  onFileChange: (fileUrl: string) => void;
  fullImageUrl: string;
  showAlertModal: boolean;
  setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormBlogView: React.FC<IFormBlogView> = ({
  id,
  onSubmit,
  onChange,
  formData,
  errors,
  onFileChange,
  fullImageUrl,
  showAlertModal,
  setShowAlertModal,
  setIsConfirmed,
}) => {

  const handleTagChange = (tags: string[]) => {
    onChange('tags', tags);
  };

  return (
    <form className="grid grid-cols-2 gap-6" onSubmit={onSubmit}>
      <h1 className="col-span-2 text-2xl font-bold mb-4">
        {id ? "Edit Blog" : "Add Blog"}
      </h1>

      <div className="col-span-1">
        <LabelForm isImportant htmlFor="cover_image">Cover Image</LabelForm>
        <DropFile
          onChange={onFileChange}
          initialImage={fullImageUrl || ''}
          uploadFolder='cms/blog'
        />
      </div>

      <div className="col-span-1"></div>

      <div>
        <LabelForm isImportant htmlFor="blog_title">
          Judul Blog
        </LabelForm>
        <TextInput
          id="blog_title"
          name="blog_title"
          placeholder="Judul Blog"
          required
          value={formData.title}
          onChange={(e) => onChange('blog_title', e.target.value)}
        />
      </div>

      <div>
        <LabelForm isImportant htmlFor="slug">
          Slug
        </LabelForm>
        <TextInput
          id="slug"
          name="slug"
          placeholder="Slug"
          required
          value={formData.slug}
          onChange={(e) => onChange('slug', e.target.value)}
        />
        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
      </div>

      <div>
        <LabelForm isImportant htmlFor="tag">
          Tag
        </LabelForm>
        <TagInput
          tags={formData.tags}
          onTagChange={handleTagChange}
        />
      </div>

      <div className="col-span-1">
        <LabelForm isImportant htmlFor="category">Kategori</LabelForm>
        <Dropdown<any>
          onItemSelect={(categoryId) => {
            onChange('categoryId', categoryId);
          }}
          getItems={(limit, offset) => categoryAPI.fetch(offset / limit + 1).then(response => response.items)}
          itemToString={(item) => item.name}
          containerClassName="w-full"
          inputClassName="w-full rounded-lg"
          placeholderText="Pilih Kategori"
          initialValue={formData.categoryName || formData.categoryId}
        />
      </div>

      <div className="col-span-1">
        <LabelForm isImportant htmlFor="status">Status</LabelForm>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="0"
              checked={formData.status === 0}
              onChange={(e) => onChange('status', e.target.value)}
              className="form-radio w-6 h-6"
            />
            <span className="ml-2">draft</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="1"
              checked={formData.status === 1}
              onChange={(e) => onChange('status', e.target.value)}
              className="form-radio w-6 h-6"
            />
            <span className="ml-2">publish</span>
          </label>
        </div>
      </div>

      <div id="richtext" className={clsx('col-span-2 h-48')}>
        <LabelForm htmlFor="content" isImportant className="w-fit">
          Detail Blog
        </LabelForm>
        <ReactQuill
          className="h-24"
          key={id}
          value={formData.content}
          onChange={(content) => onChange('content', content)}
        />
      </div>

      <div className="col-span-2 flex justify-end space-x-4">
        <Link href={'/backoffice/cms'}>
          <button
            type="button"
            className="cancel-button bg-white border-red-500 border-2 text-red-500 py-2 px-4 rounded font-poppins"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="submit-button bg-yellow-400 text-black py-2 px-4 rounded font-poppins"
          disabled={!!errors.slug}
        >
          Submit
        </button>
      </div>

      <AlertModal
        openModal={showAlertModal}
        setOpenModal={setShowAlertModal}
        setIsConfirmed={setIsConfirmed}
        messageText={`Are you sure you want to ${id ? 'edit' : 'add'} this blog post?`}
      />
    </form>
  );
};

export default FormBlogView;
