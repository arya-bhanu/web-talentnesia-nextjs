'use client';

import React, { useEffect, useState } from 'react';
import PersonalNotesView from './PersonalNotes.view';
import { personalNoteAPI } from './api/personalNotesApi';
import { PersonalNoteProps } from './personalNotes.type';

const PersonalNotes: React.FC = () => {
  const [notes, setNotes] = useState<PersonalNoteProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await personalNoteAPI.get(1);
        if (response && response.success) {
          setNotes(response.data.items);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <PersonalNotesView initialNotes={notes} />;

};

export default PersonalNotes;
