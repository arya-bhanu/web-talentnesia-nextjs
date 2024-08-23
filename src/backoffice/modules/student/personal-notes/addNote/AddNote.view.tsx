'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import CustomToolbar from '../components/custom-quill/CustomQuill';
import styles from './AddNoteView.module.css';
import LabelForm from '@/backoffice/components/label-form';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { courseData } from '../../course/studentCourse.data';

const AddNoteView: React.FC = () => {
  const [noteTitle, setNoteTitle] = useState('');
  const [course, setCourse] = useState('');
  const [detailNotes, setDetailNotes] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const courseOptions = courseData.map((course) => (
    <option key={course.title} value={course.title}>
      {course.title}
    </option>
  ));

  const handleSave = () => {
    // Function to handle saving the note
    // This is where you'd handle the form submission, e.g., saving the note to localStorage or sending it to a backend.
  };

  const handleCancel = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <div className={`p-6 mx-auto bg-white rounded-md transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <LabelForm isImportant htmlFor="notes_title">
            Notes Title
          </LabelForm>
          <input
            type="text"
            id="noteTitle"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex-1">
          <LabelForm isImportant htmlFor="course">
            Course
          </LabelForm>
          <select
            id="course"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            {courseOptions}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="detailNotes" className="block text-sm font-medium text-gray-700">
          Detail Notes
        </label>
        <CustomToolbar />
        <ReactQuill
          value={detailNotes}
          onChange={setDetailNotes}
          className="h-35 mb-3"
          theme="snow"
          modules={{ toolbar: '#toolbar' }}
        />
      </div>
      <div className="flex justify-end mt-10">
        <button
          onClick={handleCancel}
          className="flex items-center focus:outline-none text-[#323232] border-[#FFC862] hover:bg-[#FFC862] border-2 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
        >
          <span className="text-black-xl font-semibold w-[100px] h-[25px] text-center ">Cancel</span>
        </button>
        <button
          onClick={handleSave}
          className="flex items-center focus:outline-none text-[#323232] bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-transparent font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
        >
          <span className="text-black-xl font-semibold w-[100px] h-[25px] text-center ">Save</span>
        </button>
      </div>
    </div>
  );
};

export default AddNoteView;
