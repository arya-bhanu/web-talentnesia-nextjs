import React from 'react';
import MentorView from './Mentor.view';
import { Mentor } from './mentor.type';

interface MentorProps {
  mentors: Mentor[];
}

const MentorComponent: React.FC<MentorProps> = ({ mentors }) => {
  return <MentorView mentorData={mentors} />;
};

export default MentorComponent;
