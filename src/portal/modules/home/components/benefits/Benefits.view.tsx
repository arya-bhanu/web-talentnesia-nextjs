'use client';
import BenefitCard from '@/portal/components/benefit-card';
import clsx from 'clsx';
import React from 'react';
import { dataBenefits } from './benefits.data';

import { Pagination } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';

import './benefits.css';

const BenefitsSectionView = ({ className }: { className?: string }) => {
  return (
    <section
      className={clsx(
        className,
        'flex items-center justify-center gap-3 md:gap-5 lg:gap-7 relative top-0 lg:-top-6 xl:-top-12',
      )}
    >
      <Swiper
        style={{ height: '100%' }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {dataBenefits.map((el, index) => (
          <SwiperSlide key={index}>
            <BenefitCard props={{ ...el }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BenefitsSectionView;
