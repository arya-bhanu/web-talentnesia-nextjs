'use client';

import UserStoryCard from '@/skripsi/home/components/user-story/user-story-card/UserStoryCard';
import React, { useState } from 'react';
import { UserStorySectionViewProps } from './userStory.type';

const UserStorySectionView: React.FC<UserStorySectionViewProps> = ({
  className,
  heading,
  stories,
  isLoading,
}) => {
  const [activeNumber, setActiveNumber] = useState(0);
  return (
    <section className={className}>
      <UserStoryCard
        heading={heading}
        activeNumber={activeNumber}
        setActiveNumber={setActiveNumber}
        isLoading={isLoading}
        story={stories}
      />
    </section>
  );
};

export default UserStorySectionView;
