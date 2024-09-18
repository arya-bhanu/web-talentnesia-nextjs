import React from 'react';
import DetailCardView from './DetailCard.view';
import { courses } from './detailCard.type';

const DetailCard = (props: courses) => {
  return <DetailCardView {...props} />;
};

export default DetailCard;
