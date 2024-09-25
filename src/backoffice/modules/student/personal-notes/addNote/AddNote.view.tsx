'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import styles from './AddNoteView.module.css';
import LabelForm from '@/backoffice/components/label-form';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading...</p> });
import { personalNoteAPI } from '../api/personalNotesApi';
import { decodeToken } from '@/lib/tokenDecoder';

const AddNoteView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');
  const [isEditMode, setIsEditMode] = useState(!!noteId);
  const [noteTitle, setNoteTitle] = useState('');
  const [course, setCourse] = useState('');
  const [detailNotes, setDetailNotes] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [courses, setCourses] = useState<Array<{ id: string; name: string }>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [CustomToolbar, setCustomToolbar] = useState<React.ComponentType<{ onColorChange: (color: string) => void }> | null>(null);

  interface CourseItem {
    id: string;
    name: string;
  }

  const decodedToken = decodeToken();
  const userId = decodedToken?.userId;

  useEffect(() => {
    import('../components/custom-quill/CustomQuill').then((module) => {
      setCustomToolbar(() => module.default);
    });
  }, []);

  const fetchCourses = useCallback(async (page: number) => {
    const response = await personalNoteAPI.getStudentCourses(page);
    if (response && response.success) {
      const newCourses = response.data.items.map((item: CourseItem) => ({ id: item.id, name: item.name }));
      setCourses(prevCourses => page === 1 ? newCourses : [...prevCourses, ...newCourses]);
      setHasMore(response.data.meta.currentPage < response.data.meta.lastPage);
      setCurrentPage(response.data.meta.currentPage);
    }
  }, []);

  useEffect(() => {
    fetchCourses(1);
    if (isEditMode && noteId) {
      fetchNoteData(noteId);
    }
  }, [fetchCourses, isEditMode, noteId]);

  const fetchNoteData = async (id: string) => {
    const response = await personalNoteAPI.getById(id);
    if (response && response.success) {
      const note = response.data;
      setNoteTitle(note.title);
      setCourse(note.programId);
      setDetailNotes(note.body);
      setSelectedColor(note.color);
    }
  };

  const handleLoadMoreCourses = () => {
    if (hasMore) {
      fetchCourses(currentPage + 1);
    }
  };

  const getRandomColor = () => {
    const colors = ['#ECFDB1', '#C2E7F1', '#CAF6BE', '#F6BECA'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleSave = async () => {
    const noteData = {
      title: noteTitle,
      body: detailNotes,
      programId: course,
      color: selectedColor || getRandomColor(),
      userId: userId,
    };

    try {
      let response;
      if (isEditMode && noteId) {
        response = await personalNoteAPI.update(noteId, noteData);
      } else {
        response = await personalNoteAPI.add(noteData);
      }

      if (response && response.success) {
        setIsNavigating(true);
        setTimeout(() => {
          router.push('/student/personal-notes');
        }, 300);
      } else {
        console.error('Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleCancel = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <div className={`p-6 mx-auto bg-white rounded-md transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Note' : 'Add New Note'}</h2>
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
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          {hasMore && (
            <button onClick={handleLoadMoreCourses} className="mt-2 text-sm text-blue-500">
              Load more courses
            </button>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="detailNotes" className="block text-sm font-medium text-gray-700">
          Detail Notes
        </label>
        {CustomToolbar && <CustomToolbar onColorChange={setSelectedColor} />}
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
