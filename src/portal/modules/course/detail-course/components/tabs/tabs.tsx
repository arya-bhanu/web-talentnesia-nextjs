import React, { useState } from 'react';
import Profile from '../../../../../../../public/images/syakhira.png';
import Profile2 from '../../../../../../../public/images/kylo.png';
import Profile3 from '../../../../../../../public/images/photo-profile.png';
import DetailMentorview from '../detail-mentor-about/DetailMentor.view';
import CloseIcon from '../../../../../../../public/icons/course-detail/close-circle.svg'
import Image from 'next/image';

interface Mentor {
    name: string;
    role: string;
    image: string;
}

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('pendahuluan');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);


    const disableScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
        document.body.style.overflow = 'unset';
    };


    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const openModal = (mentor: Mentor) => {
        setSelectedMentor(mentor);
        setIsModalOpen(true);
        disableScroll();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMentor(null);
        enableScroll();
    };


    const mentors = [
        { name: "Syakhila Fauzi", role: "Student at SMKN 4 Malang", image: Profile.src },
        { name: "Kylo Dockry", role: "Web dev Wordpress at KitaMaju", image: Profile2.src },
        { name: "Jake Gallagher", role: "Hacker Basber", image: Profile3.src }
    ];

    return (
        <div>
            <div className="max-w-2xl mx-auto">
                <div className="border-b border-gray-200 dark:border-gray-700 mb-8 w-[160%] overflow-x-hidden overflow-y-hidden">
                    <ul className="flex flex-wrap -mb-px" role="tablist">
                        {['pendahuluan', 'modul', 'testimoni', 'mentor'].map((tab) => (
                            <li key={tab} className="mr-2" role="presentation">
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
                <div className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8 w-[160%] overflow-x-hidden overflow-y-hidden">
                    <div id="myTabContent">
                        {activeTab === 'pendahuluan' && (
                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                <p>Content for Pendahuluan</p>
                            </div>
                        )}
                        {activeTab === 'modul' && (
                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                <p>Content for Modul</p>
                            </div>
                        )}
                        {activeTab === 'testimoni' && (
                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                <p>Content for Testimoni</p>
                            </div>
                        )}
                        {activeTab === 'mentor' && (
                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                <div className='grid grid-cols-1 gap-4'>
                                    {mentors.map((mentor, index) => (
                                        <div key={index} className='flex items-center gap-2 cursor-pointer' onClick={() => openModal(mentor)}>
                                            <Image
                                                src={mentor.image}
                                                alt={mentor.name}
                                                width={50}
                                                height={50}
                                                className="rounded-full border-4 border-white"
                                            />
                                            <div>
                                                <strong className="font-medium text-gray-800 dark:text-white">{mentor.name}</strong>
                                                <p className="font-medium text-gray-500 dark:text-white">{mentor.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && selectedMentor && (
                <div className="fixed inset-0 flex items-center justify-center z-40 mt-14">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="bg-white rounded-lg shadow-lg z-50 p-4 relative w-full max-w-4xl mx-auto h-[85vh] overflow-y-auto">
                        <button onClick={closeModal} className="absolute top-2 right-2 p-4">
                            <CloseIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                        </button>
                        <DetailMentorview mentor={selectedMentor} />
                    </div>
                </div>
            )}

        </div>
    )}
export default Tabs;