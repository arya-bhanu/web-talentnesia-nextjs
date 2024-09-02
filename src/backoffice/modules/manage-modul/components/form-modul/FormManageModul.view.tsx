import LabelForm from '@/backoffice/components/label-form';
import { Button } from 'flowbite-react/components/Button';
import { Label } from 'flowbite-react/components/Label';
import { Radio } from 'flowbite-react/components/Radio';
import { TextInput } from 'flowbite-react/components/TextInput';
import Link from 'next/link';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IManageModulForm, ISubmitType } from './formManageModul.type';
import Chapter from '../chapter';
import AlertEditModal from '@/backoffice/components/alert-edit-modal';

const FormManageModulView: React.FC<
  IManageModulForm &
    ISubmitType & { setSubmitType: Dispatch<SetStateAction<ISubmitType>> }
> = ({ handleSubmitForm, populatedDatas, id, setSubmitType }) => {
  const formRef = useRef(null);
  const [editModalActive, setEditModalActive] = useState(false);
  const [isEditConfrm, setIsEditConfrm] = useState(false);
  useEffect(() => {
    const form = formRef.current;
    if (isEditConfrm && form) {
      (form as HTMLFormElement).requestSubmit();
      setSubmitType({ type: 'defaultSubmit' });
    }
  }, [isEditConfrm]);
  return (
    <section>
      <AlertEditModal
        openModal={editModalActive}
        setOpenModal={setEditModalActive}
        setIsConfirmed={setIsEditConfrm}
      />
      <form ref={formRef} onSubmit={handleSubmitForm} action="" className="">
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
                <Label htmlFor="status-2">Inactive</Label>
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
          >
            <Link className="" href={'/backoffice/manage-modul'}>
              Cancel
            </Link>
          </Button>
          <Button
            onClick={() => setEditModalActive(true)}
            type="button"
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
