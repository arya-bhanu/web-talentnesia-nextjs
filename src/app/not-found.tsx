import React from 'react';
import Image from 'next/image';
import custom404Image from '../../public/images/error404.png'; 

export default function Custom404() {
  return (
    <div className="flex items-center justify-center align-items-center min-h-screen min-w-screen bg-white dark:bg-gray-900">
      <div className="text-center">
      <div className="py-12 px-22 max-w-screen-xl">
          <div className="mb-8">
            <Image
              src={custom404Image} 
              alt="404 Not Found"
              width={500} 
              height={500} 
              className="mx-auto"
            />
          </div>
          <p className="text-lg font-light text-[#989FAD]">
            Sorry, we couldn’t find this page. But, don’t worry, you can find plenty of 
          </p>
          <p className="mb-6 text-lg font-light text-[#989FAD]"> 
            other things on our
          </p>
          <a
            href="/"
            className="font-poppins inline-flex items-center justify-center text-black bg-[#FFC862] hover:bg-[#E6B04E] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-300 transform hover:scale-105"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
