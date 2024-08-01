import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { featuresData } from './features.data';

export const FeaturesView = ({ className }: { className?: string }) => {
  return (
    <section className={clsx(className, (className = 'bg-white'))}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:text-left ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col text-center md:text-left min-h-[100px] items-center md:items-start"
            >
              <Image
                alt={feature.title}
                src={feature.imgUrl}
                width={38}
                height={38}
                className="mb-6"
              />
              <div>
                <h3 className="font-semibold text-lg mb-2 font-poppins">
                  {feature.title}
                </h3>
                <p className="text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesView;
