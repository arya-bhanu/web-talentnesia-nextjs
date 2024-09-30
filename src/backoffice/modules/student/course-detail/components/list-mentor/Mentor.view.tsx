import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mentor } from './mentor.type';
import { fileHelper } from '@/helpers/file-manager/fileUpload.helper';
import clsx from 'clsx';

interface MentorViewProps {
  mentorData: Mentor[];
  className?: string;
}

const MentorView: React.FC<MentorViewProps> = ({ mentorData, className }) => {
  const [mentorImages, setMentorImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadMentorImages = async () => {
      const images: Record<string, string> = {};
      for (const mentor of mentorData) {
        if (mentor.mentorPhoto) {
          try {
            const imageBlob = await fileHelper.getFile(mentor.mentorPhoto);
            if (imageBlob) {
              const imageUrl = URL.createObjectURL(imageBlob);
              images[mentor.mentorId] = imageUrl;
            }
          } catch (error) {
            console.error('Error loading mentor image:', error);
            images[mentor.mentorId] = '/img/manage-user/profile-template.svg';
          }
        } else {
          images[mentor.mentorId] = '/img/manage-user/profile-template.svg';
        }
      }
      setMentorImages(images);
    };

    loadMentorImages();
  }, [mentorData]);

  return (
    <div className={clsx(className, 'mt-1')}>
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl font-bold font-poppins text-gray-900 mb-4">Mentors</h2>
        <div>
          {mentorData.map((mentor) => (
            <div
              key={mentor.mentorId}
              className="flex items-center space-x-4 px-4 mb-5"
            >
              <Image
                src={`${process.env.API_SERVER_URL}/v1/file/${mentor.mentorPhoto}`}
                alt={mentor.mentorName}
                width={40}
                height={40}
                className="rounded-full object-cover w-[40px] h-[40px]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/img/manage-user/profile-template.svg';
                }}
              />
              <span className="text-base font-medium font-lato text-gray-800">
                {mentor.mentorName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorView;
