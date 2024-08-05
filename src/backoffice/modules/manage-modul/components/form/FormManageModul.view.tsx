import LabelForm from '@/backoffice/components/label-form';
import { Button } from 'flowbite-react/components/Button';
import { Label } from 'flowbite-react/components/Label';
import { Radio } from 'flowbite-react/components/Radio';
import { TextInput } from 'flowbite-react/components/TextInput';
import Link from 'next/link';
import React from 'react';
import { IManageModulForm } from './formManageModul.type';
import Chapter from '../chapter';

const FormManageModulView: React.FC<IManageModulForm> = ({
  handleSubmitForm,
  populatedDatas,
}) => {
  return (
    <section>
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
                id="modul"
                name="modul"
                type="text"
                placeholder="UI/UX Designer"
                required
                defaultValue={populatedDatas?.modulName}
                key={populatedDatas?.modulName}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <LabelForm isImportant>Status</LabelForm>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Radio
                  id="status-1"
                  name="status"
                  value="active"
                  defaultChecked={
                    populatedDatas ? populatedDatas.status === 'active' : true
                  }
                  key={populatedDatas?.status}
                />
                <Label htmlFor="status-1">Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="status-2"
                  name="status"
                  value="inactive"
                  defaultChecked={
                    populatedDatas
                      ? populatedDatas.status === 'inactive'
                      : false
                  }
                  key={populatedDatas?.status}
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
      <Chapter className='mt-10' />
    </section>
  );
};

export default FormManageModulView;
