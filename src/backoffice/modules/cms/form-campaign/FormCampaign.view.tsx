import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput';
import LabelForm from '@/backoffice/components/label-form/LabelForm';
import clsx from 'clsx';
import { Label, Radio } from 'flowbite-react';
import { Datepicker } from 'flowbite-react/components/Datepicker';
import { Select } from 'flowbite-react/components/Select';
import { TextInput } from 'flowbite-react/components/TextInput';
import React from 'react';
import ReactQuill from 'react-quill';
export interface IFormCampaignView {
  id: string | null;
}
const FormCampaignView: React.FC<IFormCampaignView> = ({ id }) => {
  return (
    <form className="grid grid-cols-2 gap-6">
      <div className="col-span-1">
        <LabelForm htmlFor="cover_image">Cover Image</LabelForm>
        {/* <DropFile onChange={''} /> */}
      </div>
      <div className="col-span-1"></div>
      <div>
        <LabelForm isImportant htmlFor="campaign_title">
          Campaign Title
        </LabelForm>
        <TextInput
          id="campaign_title"
          name="campaign_title"
          placeholder="Judul Campaign"
          required
        />
      </div>
      <div className="col-span-1">
        <LabelForm htmlFor="Discount">Discount</LabelForm>
        <Select id="discount" name="discount" required>
          <option value="" disabled selected>
            Select discount
          </option>
        </Select>
      </div>
      <div>
        <LabelForm isImportant htmlFor="start_date">
          Start Date
        </LabelForm>
        <Datepicker id="start_date" name="start_date" />
      </div>
      <div>
        <LabelForm isImportant htmlFor="end_date">
          End Date
        </LabelForm>
        <Datepicker id="end_date" name="end_date" />
      </div>
      <div className="col-span-1">
        <LabelForm htmlFor="status">Status</LabelForm>
        <div className="flex items-center gap-3 mt-5">
          <div className="flex items-center gap-2">
            <Radio id="not_started" name="status" value="3" defaultChecked />
            <Label htmlFor="not_started">Not Started</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="on_going" name="status" value="2" />
            <Label htmlFor="on_going">On Going</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="finished" name="status" value="1" />
            <Label htmlFor="finished">Finished</Label>
          </div>
        </div>
      </div>
      <div id="richtext" className={clsx('col-span-2 h-48')}>
        <LabelForm htmlFor="question" isImportant className="w-fit">
          Detail Blog
        </LabelForm>
        <ReactQuill className="h-24" key={id} onChange={() => {}} />
      </div>
    </form>
  );
};

export default FormCampaignView;
