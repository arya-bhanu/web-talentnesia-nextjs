// file: NewsLetterSubscriptionCard.tsx

import React from 'react';
import NewsLetterSubscriptionCardView from './NewsLetterSubscriptionCard.view';
import { IButtonProps, IColorProps } from './newsLetterSubscriptionCard.type';

const NewsLetterSubscriptionCard = ({
  title,
  subTitle,
  actionButton,
  color,
}: {
  title: string;
  subTitle: string;
  actionButton: IButtonProps;
  color: IColorProps;
}) => {
  return (
    <NewsLetterSubscriptionCardView
      title={title}
      subTitle={subTitle}
      actionButton={actionButton}
      color={color}
    />
  );
};

export default NewsLetterSubscriptionCard;
