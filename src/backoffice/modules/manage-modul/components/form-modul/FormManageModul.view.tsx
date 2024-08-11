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
                defaultValue={populatedDatas?.name}
                key={populatedDatas?.id}
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
                  value={1}
                  defaultChecked={
                    populatedDatas ? populatedDatas.active === 1 : true
                  }
                  key={populatedDatas?.active}
                />
                <Label htmlFor="status-1">Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="status-2"
                  name="status"
                  value={0}
                  defaultChecked={
                    populatedDatas ? populatedDatas.active === 0 : false
                  }
                  key={populatedDatas?.active}
                />
                <Label htmlFor="status-2">Inactive</Label>
              </div>
            </div>
          </div>
        </div>
        <Chapter className="mt-10" />
      </form>
    </section>
  );
};

export default FormManageModulView;
