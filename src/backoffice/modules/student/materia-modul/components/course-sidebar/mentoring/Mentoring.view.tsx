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
    <div className="flex flex-col h-screen">
      <div className="bg-[#323232] rounded-lg px-8 py-52 text-white mb-8 flex flex-col items-center flex-grow">
        <h1 className="text-xl font-bold mb-2 text-center">Join Mentoring</h1>
        <h3 className="text-md mb-10 text-center">Mentoring available on March 23, 2024 at 15.00</h3>
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
      
      <div className="flex justify-between px-8 py-4">
        <button className="px-8 py-2 rounded-full border border-[#FFC862] text-gray-700">Previous</button>
        <button className="px-14 py-2 rounded-full bg-[#FFC862] hover:bg-[#ffb428] text-gray-700">Next</button>
      </div>
    </div>
  );
};

export default Mentoring;
