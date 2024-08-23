import PersonalNotesView from '@/backoffice/modules/student/personal-notes/PersonalNotes.view';
import { personalNotesData } from '@/backoffice/modules/student/personal-notes/personalNotes.data';

const PersonalNotesPage = () => {
  return (
    <>
      <PersonalNotesView notes={personalNotesData} />
    </>
  );
};

export default PersonalNotesPage;
