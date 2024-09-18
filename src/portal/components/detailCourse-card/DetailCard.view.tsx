import Image from 'next/image';
import React from 'react';
import { courses } from './detailCard.type';
import SkeletonLoader from '../skeleton-animation';
import detailCourseimg from '../../../../public/images/detailCourse.png'
import Playimg from '../../../../public/images/play.png'
import { detail } from './detailcourse.data';

const DetailCardView = (props: courses) => {
  const formatRupiah = (angka: number) => {
    var reverse = angka.toString().split('').reverse().join('');
    var ribuan = reverse.match(/\d{1,3}/g);
    var formatted = ribuan?.join('.').split('').reverse().join('');
    return 'Rp ' + formatted;
  };

  return (
    <figure className="border border-[#EAECF0] rounded-md overflow-clip w-[30%] h-[600px] bg-white">
      <SkeletonLoader visible={props.isLoading ? props.isLoading : false} variant='image' height={250} />
      {
        !props.isLoading &&
        <>
          <div className="h-[250px] w-full p-6 relative rounded-md overflow-hidden">
            <Image
              alt="card image"
              src={detailCourseimg}
              width={400}
              height={250}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Image
                alt="play button"
                src={Playimg}
                width={64}
                height={64}
              />
            </div>
          </div>



        </>
      }

      <div className="px-2 md:px-4 lg:px-5">
        <SkeletonLoader visible={props.isLoading ? props.isLoading : false} />
        <SkeletonLoader visible={props.isLoading ? props.isLoading : false} width={'40%'} />
        <SkeletonLoader visible={props.isLoading ? props.isLoading : false} width={70} height={10} containerStyle={{ marginTop: 15 }} />
        <SkeletonLoader visible={props.isLoading ? props.isLoading : false} containerStyle={{ marginTop: 20 }} />
        {
          !props.isLoading &&
          <>
            <div className="flex items-center gap-2 mt-2 sm:mt-3 md:mt-5">
              <p className="text-base md:text-lg lg:text-xl font-semibold font-poppins">
                {detail[0].priceAft}
              </p>
              <p className="font-poppins text-[#98A2B3] text-xs sm:text-sm md:text-base line-through">
              {detail[0].priceBef}
              </p>
            </div>
            <button className="mt-4 bg-[#FFC862] text-[#344054] py-2 px-4 rounded-full w-full font-poppins font-medium">
              Enroll the course
            </button>
            <div className="text-base text-[#344054] font-poppins font-semibold line-clamp-2 pt-4">
              This Course Includes
            </div>
            {detail.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <Image src={item.logo} alt={item.title} width={24} height={24} />
                <p className="text-sm text-[#667085]">{item.title}</p>
              </div>
            ))}
          </>
        }
      </div>
    </figure>
  );
};
export default DetailCardView;
