import React from 'react';
import { ProgramCardView } from './ProgramCard.view';
import { ProgramCardData } from './programCard.data';


interface ProgramCardProps {
    className?: string;
  }
  
  const ProgramCard: React.FC<ProgramCardProps> = ({ className = '' }) => {
    return (
      <div className={`flex flex-wrap -mx-4 ${className}`}>
        {ProgramCardData.map((item, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <ProgramCardView data={item} />
          </div>
        ))}
      </div>
    );
  };

export default ProgramCard;
