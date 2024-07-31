import Image from 'next/image';
import React from 'react';
import { IFeatureCard } from './featureCard.type';

const FeatureCardView = (props: IFeatureCard) => {
  const formatRupiah = (angka: number) => {
    var reverse = angka.toString().split('').reverse().join('');
    var ribuan = reverse.match(/\d{1,3}/g);
    var formatted = ribuan?.join('.').split('').reverse().join('');
    return 'Rp ' + formatted;
  };

  const renderStar = (n: number) => {
    const stars = [];

    for (let i = 0; i < n; i++) {
      stars.push(
        <Image
          key={i}
          alt={`star-${i}`}
          src="/icons/star.svg"
          width={14}
          height={14}
        />,
      );
    }
    return stars;
  };

  return (
    <figure className="border border-[#EAECF0] rounded-md overflow-clip">
      <div className="h-[180px] overflow-clip w-full">
        <Image
          alt="card image"
          src={props.imgUrl}
          width={400}
          height={180}
          className="w-full object-cover"
        />
      </div>
      <div className="py-3 md:py-4 lg:py-6 px-2 md:px-4 lg:px-5">
        <figcaption className="text-base sm:text-lg md:text-xl font-poppins font-semibold line-clamp-2">
          {props.title}
        </figcaption>
        <p className="text-xs text-[#667085] mt-1 md:mt-3">{props.category}</p>
        <div className="flex items-center gap-2 mt-1 md:mt-3">
          <p className="text-xs text-[#344054] ">{props.ratingNumber}</p>
          <div className="flex items-center gap-1 ">{renderStar(5)}</div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-3 md:mt-5">
          <p className="text-base md:text-lg lg:text-xl font-semibold">
            {formatRupiah(props.price)}
          </p>
          <p className="font-poppins text-[#98A2B3] text-xs sm:text-sm md:text-base line-through">
            {formatRupiah(props.prevPrice)}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default FeatureCardView;
