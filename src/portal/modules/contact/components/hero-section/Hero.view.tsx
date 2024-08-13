import React from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/portal/components/breadcrumb';
import { heroSectionData } from './hero.data';
import Link from 'next/link';
import clsx from 'clsx';

export const HeroSectionView = ({ className }: { className?: string }) => {
  return (
    <section
      className={
        clsx(className) +
        'bg-secondary min-h-[65vh] md:min-h-[60vh] lg:min-h-[80vh] space-y-10'
      }
    >
      <div className="container pt-10 md:pt-14 lg:pt-24 flex flex-col items-center lg:items-start">
        <div className="text-center lg:text-left pt-10 md:pt-15">
          <Breadcrumb className="my-8 md:my-0 md:mb-5" pathSegments={[]} />
          <div className="w-full lg:w-[60%] space-y-10 md:space-y-15 lg:pt-8">
            <h1 className="font-bold text-[#2B2E33] font-poppins text-2xl md:text-3xl lg:text-4xl xl:text-5xl lg:leading-normal xl:leading-[58px] mt-10">
              Contact Us
            </h1>
            <p className="text-[#2B2E33] text-lg">
              Join Talentnesia and unlock your full potential with our
              transformative learning experiences
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-10 lg:pt-14 mb-10 xl:mb-0">
          {heroSectionData.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-start lg:items-start text-left space-x-2"
            >
              <div className="bg-[#00B3AD] rounded-full p-3 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 mr-4">
                {item.image === '/img/contact/location.svg' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="30"
                    height="30"
                    className="text-white "
                  >
                    <path
                      d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                    />
                    <circle
                      cx="256"
                      cy="192"
                      r="48"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                    />
                  </svg>
                ) : item.image === '/img/contact/mail.svg' ? (
                  <svg
                    width="21"
                    height="16"
                    viewBox="0 0 21 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.68457 1.04688C1.16113 1.23438 0.758789 1.64063 0.575195 2.17188C0.504883 2.37891 0.500977 2.57423 0.500977 8C0.500977 13.457 0.504883 13.6172 0.575195 13.832C0.758789 14.3672 1.16504 14.7734 1.7041 14.957C1.91504 15.0273 2.15332 15.0312 10.501 15.0312C18.8486 15.0312 19.0869 15.0273 19.2979 14.957C19.8369 14.7734 20.2432 14.3672 20.4268 13.832C20.4971 13.6172 20.501 13.457 20.501 8C20.501 2.54298 20.4971 2.38282 20.4268 2.16798C20.2432 1.63282 19.8369 1.22657 19.2979 1.04298C19.0869 0.972666 18.8525 0.96876 10.4854 0.972666C2.20801 0.972666 1.87988 0.976572 1.68457 1.04688ZM15.0049 5.57813C11.7314 8.83594 11.5439 9.01563 11.2744 9.14844C10.9424 9.3125 10.6104 9.36719 10.2588 9.32032C10.1104 9.30079 9.89941 9.23438 9.72754 9.14844C9.45801 9.01563 9.27051 8.83594 5.99707 5.57813L2.55176 2.14454H10.501H18.4502L15.0049 5.57813ZM4.44629 5.75001L6.69238 8L4.18066 10.5117L1.67285 13.0195V8.02344V3.03126L1.93848 3.26563C2.08301 3.39845 3.21191 4.51563 4.44629 5.75001ZM19.3291 8.02735V13.0195L16.8213 10.5078L14.3096 8L16.7939 5.51954C18.1611 4.15626 19.29 3.03907 19.3018 3.03907C19.3174 3.03907 19.3291 5.28516 19.3291 8.02735ZM7.96191 9.27344C8.92676 10.2461 9.52441 10.5469 10.501 10.5469C11.0283 10.5469 11.3994 10.4609 11.8213 10.25C12.1689 10.0742 12.4385 9.85938 12.9893 9.31641L13.4268 8.88672L13.8096 9.24219C14.0205 9.4375 15.1494 10.5547 16.3213 11.7266L18.4502 13.8594H10.501H2.55176L5.03613 11.3789C6.40332 10.0156 7.54004 8.89844 7.55957 8.89844C7.5752 8.89844 7.75879 9.06641 7.96191 9.27344Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                )}
              </div>
              <div>
                <h3 className="font-semibold font-poppins text-base text-[#2B2E33]">
                  {item.title}
                </h3>
                <Link href={item.url}>
                  <p className="text-sm text-[#00B3AD] mt-2">
                    {item.description}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionView;
