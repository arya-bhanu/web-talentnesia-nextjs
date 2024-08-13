"use client";

import { useState } from "react";
import { Button, Label, TextInput, Radio, Card } from "flowbite-react";
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import MentorSelector from '@/backoffice/components/mentor-selector/mentorSelector';
import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput';  // Mengimpor dropFile
import { HiCalendar } from "react-icons/hi";
import LabelForm from '@/backoffice/components/label-form';

function ProgramForm() {
  const [mentors, setMentors] = useState(["Mentor 1", "Mentor 2"]);
  const [status, setStatus] = useState("On Going");

  const handleMentorChange = (mentor: string) => {
    setMentors((prev) =>
      prev.includes(mentor)
        ? prev.filter((m) => m !== mentor)
        : [...prev, mentor]
    );
  };

  const tabs = [
    {
      title: "Detail",
      content: (
        <div className="grid grid-cols-2 gap-6">
          {/* Program Name */}
          <div>
          <LabelForm isImportant htmlFor="program_name">
            Program Name
          </LabelForm>
            <TextInput id="programName" placeholder="Kelas D Tefa SMK" required />
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
                checked={status === "Not Started"}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Label htmlFor="notStarted" value="Not Started" />
              <Radio
                id="onGoing"
                name="status"
                value="On Going"
                checked={status === "On Going"}
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
            {DropFile()} {/* Menggunakan komponen dropFile yang sudah dimodifikasi */}
          </div>

          {/* Date Picker */}
          <div>
            <LabelForm isImportant htmlFor="start_date">
            Start Date
          </LabelForm>
            <TextInput id="startDate" placeholder="28 Maret 2023" icon={HiCalendar} required />
          </div>
          <div>
            <LabelForm isImportant htmlFor="ned_date">
            End Date
          </LabelForm>
            <TextInput id="endDate" placeholder="28 Juni 2023" icon={HiCalendar} required />
          </div>

          {/* School */}
          <div className="col-span-2">
            <LabelForm htmlFor="program_name">School</LabelForm>
            <TextInput id="school" placeholder="Select School" />
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
      title: "Course",
      content: (
        <div>
          {/* Content for Course Tab */}
        </div>
      ),
    },
    {
      title: "Student",
      content: (
        <div>
          {/* Content for Student Tab */}
        </div>
      ),
    },
  ];

  return (
    <Card>
      <TabFlex tabs={tabs} />
    </Card>
  );
}

export default ProgramForm;
