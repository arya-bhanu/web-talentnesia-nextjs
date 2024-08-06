import React from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/portal/components/breadcrumb';

export const HeroSectionView = () => {
  return (
    <section className="bg-secondary min-h-[65vh] md:min-h-[60vh] lg:min-h-[80vh]">
      <div className="container pt-10 md:pt-14 lg:pt-24 flex flex-col lg:flex-row items-center lg:items-start">
        <div className="flex-[1] text-center lg:text-left pt-10">
          <Breadcrumb className="my-8 md:my-0 md:mb-5" pathSegments={[]} />
          <h1 className="font-semibold text-[#2B2E33] font-poppins text-xl md:text-2xl lg:text-2xl xl:text-4xl lg:leading-normal xl:leading-[58px]">
            Jembatani Kesenjangan: Memberdayakan Pendidikan, Menghubungkan
            Sekolah dan Industri
          </h1>
          <p className="text-[#2B2E33] text-base font-inter mt-7">
            Program kolaborasi industri-sekolah menggabungkan keterampilan
            praktis industri dengan pendidikan kejuruan. Siswa belajar dari
            pakar industri, memahami kebutuhan pekerjaan saat ini, dan
            memperoleh keterampilan yang sesuai dengan permintaan pasar. Program
            ini memastikan lulusan siap kerja, meningkatkan prospek kerja
            mereka, dan menciptakan tenaga kerja terampil sesuai kebutuhan
            industri.
          </p>
        </div>
        <div className="flex-[2] hidden lg:flex justify-end lg:justify-end items-center lg:items-end">
          <Image
            alt="gambar-pahlawan"
            src="/img/iicp/hero-iicp.png"
            width={1189}
            height={966}
            className="object-contain w-[752px] h-[611px]"
          />
        </div>
      </div>
    </section>
  );
};
