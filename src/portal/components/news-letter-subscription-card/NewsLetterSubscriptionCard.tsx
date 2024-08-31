// file: NewsLetterSubscriptionCard.tsx

import React from 'react';
import NewsLetterSubscriptionCardView from './NewsLetterSubscriptionCard.view';
import { IButtonProps, IColorProps } from './newsLetterSubscriptionCard.type';
import { Island_Moments } from 'next/font/google';

const NewsLetterSubscriptionCard = ({
  title,
  subTitle,
  actionButton,
  color,
  isLoading
}: {
  title: string;
  subTitle: string;
  actionButton: IButtonProps;
  color: IColorProps;
  isLoading?: boolean;
}) => {
  return (
    <NewsLetterSubscriptionCardView
      title={title}
      subTitle={subTitle}
      actionButton={actionButton}
      color={color}
      isLoading={isLoading}
    />
  );
};

export default NewsLetterSubscriptionCard;
