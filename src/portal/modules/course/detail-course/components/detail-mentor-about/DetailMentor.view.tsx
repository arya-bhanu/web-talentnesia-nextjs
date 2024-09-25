import React, { useState } from 'react';
import Image from 'next/image';
import EmailIcon from '../../../../../../../public/icons/course-detail/mail.svg';
import PhoneIcon from '../../../../../../../public/icons/course-detail/phone.svg';
import LinkedInIcon from '../../../../../../../public/icons/course-detail/linkedin.svg';
import FeatureCardView from '../../../../../components/feature-card/FeatureCard.view';
import { Mentor } from './detailMentor.type';

const DetailMentorView: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
  const [activeTab, setActiveTab] = useState('About');
  if (!mentor) return null;
  

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Image
        key={i}
        src="/icons/star.svg"
        alt="star"
        width={16}
        height={16}
        className={i < rating ? "" : "opacity-30"}
      />
    ));
  };

  return (
    <div className="md:mx-auto w-full overflow-hidden">
      <h2 className="text-sm font-bold mb-4 text-[#667085] p-2">Detail Mentor</h2>
      <div className="px-5 py-2 flex flex-col gap-3 pb-6">
        <div className="flex items-start gap-4">
          <Image
            src={mentor.image}
            alt={mentor.name}
            height={30}
            width={30}
            className="h-[90px] w-[90px] rounded-full border-4 border-white"
          />
          <div>
            <h3 className="text-xl text-slate-900 font-bold">{mentor.name}</h3>
            <p className="text-sm text-gray-600">{mentor.role}</p>
            <div className="flex items-center mt-2">
              <span className="mr-2 text-sm text-gray-600">4.0</span>
              <div className="flex">{renderStars(4)}</div>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-[#241C4D]">1,234 students</span>
            </div>
          </div>
          <div className="flex items-start gap-6 ml-40">
            <div className="border-l-2 border-gray-200 pl-4 flex flex-col gap-2 min-h-[100px] py-2 ">
              <div className="flex items-center">
                <EmailIcon className="w-5 h-5 mr-2" />
                <span className="text-sm">{mentor.name}@gmail.com</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-2" />
                <span className="text-sm">+1 234 567 8900</span>
              </div>
              <div className="flex items-center">
                <LinkedInIcon className="w-5 h-5 mr-2" />
                <span className="text-sm">linkedin.com/in/{mentor.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mt-4">
          <div className="border-b border-gray-200 mb-8 w-[160%] overflow-x-hidden overflow-y-hidden">
            <ul className="flex space-x-4" role="tablist">
              {['About', 'Course'].map((tab) => (
                <li key={tab} role="presentation">
                  <button
                    className={`inline-block py-4 px-4 text-sm font-medium text-center border-b-2 ${activeTab === tab ? 'text-gray-800 border-gray-800' : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'} rounded-t-lg`}
                    onClick={() => handleTabClick(tab)}
                    role="tab"
                    aria-selected={activeTab === tab}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div id="myTabContent">
              {activeTab === 'About' && (
                <div className="text-gray-500 text-sm">
                  <p className='text-[#344054] pb-2'>Get to Know Your Mentor</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur voluptatum tempore sit temporibus obcaecati inventore molestiae, necessitatibus dolore! Ipsa aut ullam nemo expedita accusamus nisi eaque harum repudiandae corporis doloremque!</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur voluptatum tempore sit temporibus obcaecati inventore molestiae, necessitatibus dolore! Ipsa aut ullam nemo expedita accusamus nisi eaque harum repudiandae corporis doloremque!</p>

                  <div className="mt-6">
                    <h4 className="text-[#344054] text-xl font-semibold mb-4">Experience</h4>
                    <div className="flex items-start">
                      <Image
                        src="/images/image.png"
                        alt="Experience"
                        width={85}
                        height={85}
                        className="mr-4 mt-1"
                      />
                      <div>
                        <h2 className='text-black text-lg font-semibold'>PT Jaya Baya</h2>
                        <div className="pt-2">
                          <div className="flex items-center">
                            <p className='text-[#344054]'>Junior Website Developer</p>
                            <Image
                              src="/icons/course-detail/bulat.svg"
                              alt="Icon"
                              width={8}
                              height={8}
                              className="mx-2"
                            />
                            <p className='text-[#344054]'>3mos</p>
                          </div>
                          <div className="flex items-center">
                            <p className='text-[#344054]'>Jakarta, East Java, Indonesia</p>
                            <Image
                              src="/icons/course-detail/bulat.svg"
                              alt="Icon"
                              width={8}
                              height={8}
                              className="mx-2"
                            />
                            <p className='text-[#344054]'>Onsite</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Course' && (
                <div className="text-gray-500 text-sm">
                  <p className='text-[#344054] pb-2'>Explore Courses from Mentors</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error recusandae dignissimos ab sed vel nihil labore nisi, tenetur earum distinctio pariatur fugit aspernatur minus cumque rem! Odio quod ipsa accusamus!</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error recusandae dignissimos ab sed vel nihil labore nisi, tenetur earum distinctio pariatur fugit aspernatur minus cumque rem! Odio quod ipsa accusamus!</p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FeatureCardView
                      title="Sample Course 1"
                      logo="/path/to/course1-image.jpg"
                      level="Beginner"
                      description="A brief description of the course"
                      rating={4.5}
                      currentPrice={1000000}
                      originalPrice={1500000}
                      isLoading={false} url={''} />
                    <FeatureCardView
                      title="Sample Course 2"
                      logo="/path/to/course2-image.jpg"
                      level="Intermediate"
                      description="Another brief description"
                      rating={4.8}
                      currentPrice={1200000}
                      originalPrice={1800000}
                      isLoading={false} url={''} />
                    
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMentorView;
