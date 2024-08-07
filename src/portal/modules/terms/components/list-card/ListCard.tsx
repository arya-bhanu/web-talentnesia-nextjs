import React from 'react';
import ListCardView from './ListCard.view';
import { ListCardData } from './listCard.data';
import clsx from 'clsx';

export const ListCard = ({ className }: { className?: string }) => {
  return (
    <ListCardView cards={ListCardData} className={clsx(className)} />
  );
};
