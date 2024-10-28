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
import { IDataHero } from './components/hero/Hero.type';
import { Programs } from '../components/program-dimension-card/programDimensionCard.type';
import { ICardCareer } from './components/program-dimension/programDimension.type';
import { IBenefitCard } from './components/benefits/benefit-card/benefitCard.type';
import { IDataAPIEliteClass } from './components/elite-class/eliteClass.type';
import { IDataUserStory } from './components/user-story/userStory.type';
import { IDataPartners } from './components/partners/partners.type';
import { IContentNewsLetter } from './components/news-letter-subscription/newsLetterSubscription.type';

const HomeView: React.FC<IHomeProps> = ({ dataHome, skeletonAnimation }) => {
  return (
    <>
      <Hero
        isLoading={skeletonAnimation}
        dataHero={
          dataHome.find((el) => el.section === 'hero')
            ?.body as unknown as IDataHero
        }
      />
      <main className="container">
        <Benefits
          className="mt-9 md:mt-16 xl:mt-0"
          dataBenefits={
            dataHome.find((el) => el.section === 'benefits')
              ?.body as unknown as IBenefitCard[]
          }
        />
        <ProgramDimension
          className="mt-10 md:mt-14"
          programs={
            dataHome.find((el) => el.section === 'program-dimension/program')
              ?.body as unknown as Programs[]
          }
          cardCareer={
            dataHome.find(
              (el) => el.section === 'program-dimension/card-carrier',
            )?.body as unknown as ICardCareer
          }
          isLoading={skeletonAnimation}
        />
        <EliteClass
          className="mt-14 md:mt-16 lg:mt-24"
          dataApi={
            dataHome.find((el) => el.section === 'super-class')
              ?.body as unknown as IDataAPIEliteClass
          }
          isLoading={skeletonAnimation}
        />
        <UserStory
          className=" mt-14 sm:mt-28 md:mt-36 lg:mt-48"
          dataUserStory={
            dataHome.find((el) => el.section === 'user-story')
              ?.body as unknown as IDataUserStory
          }
          isLoading={skeletonAnimation}
        />
        <Partners
          className="mt-16 md:mt-20 lg:mt-28"
          dataPartner={
            dataHome.find((el) => el.section === 'partners')
              ?.body as unknown as IDataPartners
          }
          isLoading={skeletonAnimation}
        />
        <NewsLetterSubscription
          className="mt-16 md:mt-28 lg:mt-36"
          dataContent={
            dataHome.find((el) => el.section === 'news-letter-subscription')
              ?.body as unknown as IContentNewsLetter
          }
          isLoading={skeletonAnimation}
        />
      </main>
    </>
  );
};

export default HomeView;
