import React from 'react';
import HeroSectionView from './components/Hero/_Hero.view';
import ProgramDimensionSectionView from './components/ProgramDimension';
import EliteClassSectionView from './components/EliteClass';
import UserStorySectionView from './components/UserStory';
import PartnersSectionView from './components/Partners/_Partners.view';
import NewsLetterSubscriptionSectionView from './components/NewsLetterSubscription';
import BenefitsSectionView from './components/Benefits';

const HomeView = () => {
	return (
		<>
			<HeroSectionView />
			<main className='container'>
				<BenefitsSectionView />
				<ProgramDimensionSectionView className='mt-20' />
				<EliteClassSectionView className='mt-14 md:mt-16 lg:mt-24' />
				<UserStorySectionView className=' mt-14 sm:mt-28 md:mt-36 lg:mt-48' />
				<PartnersSectionView className='mt-16 md:mt-20 lg:mt-28' />
				<NewsLetterSubscriptionSectionView className='mt-16 md:mt-28 lg:mt-36' />
			</main>
		</>
	);
};

export default HomeView;
