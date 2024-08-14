import React from 'react';
import CourseHeroView from './Hero.view';

const Hero = ({ className }: { className?: string }) => {
  return <CourseHeroView className={className} />;
};

export default Hero;
