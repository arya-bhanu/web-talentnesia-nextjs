import React from 'react';
import Hero from './components/hero';
import Benefits from './components/benefits';
import ProgramDimension from './components/program-dimension';
import EliteClass from './components/elite-class';
import UserStory from './components/user-story';
import Partners from './components/partners';
import NewsLetterSubscription from './components/news-letter-subscription';

const HomeView = () => {
  return (
    <>
      <Hero />
      <main className="container">
        <Benefits className="mt-9 md:mt-16 xl:mt-0" />
        <ProgramDimension className="mt-14 md:mt-16 lg:mt-20" />
        <EliteClass className="mt-14 md:mt-16 lg:mt-24" />
        <UserStory className=" mt-14 sm:mt-28 md:mt-36 lg:mt-48" />
        <Partners className="mt-16 md:mt-20 lg:mt-28" />
        <NewsLetterSubscription className="mt-16 md:mt-28 lg:mt-36" />
      </main>
    </>
  );
};

export default HomeView;
