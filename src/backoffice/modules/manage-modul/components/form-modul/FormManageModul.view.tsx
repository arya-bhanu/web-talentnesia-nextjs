import LabelForm from '@/backoffice/components/label-form';
import { Button } from 'flowbite-react/components/Button';
import { Label } from 'flowbite-react/components/Label';
import { Radio } from 'flowbite-react/components/Radio';
import { TextInput } from 'flowbite-react/components/TextInput';
import Link from 'next/link';
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IManageModulForm, ISubmitType } from './formManageModul.type';
import Chapter from '../chapter';
import AlertModal from '@/backoffice/components/alert-modal';

const FormManageModulView: React.FC<
  IManageModulForm &
    ISubmitType & { setSubmitType: Dispatch<SetStateAction<ISubmitType>> }
> = ({ handleSubmitForm, populatedDatas, id, setSubmitType }) => {
  const formRef = useRef(null);
  const [editModalActive, setEditModalActive] = useState(false);
  const [isEditConfrm, setIsEditConfrm] = useState(false);
  return (
    <section>
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmitForm(e, 'addContent')}
        action=""
        className=""
      >
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
                defaultValue={populatedDatas?.data?.name}
                key={populatedDatas?.data?.name}
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
                    populatedDatas?.data
                      ? populatedDatas.data?.active === 1
                      : true
                  }
                  key={populatedDatas?.data?.active}
                />
                <Label htmlFor="status-1">Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="status-2"
                  name="status"
                  value={0}
                  defaultChecked={
                    populatedDatas?.data
                      ? populatedDatas.data?.active === 0
                      : false
                  }
                  key={populatedDatas?.data?.active}
                />
                <Label htmlFor="status-2">Non Active</Label>
              </div>
            </div>
          </div>
        </div>
        <Chapter
          data={{
            chapters: populatedDatas?.data?.chapters,
            isLoading: populatedDatas?.isLoading,
          }}
        />
        <div className="flex gap-5 w-fit ml-auto mt-14">
          <Button
            type="button"
            outline
            className="border transition-none delay-0 border-[#F04438] text-[#F04438] outline-transparent bg-transparent enabled:hover:bg-[#F04438] enabled:hover:text-white"
            onClick={() => (window.location.href = '/backoffice/manage-modul')}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setSubmitType({ type: 'nextSubmit' });
              const formElement = e.currentTarget.closest('form');
              if (formElement) {
                const formEvent = new Event('submit', {
                  bubbles: true,
                  cancelable: true,
                }) as unknown as FormEvent<HTMLFormElement>;
                handleSubmitForm(formEvent, 'edit');
              }
            }}
            type="submit"
            color={'warning'}
            className="bg-[#FFC862] text-black"
          >
            {id ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default FormManageModulView;
