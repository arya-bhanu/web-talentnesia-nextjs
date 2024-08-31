import React from 'react';
import Image from 'next/image';
import ButtonCarousel from '../button-caraousel/ButtonCarousel';
import { UserStoryCardViewProps } from './userStoryCard.type';
import SkeletonLoader from '../skeleton-animation';

const noOp = () => {};

const UserStoryCardView: React.FC<UserStoryCardViewProps> = ({
  className,
  activeNumber = 0, // Default to 0 if undefined
  setActiveNumber = noOp,
  testimonials = [], // Default to empty array if undefined
  isLoading
}) => {
  const staticPhotos = [
    '/img/landing/user-story/Henry.png',
    '/img/landing/user-story/huya.png',
    '/img/landing/user-story/reja.png',
    '/img/landing/user-story/woman.png',
  ];

  // Ensure testimonials and activeNumber are handled safely
  const currentTestimonial = testimonials[activeNumber % testimonials.length];
  return (
    <div className={className}>
      <div className="flex-[1] relative">
      
        <figure className="static lg:absolute bottom-0 bg-[#0097A7] rounded-b-3xl rounded-t-2xl left-0 xl:left-5 lg:flex-row flex-col lg:items-start items-center">
        <SkeletonLoader visible={isLoading ? isLoading : false} variant='image' height={230} containerStyle={{objectFit: 'cover', display: 'block', 
          position: 'absolute', bottom: 46, borderBottomLeftRadius: 0, borderBottomRightRadius: 0
        }}/>
        {
          !isLoading &&
          <>
          <Image
            alt="user story photo"
            src={staticPhotos[activeNumber % staticPhotos.length]}
            width={200}
            height={230}
            className="h-[190px] lg:h-[210px] xl:h-[230px] object-cover block w-fit mx-auto"
          />
          </>
        }
          <div className="flex bg-white px-3 sm:px-5 py-2 sm:py-4 rounded-b-2xl font-inter gap-1 xl:gap-4 flex-wrap">
            <SkeletonLoader visible={isLoading ? isLoading : false} width={75} height={15} />
            <SkeletonLoader visible={isLoading ? isLoading : false} width={75} height={15} />
            {

              !isLoading && 
              <>
              <figcaption className="font-bold sm:text-base text-sm">
                {currentTestimonial?.fullName || 'No name available'}
              </figcaption>
              <p className="text-[#667085] sm:text-base text-sm font-normal">
                {currentTestimonial?.statusUser || 'No status available'}
              </p>
              </>
            }
          </div>
        </figure>
      </div>
      <div className="font-inter flex-[3]">
        <SkeletonLoader visible={isLoading ? isLoading : false} width={350} containerStyle={{marginBottom: 30}}/>
        <SkeletonLoader visible={isLoading ? isLoading : false} height={12} />
        <SkeletonLoader visible={isLoading ? isLoading : false} height={12} width={'80%'}/>
        <SkeletonLoader visible={isLoading ? isLoading : false} height={12} width={'50%'} />
        {
          !isLoading && 
          <>
          <strong className="text-[#0097A7] text-sm md:text-base flex items-center gap-x-4 font-bold">
            <span>
              <div className="w-6 border-b-2 border-[#0097A7]" />
            </span>
            <span>Cerita Inspiratif Peserta Program Kami</span>
          </strong>
          <p className="mt-2 md:mt-4 lg:mt-6 md:text-base text-xs sm:text-sm">
            “{currentTestimonial?.description || 'No description available'}”
          </p>
          </>
          
        }
        
        
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
