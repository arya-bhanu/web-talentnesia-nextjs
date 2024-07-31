import UserStoryCard from '@/portal/components/user-story-card/UserStoryCard';
import React from 'react';

const UserStorySectionView = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <UserStoryCard />
    </section>
  );
};

export default UserStorySectionView;
