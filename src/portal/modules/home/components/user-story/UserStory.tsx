import React from 'react';
import UserStorySectionView from './UserStory.view';
import { Testimonials } from '@/portal/components/user-story-card/userStoryCard.type';
import { Island_Moments } from 'next/font/google';

const UserStory: React.FC<{
  className?: string;
  testimonials: Testimonials[];
  isLoading?: boolean;
}> = ({ className, testimonials, isLoading }) => {
  return (
    <UserStorySectionView className={className} testimonials={testimonials || []} isLoading={isLoading}/>
  );
};

export default UserStory;
