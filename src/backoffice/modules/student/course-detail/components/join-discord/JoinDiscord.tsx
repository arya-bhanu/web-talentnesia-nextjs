import React from 'react';

const JoinDiscord: React.FC = () => {
  return (
    <div className="mx-auto max-w-md">
      <div className="relative isolate overflow-hidden bg-white px-6 text-start sm:rounded-3xl sm:shadow-sm">
        <h2 className="text-base font-bold tracking-tight text-gray-800 sm:text-lg">
          Join Group On Discord
        </h2>

        <h3 className="mt-4 text-sm text-gray-900">
          Join our Discord group for the latest information about this course
        </h3>

        <div className="mt-8 flex items-center justify-center">
          <a
            className="inline-flex items-center justify-center gap-2 px-20 py-3 text-sm font-semibold text-gray-700 rounded-full shadow-sm transition-all duration-150 bg-[#FFC862] hover:bg-[#ffc24f]"
            href="#"
          >
            Join Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default JoinDiscord;
