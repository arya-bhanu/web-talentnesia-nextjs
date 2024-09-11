import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput';
import LabelForm from '@/backoffice/components/label-form/LabelForm';
import clsx from 'clsx';
import { Select } from 'flowbite-react/components/Select';
import { TextInput } from 'flowbite-react/components/TextInput';
import React from 'react';
import ReactQuill from 'react-quill';

export interface IFormBlogView {
  id: string | null;
}
const FormBlogView: React.FC<IFormBlogView> = ({ id }) => {
  console.log(id);
  return (
    <form className="grid grid-cols-2 gap-6">
      <div className="col-span-1">
        <LabelForm htmlFor="cover_image">Cover Image</LabelForm>
        {DropFile()}{' '}
        {/* Menggunakan komponen dropFile yang sudah dimodifikasi */}
      </div>
      <div className="col-span-1"></div>
      <div>
        <LabelForm isImportant htmlFor="program_name">
          Judul Blog
        </LabelForm>
        <TextInput
          id="blog_title"
          name="blog_title"
          placeholder="Judul Blog"
          required
        />
      </div>
      <div>
        <LabelForm isImportant htmlFor="program_name">
          Slug
        </LabelForm>
        <TextInput id="slug" name="slug" placeholder="Slug" required />
      </div>
      <div>
        <LabelForm isImportant htmlFor="program_name">
          Tag
        </LabelForm>
        <TextInput id="tag" name="tag" placeholder="Tag" required />
      </div>
      <div className="col-span-1">
        <LabelForm htmlFor="category">Kategori</LabelForm>
        <Select id="category" name="category" required>
          <option value="" disabled selected>
            Select category
          </option>
        </Select>
      </div>
      <div className="col-span-1">
        <LabelForm htmlFor="status">Status</LabelForm>
        <Select id="status" name="status" required>
          <option value="" disabled selected>
            Select status
          </option>
        </Select>
      </div>
      <div id="richtext" className={clsx('col-span-2 h-48')}>
        <LabelForm htmlFor="question" isImportant className="w-fit">
          Detail Blog
        </LabelForm>
        <ReactQuill className='h-24' key={id} onChange={() => {}} />
      </div>
    </form>
  );
};

export default FormBlogView;
