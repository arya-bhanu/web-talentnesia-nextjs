'use client';
import React from 'react';
import { IHomeProps } from './home.type';
import Hero from './components/hero';
import Benefits from './components/benefits';
import ProgramDimension from './components/program-dimension';
import EliteClass from './components/elite-class';
import UserStory from './components/user-story';
import Partners from './components/partners';
import NewsLetterSubscription from './components/news-letter-subscription';

const HomeView: React.FC<IHomeProps> = ({ dataHome, skeletonAnimation }) => {
  console.log(dataHome);
  return (
    <>
      <Hero isLoading={skeletonAnimation} />
      <main className="container">
        <Benefits className="mt-9 md:mt-16 xl:mt-0" />
        <ProgramDimension
          className="mt-14 md:mt-16 lg:mt-20"
          programs={dataHome.programs}
          isLoading={skeletonAnimation}
        />
        <EliteClass
          className="mt-14 md:mt-16 lg:mt-24"
          courses={dataHome.courses}
          isLoading={skeletonAnimation}
        />
        <UserStory
          className=" mt-14 sm:mt-28 md:mt-36 lg:mt-48"
          testimonials={dataHome.testimonials}
          isLoading={skeletonAnimation}
        />
        <Partners
          className="mt-16 md:mt-20 lg:mt-28"
          partners={dataHome.partners}
          isLoading={skeletonAnimation}
        />
        <NewsLetterSubscription
          className="mt-16 md:mt-28 lg:mt-36"
          isLoading={skeletonAnimation}
        />
      </main>
    </>
  );
};

export default HomeView;
