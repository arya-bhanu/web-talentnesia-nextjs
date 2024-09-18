import React from 'react';
import CourseHeroView from './Hero.view';

const Hero = ({ className, isLoading }: { className?: string, isLoading?: boolean }) => {
  return <CourseHeroView className={className} isLoading={isLoading}/>;
};

export default Hero;
