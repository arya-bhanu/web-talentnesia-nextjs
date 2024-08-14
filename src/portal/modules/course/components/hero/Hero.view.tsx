'use client';
import { ObserverContext } from '@/utils/portal/ObserverProvider';
import clsx from 'clsx';
import { Breadcrumb } from '@/portal/components/breadcrumb';
import Image from 'next/image';
import React, { useContext } from 'react';

const CourseHeroView = ({ className }: { className?: string }) => {
  const { headerObserver } = useContext(ObserverContext);
  return (
    <section
      ref={headerObserver.observerRef}
      className={clsx(
        className,
        'bg-[#e0f7fc] min-h-[70vh] lg:min-h-[80vh] xl:min-h-screen',
      )}
    >
      <div className="flex container pt-28 md:pt-32 lg:pt-36 xl:pt-40">
        <div className="flex-[2]">
          <Breadcrumb pathSegments={['']} />
          <h1 className="font-semibold text-slate-800 font-poppins mt-14 mb-10 text-2xl md:text-3xl lg:text-3xl xl:text-4xl xl:leading-[58px]">
            Jelajahi Program Animasi 3D yang sesuai minatmu
          </h1>
          <div className="flex text-center text-blue-500 gap-[10px]">
            <div className="bg-white w-[180px] h-[78px] rounded-lg flex items-center justify-center mr-2">
              <div className="flex items-center justify-center gap-2">
                <p className="text-blue-500 text-3xl font-bold">200</p>
                <p className="text-slate-700 font-inter text-[14px]">
                  Kursus Aktif
                </p>
              </div>
            </div>
            <div className="bg-white w-[180px] h-[78px] rounded-lg flex items-center justify-center mr-2">
              <div className="flex items-center justify-center gap-2">
                <p className="text-blue-500 text-3xl font-bold">3000+</p>
                <p className="text-slate-700 font-inter text-[14px]">Siswa</p>
              </div>
            </div>
          </div>
          <p className="text-slate-700 mt-14 font-inter text-[14px] font-semibold">
            *Realtime Data
          </p>
        </div>
        <div className="flex-[2] justify-end lg:flex hidden">
          <Image
            alt="hero image"
            className="block object-contain"
            src={'/img/course/hero-img.png'}
            width={620}
            height={523}
          />
        </div>
      </div>
    </section>
  );
};

export default CourseHeroView;
