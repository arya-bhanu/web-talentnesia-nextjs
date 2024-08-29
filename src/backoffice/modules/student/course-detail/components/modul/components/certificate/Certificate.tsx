import React, { useState } from 'react';
import Medal from '@/../public/icons/medal.svg';
import RatingModalView from '@/backoffice/components/rating-modal/RatingModal.view';

const Certificate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = () => {
    setTimeout(() => {
      setIsModalOpen(true); 
    }, 3000); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-700">
      <div className="container flex flex-col items-center -mt-20">
        <div className="flex flex-col max-w-md text-center">
          <div className="mb-4 flex justify-center">
            <Medal />
          </div>
          <h2 className="font-bold text-sm text-gray-700 dark:text-gray-100 mb-2">
            CONGRATULATIONS YOU HAVE COMPLETED THE COURSE
          </h2>
          <p className="text-sm text-gray-500 mb-14">
            Your persistence in completing the course is excellent, keep it up
            in the next course!
          </p>
          <a
            onClick={handleDownloadClick}
            className="py-4 px-6 w-48 text-sm font-semibold rounded-full bg-[#FFC862] hover:bg-[#ffbf49] text-gray-700 mx-auto cursor-pointer" 
          >
            Download Certificate
          </a>
        </div>
      </div>
      <RatingModalView isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};

export default Certificate;
