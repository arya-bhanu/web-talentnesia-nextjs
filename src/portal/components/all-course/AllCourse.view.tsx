import Image from 'next/image';
import React from 'react';
import { AllCourseProps } from './allCourse.type';
import SkeletonLoader from '../skeleton-animation';
import { DividerView } from '../divider/Divider.view';

  const AllCourseView: React.FC<AllCourseProps> = (props) => {
    const formatRupiah = (angka: number) => {
      if (angka === undefined) return 'Rp 0';
      var reverse = angka.toString().split('').reverse().join('');
      var ribuan = reverse.match(/\d{1,3}/g);
      var formatted = ribuan?.join('.').split('').reverse().join('');
      return 'Rp ' + formatted;
    };

    const renderStar = (rating: number) => {
      const stars = [];
      const ratingInt = Math.floor(rating);

      for (let i = 0; i < ratingInt; i++) {
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
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden">
          <div className="flex-shrink-0 w-full sm:w-auto">
            <SkeletonLoader visible={props.isLoading ? props.isLoading : false} variant="image" height={100} width={100}/>
            {!props.isLoading && props.logo && (
              <div className="w-full sm:max-w-[28vh] h-full md:max-h-[25vh] overflow-hidden">
                <Image
                  alt="instructor image"
                  src={props.logo && props.logo !== "null"
                    ? `${process.env.API_SERVER_URL}/v1/file/${props.logo}`
                    : "/public/images/default-image.jpg"}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full sm:max-w-[25vh]"
                />
              </div>
            )}
          </div>

          <div className="mt-4 sm:mt-0 sm:ml-4 flex-grow">
            {!props.isLoading && (
              <>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-[#101828]">{props.title}</h3>
                </div>
              
                <p className="text-sm text-[#667085] mt-2 line-clamp-2">
                  {props.description}
                </p>

                <div className="text-sm text-[#667085] mr-auto mt-2">
                      <span>{props.duration} • {props.level} • {props.modules} Modules</span>
                </div>
                  <div className="flex flex-wrap justify-between items-center mt-2">
                    <div className="flex items-center mr-4 mb-2 sm:mb-0">
                      <span className="text-sm text-[#344054] mr-2">{props.rating}</span>
                      <div className="flex">{renderStar(props.rating)}</div>
                    </div>

                    <div className="flex items-end w-full sm:w-auto">
                      <p className="text-lg font-semibold text-[#344054] mr-2">
                        {formatRupiah(props.currentPrice)}
                      </p>
                      <p className="text-sm text-[#98A2B3] line-through">
                        {formatRupiah(props.originalPrice)}
                      </p>
                    </div>
                  </div>
                </>
            )}
          </div>
        </div>
        <DividerView className="w-full h-[1px] mt-4" />
      </div>
    );
  };

  export default AllCourseView;