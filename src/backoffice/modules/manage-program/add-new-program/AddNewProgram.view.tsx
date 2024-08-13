'use client';

import { useState } from 'react';
import { Button, Label, TextInput, Radio, Card, Select } from 'flowbite-react';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import MentorSelector from '@/backoffice/components/mentor-selector/mentorSelector';
import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput'; // Mengimpor dropFile
import { HiCalendar } from 'react-icons/hi';
import LabelForm from '@/backoffice/components/label-form';
import { IAddNewProgramView } from './addNewProgram.type';
import dynamic from 'next/dynamic';

const Datepicker = dynamic(
  () =>
    import('@/backoffice/components/datepicker/Datepicker').then(
      (mod) => mod.Component,
    ),
  { ssr: false },
);

function AddNewProgramView({
  mentors,
  setMentors,
  setStatus,
  status,
}: IAddNewProgramView) {
  const handleMentorChange = (mentor: string) => {
    setMentors((prev) =>
      prev.includes(mentor)
        ? prev.filter((m) => m !== mentor)
        : [...prev, mentor],
    );
  };

  const tabs = [
    {
      title: 'Detail',
      content: (
        <div className="grid grid-cols-2 gap-6">
          {/* Program Name */}
          <div>
            <LabelForm isImportant htmlFor="program_name">
              Program Name
            </LabelForm>
            <TextInput
              id="programName"
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
                name="status"
                value="Not Started"
                checked={status === 'Not Started'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Label htmlFor="notStarted" value="Not Started" />
              <Radio
                id="onGoing"
                name="status"
                value="On Going"
                checked={status === 'On Going'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Label htmlFor="onGoing" value="On Going" />
            </div>
          </div>

          {/* Mentor Selector */}
          <div className="col-span-1">
            <LabelForm isImportant htmlFor="mentor">
              Mentor
            </LabelForm>
            <MentorSelector />
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
            <Datepicker />
          </div>
          <div>
            <LabelForm isImportant htmlFor="ned_date">
              End Date
            </LabelForm>
            <Datepicker />
          </div>

          {/* School */}
          <div className="col-span-2">
            <LabelForm htmlFor="school">School</LabelForm>
            <Select id="school" name="school" required>
              <option selected value="" disabled>
                Select School
              </option>
              <option value="1">School 1</option>
              <option value="2">School 2</option>
            </Select>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end space-x-4">
            <Button color="gray">Cancel</Button>
            <Button color="yellow">Submit</Button>
          </div>
        </div>
      ),
      active: true,
    },
    {
      title: 'Course',
      content: <div>{/* Content for Course Tab */}</div>,
    },
    {
      title: 'Student',
      content: <div>{/* Content for Student Tab */}</div>,
    },
  ];

  return (
    <Card>
      <TabFlex tabs={tabs} />
    </Card>
  );
}

export default AddNewProgramView;
