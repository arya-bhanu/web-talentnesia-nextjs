import React from 'react';
import { TextInput } from 'flowbite-react/components/TextInput';
import LabelForm from '@/backoffice/components/label-form/LabelForm';
import clsx from 'clsx';
import ReactQuill from 'react-quill';
import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';
import Link from 'next/link';
import { Select } from 'flowbite-react/components/Select';
import { CampaignPayload, Discount, FormErrors } from './formCampaign.type';
import Image from 'next/image';
import { Component as Datepicker } from '@/backoffice/modules/cms/components/datepicker/Datepicker';

const CalendarIcon = (
  <Image
    src="/img/manage-user/calendar.svg"
    width={25}
    height={24}
    alt="Calendar"
  />
);

export interface IFormCampaignView {
  id: string | null;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (name: string, value: string | number | Date) => void;
  formData: CampaignPayload;
  discounts: Discount[];
  errors: FormErrors;
  onFileChange: (fileUrl: string) => void;
  fullImageUrl: string;
  showAlertModal: boolean;
  setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDiscount: Discount | null;
}

const FormCampaignView: React.FC<IFormCampaignView> = ({
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
  discounts,
  selectedDiscount
}) => {
  return (
    <form className="grid grid-cols-2 gap-6" onSubmit={onSubmit}>
      <h1 className="col-span-2 text-2xl font-bold mb-4">
        {id ? "Edit Campaign" : "Add Campaign"}
      </h1>

      <div className="col-span-1">
        <LabelForm isImportant htmlFor="cover_image">Cover Image</LabelForm>
        <DropFile
          onChange={onFileChange}
          initialImage={fullImageUrl || ''}
          uploadFolder='cms/campaign'
        />
      </div>

      <div className="col-span-1"></div>

      <div>
        <LabelForm isImportant htmlFor="campaign_title">
          Campaign Title
        </LabelForm>
        <TextInput
          id="campaign_title"
          name="campaign_title"
          placeholder="Campaign Title"
          required
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      <div>
        <LabelForm isImportant htmlFor="discount">Discount</LabelForm>
        <Select 
          id="discount" 
          name="discountId" 
          required
          value={formData.discountId}
          onChange={(e) => onChange('discountId', e.target.value)}
        >
          <option value="" disabled>Select discount</option>
          {discounts.map((discount) => (
            <option key={discount.id} value={discount.id}>
              {discount.name} ({discount.percentage}%)
            </option>
          ))}
        </Select>
      </div>

      <div>
        <LabelForm isImportant htmlFor="start_date">
          Start Date
        </LabelForm>
        <Datepicker
          id="startDate"
          onChange={(date: Date | null) => {
            const customEvent = {
              target: {
                name: 'startDate',
                value: date ? date.toISOString().split('T')[0] : '',
              },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange('startDate', customEvent.target.value);
          }}
          value={formData.startDate ? new Date(formData.startDate) : null}
          placeholder="Select Start Date"
        />
      </div>

      <div>
        <LabelForm isImportant htmlFor="end_date">
          End Date
        </LabelForm>
        <Datepicker
          id="endDate"
          onChange={(date: Date | null) => {
            const customEvent = {
              target: {
                name: 'endDate',
                value: date ? date.toISOString().split('T')[0] : '',
              },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange('endDate', customEvent.target.value);
          }}
          value={formData.endDate ? new Date(formData.endDate) : null}
          placeholder="Select End Date"
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
              onChange={(e) => onChange('status', Number(e.target.value))}
              className="form-radio w-6 h-6"
            />
            <span className="ml-2">Not Started</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="1"
              checked={formData.status === 1}
              onChange={(e) => onChange('status', Number(e.target.value))}
              className="form-radio w-6 h-6"
            />
            <span className="ml-2">On Going</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="2"
              checked={formData.status === 2}
              onChange={(e) => onChange('status', Number(e.target.value))}
              className="form-radio w-6 h-6"
            />
            <span className="ml-2">Finished</span>
          </label>
        </div>
      </div>

      <div id="richtext" className={clsx('col-span-2 h-48')}>
        <LabelForm htmlFor="content" isImportant className="w-fit">
          Campaign Details
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
        >
          Submit
        </button>
      </div>

      <AlertModal
        openModal={showAlertModal}
        setOpenModal={setShowAlertModal}
        setIsConfirmed={setIsConfirmed}
        messageText={`Are you sure you want to ${id ? 'edit' : 'add'} this campaign?`}
      />
    </form>
  );
};

export default FormCampaignView;
