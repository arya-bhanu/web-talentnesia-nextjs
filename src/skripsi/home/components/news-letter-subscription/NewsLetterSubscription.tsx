import React from 'react';
import NewsLetterSubscriptionSectionView from './NewsLetterSubscription.view';

const NewsLetterSubscription = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return <NewsLetterSubscriptionSectionView className={className} isLoading={isLoading} />;
};

export default NewsLetterSubscription;
