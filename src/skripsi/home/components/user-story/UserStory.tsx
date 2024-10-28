import React from 'react';
import UserStorySectionView from './UserStory.view';
import { IDataUserStory } from './userStory.type';

const UserStory: React.FC<{
  className?: string;
  dataUserStory: IDataUserStory;
  isLoading?: boolean;
}> = ({ className, dataUserStory, isLoading }) => {
  return (
    <UserStorySectionView
      className={className}
      stories={dataUserStory.stories}
      isLoading={isLoading}
      heading={dataUserStory.heading}
    />
  );
};

export default UserStory;
