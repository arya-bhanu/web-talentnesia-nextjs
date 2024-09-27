import React from 'react';
import MentorView from './Mentor.view';
import { Mentor } from './mentor.type';

interface MentorProps {
  mentors: Mentor[];
  className?: string;
}

const MentorComponent: React.FC<MentorProps> = ({ mentors, className }) => {
  return <MentorView mentorData={mentors} className={className} />;
};

export default MentorComponent;
