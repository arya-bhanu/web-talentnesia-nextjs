import LabelForm from '@/backoffice/components/label-form/LabelForm';
import { Label } from 'flowbite-react';
import { Radio } from 'flowbite-react/components/Radio';
import { TextInput } from 'flowbite-react/components/TextInput';
import React from 'react';

const ManageModulCreateView = () => {
  return (
    <form action="" className="">
      <div className="flex items-center">
        <div className="flex-1">
          <div className="max-w-md">
            <div className="mb-2 block">
              <LabelForm aria-required htmlFor="modul" isImportant>
                Modul Name
              </LabelForm>
            </div>
            <TextInput
              id="modul"
              type="text"
              placeholder="UI/UX Designer"
              required
            />
          </div>
        </div>
        <fieldset className="flex flex-1 flex-col gap-4">
          <legend className="mb-4">
            <LabelForm isImportant>Status</LabelForm>
          </legend>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Radio id="active" name="status" value="active" defaultChecked />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="inactive" name="status" value="inactive" />
              <Label htmlFor="inactive">Inactive</Label>
            </div>
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export default ManageModulCreateView;
