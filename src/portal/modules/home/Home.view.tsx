import React from 'react';
import HeroSectionView from './components/hero/_Hero.view';
import ProgramDimensionSectionView from './components/program-dimension';
import EliteClassSectionView from './components/elite-class';
import UserStorySectionView from './components/user-story';
import PartnersSectionView from './components/partners/_Partners.view';
import NewsLetterSubscriptionSectionView from './components/news-letter-subscription';
import BenefitsSectionView from './components/benefits';

const HomeView = () => {
	return (
		<>
			<HeroSectionView />
			<main className='container'>
				<BenefitsSectionView className='mt-9 md:mt-16 xl:mt-0' />
				<ProgramDimensionSectionView className='mt-14 md:mt-16 lg:mt-20' />
				<EliteClassSectionView className='mt-14 md:mt-16 lg:mt-24' />
				<UserStorySectionView className=' mt-14 sm:mt-28 md:mt-36 lg:mt-48' />
				<PartnersSectionView className='mt-16 md:mt-20 lg:mt-28' />
				<NewsLetterSubscriptionSectionView className='mt-16 md:mt-28 lg:mt-36' />
			</main>
		</>
	);
};

export default HomeView;
