import React, { useMemo } from 'react';
import Image from 'next/image';
import ButtonCarousel from '../../../../../portal/components/button-caraousel/ButtonCarousel';
import { UserStoryCardViewProps } from './userStoryCard.type';

const noOp = () => {};

const UserStoryCardView: React.FC<UserStoryCardViewProps> = ({
  className,
  activeNumber = 0, // Default to 0 if undefined
  setActiveNumber = noOp,
  story = [], // Default to empty array if undefined
  isLoading,
  heading,
}) => {
  const currentTestimonial = useMemo(
    () => story[activeNumber % story.length],
    [JSON.stringify(story)],
  );
  return (
    <div className={className}>
      {currentTestimonial && (
        <>
          <div className="flex-[1] relative">
            <figure className="static lg:absolute bottom-0 bg-[#0097A7] rounded-b-3xl rounded-t-2xl left-0 xl:left-5 lg:flex-row flex-col lg:items-start items-center">
              <Image
                id={activeNumber === 0 ? 'data-image-user' : undefined}
                alt="user story photo"
                src={currentTestimonial.img_url}
                width={200}
                height={230}
                className="h-[190px] lg:h-[210px] xl:h-[230px] object-cover block w-fit mx-auto"
              />
              <div className="flex bg-white px-3 sm:px-5 py-2 sm:py-4 rounded-b-2xl font-inter gap-1 xl:gap-4 flex-wrap">
                <figcaption className="font-bold sm:text-base text-sm">
                  {currentTestimonial?.student_name || 'No name available'}
                </figcaption>
                <p className="text-[#667085] sm:text-base text-sm font-normal">
                  {currentTestimonial?.student_status || 'No status available'}
                </p>
              </div>
            </figure>
          </div>
          <div className="font-inter flex-[3]">
            <strong className="text-[#0097A7] text-sm md:text-base flex items-center gap-x-4 font-bold">
              <span>
                <div className="w-6 border-b-2 border-[#0097A7]" />
              </span>
              <span>{heading}</span>
            </strong>
            <p className="mt-2 md:mt-4 lg:mt-6 md:text-base text-xs sm:text-sm">
              “{currentTestimonial?.story || 'No description available'}”
            </p>

            <ButtonCarousel
              activeNumber={activeNumber}
              nButton={story.length}
              setActiveNumber={setActiveNumber}
              className="mt-6"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserStoryCardView;
