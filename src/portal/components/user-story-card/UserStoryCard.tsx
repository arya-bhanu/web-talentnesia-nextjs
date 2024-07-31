'use client';

import React, { useState } from 'react';
import UserStoryCardView from './UserStoryCard.view';
import clsx from 'clsx';

const UserStoryCard: React.FC<{ className?: string }> = ({ className }) => {
  const [activeNumber, setActiveNumber] = useState(0);
  return (
    <UserStoryCardView
      className={clsx(
        className,
        'relative bg-[#E0F7FA] py-5 md:py-10 lg:py-12 xl:py-16 px-5 lg:px-7 xl:px-12 rounded-3xl flex lg:flex-row flex-col gap-5 lg:gap-7',
      )}
      activeNumber={activeNumber}
      setActiveNumber={setActiveNumber}
    />
  );
};

export default UserStoryCard;
