import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput';
import LabelForm from '@/backoffice/components/label-form';
import MentorSelector from '@/backoffice/components/mentor-selector/mentorSelector';
import { Label, Radio, TextInput } from 'flowbite-react';
import { Button } from 'flowbite-react/components/Button';
import { Datepicker } from 'flowbite-react/components/Datepicker';
import { Select } from 'flowbite-react/components/Select';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import {
  IFormDetail,
  IHandleFormDetail,
  IStateFormDetail,
} from './formDetail.type';
import { useFormDetailStore } from './formDetail.store';
import { Mentor } from '@/backoffice/components/mentor-selector/mentorSelector.type';

const FormDetailView: React.FC<
  IFormDetail & IHandleFormDetail & IStateFormDetail
> = ({ programId, handleSubmitForm, isLoadingMentors }) => {
  const [selectedMentors, setSelectedMentors] = useState<Mentor[]>([]);
  const { data, setData, defaultMentors, defaultSchools, defaultData } =
    useFormDetailStore();

  useEffect(() => {
    if (selectedMentors) {
      const { mentors, ...rest } = data;
      setData({ ...rest, mentors: selectedMentors });
    }
  }, [selectedMentors]);

  useEffect(() => {
    if (defaultData?.mentors && defaultMentors) {
      setSelectedMentors(
        defaultMentors.filter((el) => defaultData?.mentors.includes(el.id)),
      );
    }
  }, [JSON.stringify(defaultData?.mentors), JSON.stringify(defaultMentors)]);

  return (
    <form onSubmit={handleSubmitForm} className="grid grid-cols-2 gap-6">
      {/* Program Name */}
      <div>
        <LabelForm isImportant htmlFor="program_name">
          Program Name
        </LabelForm>
        <TextInput
          id="program_name"
          name="program_name"
          defaultValue={defaultData?.name}
          key={defaultData?.name}
          placeholder="Kelas D Tefa SMK"
          required
        />
      </div>

      {/* Status */}
      <div>
        <LabelForm isImportant htmlFor="status">
          Status
        </LabelForm>
        <div className="flex items-center space-x-4">
          <Radio
            id="notStarted"
            defaultChecked={
              defaultData ? (defaultData.active == 0 ? true : false) : false
            }
            key={defaultData.active + '_0'}
            name="active"
            value="0"
          />
          <Label htmlFor="notStarted" value="Not Started" />
          <Radio
            id="onGoing"
            defaultChecked={
              defaultData ? (defaultData.active == 1 ? true : false) : true
            }
            key={defaultData.active + '_1'}
            name="active"
            value="1"
          />
          <Label htmlFor="onGoing" value="On Going" />
        </div>
      </div>

      {/* Mentor Selector */}
      <div className="col-span-1">
        <LabelForm isImportant htmlFor="mentor">
          Mentor
        </LabelForm>
        <MentorSelector
          defaultMentors={defaultMentors}
          selectedMentors={data.mentors}
          setSelectedMentors={setSelectedMentors}
        />
      </div>

      {/* Cover Image */}
      <div className="col-span-1">
        <LabelForm htmlFor="cover_image">Cover Image</LabelForm>
        {DropFile()}{' '}
        {/* Menggunakan komponen dropFile yang sudah dimodifikasi */}
      </div>

      {/* Date Picker */}
      <div>
        <LabelForm isImportant htmlFor="start_date">
          Start Date
        </LabelForm>
        <Datepicker
          defaultDate={
            defaultData && defaultData.startDate !== ''
              ? moment(defaultData.startDate).toDate()
              : new Date()
          }
          key={defaultData?.startDate}
          // defaultDate={new Date()}
          id="start_date"
          name="start_date"
        />
      </div>
      <div>
        <LabelForm isImportant htmlFor="end_date">
          End Date
        </LabelForm>
        <Datepicker
          defaultDate={
            defaultData && defaultData.endDate !== ''
              ? moment(defaultData.endDate).toDate()
              : new Date()
          }
          key={defaultData?.startDate}
          id="end_date"
          name="end_date"
        />
      </div>

      {/* School */}
      <div className="col-span-2">
        <LabelForm htmlFor="school">School</LabelForm>
        <Select
          defaultValue={
            defaultData ? (defaultData.institutionId as string | undefined) : ''
          }
          id="school"
          name="school"
          required
        >
          <option value="" disabled>
            Select School
          </option>
          {defaultSchools.map((el) => {
            return (
              <option
                selected={
                  defaultData ? defaultData.institutionId == el.id : false
                }
                key={el.id}
                value={el.id}
              >
                {el.name}
              </option>
            );
          })}
        </Select>
      </div>

      {/* Buttons */}
      <div className="col-span-2 flex justify-end space-x-4 mt-10">
        <Button
          type="button"
          outline
          className="border transition-none delay-0 border-[#F04438] text-[#F04438] outline-transparent bg-transparent enabled:hover:bg-[#F04438] enabled:hover:text-white"
        >
          <Link className="" href={'/backoffice/manage-program'}>
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

export default FormDetailView;
