import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { featuresData } from './features.data';

export const FeaturesView = ({ className }: { className?: string }) => {
  return (
    <section className={clsx(className, (className = 'bg-white'))}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
        {featuresData.map((feature, index) => (
          <div key={index} className="flex flex-col">
            <div className="mb-4">
              <Image
                alt={feature.title}
                src={feature.imgUrl}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 font-poppins">
                {feature.title}
              </h3>
              <p className="text-base">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesView;
