import React from 'react';
import { IModulProgress } from './modulProgress.type';

const ModulProgressView: React.FC<IModulProgress> = ({
  title,
  progress,
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg font-poppins">{title}</h2>
        <p className="font-lato font-normal text-sm">{progress}% Progress</p>
      </div>
      <div className="relative mt-2 h-3 w-full bg-[rgba(94,171,190,0.07)] rounded-full">
        <div
          style={{ width: `${progress}%` }}
          className={` absolute rounded-full h-3 bg-[#219EBC]`}
        ></div>
      </div>
    </div>
  );
};

export default ModulProgressView;
