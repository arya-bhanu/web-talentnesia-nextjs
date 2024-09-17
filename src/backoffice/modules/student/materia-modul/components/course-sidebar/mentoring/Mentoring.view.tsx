import React from 'react';
import Image from 'next/image';

interface MentoringProps {
  meetLink: string | null;
}

const Mentoring: React.FC<MentoringProps> = ({ meetLink }) => {
  const handleJoinNow = () => {
    if (meetLink) {
      window.open(meetLink, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-fit">
      <div className="bg-[#323232] rounded-lg px-8 py-52 text-white flex flex-col items-center flex-grow">
        <h1 className="text-xl font-bold mb-2 text-center">Join Mentoring</h1>
        <h3 className="text-md text-center">Mentoring available on March 23, 2024 at 15.00</h3>
        <div className="flex space-x-4 justify-center">
          <button 
            className="px-4 py-3 rounded-full bg-[#B9BDC7] text-white"
            onClick={handleJoinNow}
            disabled={!meetLink}
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mentoring;
