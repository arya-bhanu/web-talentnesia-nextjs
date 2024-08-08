import React from 'react';
import Image from 'next/image';
import ButtonCarousel from '../button-caraousel/ButtonCarousel';
import { UserStoryCardViewProps } from './userStoryCard.type';

const UserStoryCardView: React.FC<UserStoryCardViewProps> = ({
  className,
  activeNumber,
  setActiveNumber,
  testimonials,
}) => {
  const staticPhotos = [
    '/img/landing/user-story/Henry.png',
    '/img/landing/user-story/huya.png',
    '/img/landing/user-story/reja.png',
    '/img/landing/user-story/woman.png',
  ];

  return (
    <div className={className}>
      <div className="flex-[1] relative">
        <figure className="static lg:absolute bottom-0 bg-[#0097A7] rounded-b-3xl rounded-t-2xl left-0 xl:left-5 lg:flex-row flex-col lg:items-start items-center">
          <Image
            alt="user story photo"
            src={staticPhotos[activeNumber % staticPhotos.length]}
            width={200}
            height={230}
            className="h-[190px] lg:h-[210px] xl:h-[230px] object-cover block w-fit mx-auto"
          />
          <div className="flex bg-white px-3 sm:px-5 py-2 sm:py-4 rounded-b-2xl font-inter gap-1 xl:gap-4 flex-wrap">
            <figcaption className="font-bold sm:text-base text-sm">
              {testimonials[activeNumber].fullName}
            </figcaption>
            <p className="text-[#667085] sm:text-base text-sm font-normal">
              {testimonials[activeNumber].statusUser}
            </p>
          </div>
        </figure>
      </div>
      <div className="font-inter flex-[3]">
        <strong className="text-[#0097A7] text-sm md:text-base flex items-center gap-x-4 font-bold">
          <span>
            <div className="w-6 border-b-2 border-[#0097A7]" />
          </span>
          <span>Cerita Inspiratif Peserta Program Kami</span>
        </strong>
        <p className="mt-2 md:mt-4 lg:mt-6 md:text-base text-xs sm:text-sm">
          “{testimonials[activeNumber].description}”
        </p>
        <ButtonCarousel
          activeNumber={activeNumber}
          nButton={testimonials.length}
          setActiveNumber={setActiveNumber}
          className="mt-6"
        />
      </div>
    </div>
  );
};

export default UserStoryCardView;
