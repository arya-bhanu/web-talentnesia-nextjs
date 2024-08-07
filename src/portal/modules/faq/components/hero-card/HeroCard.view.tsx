'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroCardProps } from './HeroCard.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

export const HeroCardView: React.FC<{ cards: HeroCardProps[] }> = ({
  cards,
}) => {
  return (
    <section className="relative -top-[5rem] xl:-mt-[8rem]">
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        slidesPerView={1}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl border-2 p-6 md:p-8 m-4">
              <div className="flex flex-col space-y-4 md:space-y-6 xl:space-y-8">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={60}
                  height={60}
                  className="object-contain w-12 h-12 md:w-14 md:h-14 xl:w-14 xl:h-14"
                />
                <h2 className="text-xl md:text-2xl xl:text-2xl font-semibold text-[#344054] font-poppins">
                  {card.title}
                </h2>
                <p className="text-sm md:text-base text-[#455A64]">
                  {card.description}
                </p>
                <Link
                  href={card.url}
                  className="text-sm md:text-base xl:text-lg text-[#00558C] hover:underline flex items-center"
                >
                  Baca Selengkapnya
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m-7-7l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
