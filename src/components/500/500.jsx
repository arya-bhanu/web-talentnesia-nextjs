import React from 'react';
import Image from 'next/image';
import custom500Image from '@/../public/images/505.png'; 

export default function Custom500() {
  return (
    <div className="flex items-center justify-center align-items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="text-center">
      <div className="py-8 px-8 max-w-screen-xl">
          <div className="mb-8">
            <Image
              src={custom500Image} 
              alt="404 Not Found"
              width={500} 
              height={500} 
              className="mx-auto"
            />
          </div>
          <p className="text-lg font-light text-[#989FAD]">
            Sorry, there was an error on our server. We are working on fixing it. Try again
          </p>
          <p className="mb-6 text-lg font-light text-[#989FAD]"> 
          later
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
