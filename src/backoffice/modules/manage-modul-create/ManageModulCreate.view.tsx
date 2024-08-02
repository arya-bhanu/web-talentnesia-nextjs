import LabelForm from '@/backoffice/components/label-form/LabelForm';
import { Button, Label } from 'flowbite-react';
import { Radio } from 'flowbite-react/components/Radio';
import { TextInput } from 'flowbite-react/components/TextInput';
import React from 'react';
import { IManageModulCreate } from './manageModulCreate.type';
import Link from 'next/link';

const ManageModulCreateView: React.FC<IManageModulCreate> = ({
  handleSubmitForm,
  onChangeSelectedStatus,
  onChangeModulName,
  state,
}) => {
  return (
    <form onSubmit={handleSubmitForm} action="" className="">
      <div className="flex items-center">
        <div className="flex-1">
          <div className="max-w-md">
            <div className="mb-2 block">
              <LabelForm aria-required htmlFor="modul" isImportant>
                Modul Name
              </LabelForm>
            </div>
            <TextInput
              onChange={onChangeModulName}
              id="modul"
              type="text"
              placeholder="UI/UX Designer"
              required
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <LabelForm isImportant>Status</LabelForm>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Radio
                onChange={onChangeSelectedStatus}
                id="status-1"
                name="status"
                value="active"
                checked={state.status === 'active'}
              />
              <Label htmlFor="status-1">Active</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                onChange={onChangeSelectedStatus}
                id="status-2"
                name="status"
                value="inactive"
                checked={state.status === 'inactive'}
              />
              <Label htmlFor="status-2">Inactive</Label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-7 justify-end">
        <Button
          type="button"
          outline
          className="border transition-none delay-0 border-[#F04438] text-[#F04438] outline-transparent bg-transparent enabled:hover:bg-[#F04438] enabled:hover:text-white"
        >
          <Link className="" href={'/backoffice/manage-modul'}>
            Cancel
          </Link>
        </Button>
        <Button
          type="submit"
          color={'warning'}
          className="bg-[#FFC862] text-black"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ManageModulCreateView;
