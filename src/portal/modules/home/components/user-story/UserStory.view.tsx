'use client';

import UserStoryCard from '@/portal/components/user-story-card/UserStoryCard';
import React, { useState } from 'react';
import { UserStorySectionViewProps } from './userStory.type';

const UserStorySectionView: React.FC<UserStorySectionViewProps> = ({
  className,
  testimonials,
  isLoading
}) => {
  const [activeNumber, setActiveNumber] = useState(0);
  return (
    <section className={className}>
      <UserStoryCard
        testimonials={testimonials || []}
        activeNumber={activeNumber}
        setActiveNumber={setActiveNumber}
        isLoading={isLoading}
      />
    </section>
  );
};

export default UserStorySectionView;
