import React from 'react';
import PersonalNotesView from './PersonalNotes.view';
import { personalNotesData } from './personalNotes.data';

const PersonalNotes: React.FC = () => {
  return <PersonalNotesView notes={personalNotesData} />;
};

export default PersonalNotes;
