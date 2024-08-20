import React from 'react';
import { ListProgramCardView } from './ListProgramCard.view';
import { ListProgramCardData } from './listProgramCard.data';


interface ListProgramCardProps {
    className?: string;
  }
  
  const ListProgramCard: React.FC<ListProgramCardProps> = ({ className = '' }) => {
    return (
      <div className={`flex flex-wrap -mx-4 ${className}`}>
        {ListProgramCardData.map((item, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <ListProgramCardView data={item} />
          </div>
        ))}
      </div>
    );
  };

export default ListProgramCard;
