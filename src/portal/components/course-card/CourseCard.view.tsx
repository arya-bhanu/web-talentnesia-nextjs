import React from 'react';
import Image from 'next/image';
import { CourseCardProps } from './courseCard.type';
import SkeletonLoader from '../skeleton-animation';

const CourseCardView: React.FC<CourseCardProps> = ({
  image,
  rating,
  price,
  oldPrice,
  title,
  description,
  duration,
  level,
  modules,
  isLoading
}) => {
  const formatRupiah = (angka: number) => {
    const reverse = angka.toString().split('').reverse().join('');
    const ribuan = reverse.match(/\d{1,3}/g);
    const formatted = ribuan?.join('.').split('').reverse().join('');
    return `Rp ${formatted}`;
  };

  const renderStar = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Image
            key={`full-star-${i}`}
            alt={`full-star-${i}`}
            src="/icons/star.svg"
            width={14}
            height={14}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Image
            key={`half-star-${i}`}
            alt="half-star"
            src="/icons/star-half.svg"
            width={14}
            height={14}
          />
        );
      } else {
        stars.push(
          <Image
            key={`empty-star-${i}`}
            alt={`empty-star-${i}`}
            src="/icons/star-empty.svg"
            width={14}
            height={14}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex flex-col h-auto w-full md:w-[800px] mx-auto">
      <div className="border-b border-gray-300 w-full mb-4"></div>
      <div className="grid gap-4">
        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 bg-white">
          <div className="w-full md:w-1/3 grid place-items-center">
            <SkeletonLoader visible={isLoading ? isLoading : false} height={150} variant='image' borderRadius={12}/>
            {
              !isLoading &&
              <img
                src={image}
                alt="course image"
                className="rounded-xl object-cover max-h-[300px] w-full"
              />
            }
          </div>
          <div className="w-full md:w-2/3 flex flex-col p-3">
            <div className="flex flex-col h-full justify-between">
              <div>
                <SkeletonLoader visible={isLoading ? isLoading : false} width={'95%'} containerStyle={{marginBottom: 18}}/>
                <SkeletonLoader visible={isLoading ? isLoading : false} height={12}/>
                <SkeletonLoader visible={isLoading ? isLoading : false} height={12} width={'80%'}/>
                {
                  !isLoading &&
                  <>
                  <h3 className="font-bold text-[18px] text-gray-800">{title}</h3>
                  <p className="font-normal text-gray-800 mt-1 text-sm">
                    {description}
                  </p>
                  </>
                }
                
                
                <div className="flex items-center font-light space-x-2 text-gray-600 text-[12px] mt-3">
                  <SkeletonLoader visible={isLoading ? isLoading : false} height={9} width={'40%'} containerStyle={{marginTop: 10}}/>
                  {
                    !isLoading &&
                    <>
                    <p>{duration}</p>
                    <p>{level}</p>
                    <p>{modules}</p>
                    </>
                  }
                  
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-1" style={isLoading === true ? {minWidth: 200} : undefined}>
                  <SkeletonLoader visible={isLoading ? isLoading : false} height={10} width={'60%'}/>
                  {
                    !isLoading &&
                    <>
                    <p className="text-gray-600 font-bold text-xs ml-1">
                      {rating.toFixed(1)}
                    </p>
                    <div className="flex items-center">{renderStar(rating)}</div>
                    </>
                  }
                  
                </div>
                <div className="text-lg font-bold text-gray-800 flex items-center space-x-2" style={isLoading === true ? {minWidth: 200} : undefined}>
                  <SkeletonLoader visible={isLoading ? isLoading : false} />
                  {
                    !isLoading &&
                    <>
                    {formatRupiah(price)}
                    {oldPrice && (
                      <span className="text-gray-500 line-through text-sm ml-2">
                        {formatRupiah(oldPrice)}
                      </span>
                    )}
                    </>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardView;
