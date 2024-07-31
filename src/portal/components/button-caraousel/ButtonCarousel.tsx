import React from 'react';
import ButtonView from './ButtonCarousel.view';
import { IButtonCarousel } from './buttonCarousel.type';

const ButtonCarousel = (props: IButtonCarousel) => {
  return <ButtonView {...props} />;
};

export default ButtonCarousel;
