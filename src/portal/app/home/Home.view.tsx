import React from 'react';
import HeroSectionView from './components/Hero/_Hero.view';
import ProgramDimensionSectionView from './components/ProgramDimension';
import EliteClassSectionView from './components/EliteClass';
import UserStorySectionView from './components/UserStory';
import PartnersSectionView from './components/Partners/_Partners.view';
import NewsLetterSubscriptionSectionView from './components/NewsLetterSubscription';

const HomeView = () => {
	return (
		<>
			<HeroSectionView />
			<main className='container'>
				<ProgramDimensionSectionView className='mt-24' />
				<EliteClassSectionView className='mt-24' />
				<UserStorySectionView className='mt-48' />
				<PartnersSectionView className='mt-28' />
				<NewsLetterSubscriptionSectionView className='mt-36' />
			</main>
		</>
	);
};

export default HomeView;
