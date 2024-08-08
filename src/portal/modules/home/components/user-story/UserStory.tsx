import React from 'react';
import UserStorySectionView from './UserStory.view';
import { Testimonials } from '@/portal/components/user-story-card/userStoryCard.type';

const UserStory: React.FC<{
  className?: string;
  testimonials: Testimonials[];
}> = ({ className, testimonials }) => {
  return (
    <UserStorySectionView className={className} testimonials={testimonials} />
  );
};

export default UserStory;
