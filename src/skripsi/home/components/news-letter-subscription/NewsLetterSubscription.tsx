import React from 'react';
import NewsLetterSubscriptionSectionView from './NewsLetterSubscription.view';
import { IContentNewsLetter } from './newsLetterSubscription.type';

const NewsLetterSubscription = ({
  className,
  isLoading,
  dataContent,
}: {
  className?: string;
  isLoading?: boolean;
  dataContent: IContentNewsLetter;
}) => {
  return (
    <NewsLetterSubscriptionSectionView
      className={className}
      heading={dataContent.heading}
      subheading={dataContent.subheading}
      isLoading={isLoading}
    />
  );
};

export default NewsLetterSubscription;
