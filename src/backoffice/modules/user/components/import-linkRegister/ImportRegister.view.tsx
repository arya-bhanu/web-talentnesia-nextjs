import React, { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import LinkRegis from '@/../public/icons/manage-user/link.svg';
import LinkRegis2 from '@/../public/icons/manage-user/linkGray.svg';
import Regenerate from '@/../public/icons/manage-user/regenerate.svg';
import CloseIcon from '@/../public/icons/manage-user/close.svg';
import ArrowDown from '@/../public/icons/arrow-down.svg';
import { SchoolAPI } from '@/backoffice/modules/school/api/schoolApi';
import { InviteTokenAPI } from './generateTokenApi';

interface School {
  id: string;
  name: string;
}

interface LinkRegisterModalViewProps {
  isOpen: boolean;
  onCopyLink: () => void;
  onClose: () => void;
  generatedLink: string; 
  setGeneratedLink: (link: string) => void; 
  selectedSchoolId: string;
  setSelectedSchoolId: (id: string) => void; 
}

const LinkRegisterModalView: React.FC<LinkRegisterModalViewProps> = ({
  isOpen,
  onCopyLink,
  onClose,
  generatedLink,
  setGeneratedLink,
  selectedSchoolId,
  setSelectedSchoolId,
}) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const fetchedSchools = await SchoolAPI.all();
      setSchools(fetchedSchools);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectSchool = (id: string) => {
    setSelectedSchoolId(id);
    setIsDropdownOpen(false);
  };

  const handleGenerateLink = async () => {
    if (!selectedSchoolId) {
      console.error('Please select a School ID before generating the link.');
      return;
    }

    try {
      const { registrationUrl } = await InviteTokenAPI.generate(selectedSchoolId);
      setGeneratedLink(registrationUrl); 
    } catch (error) {
      console.error('Error generating link:', error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink).then(() => {
      onCopyLink();
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleClose = () => {
    // Reset all states when closing the modal
    setSelectedSchoolId('');
    setGeneratedLink('');
    onClose();
  };
  
  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <CloseIcon className="w-6 h-6" />
        </button>
        <div className="text-lg font-semibold mb-8">Generate Link Registrasi</div>
        <div className="space-y-6">
          <label className="flex mb-[-22px]">
            School Name<div className="text-red-600">*</div>
          </label>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-full bg-[#EAECF0] text-[#323232] border border-transparent rounded-lg p-3 flex justify-between items-center"
            >
              {selectedSchoolId ? schools.find(school => school.id === selectedSchoolId)?.name: 'Select School Name'}
              <ArrowDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {schools.map((school) => (
                  <div
                    key={school.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectSchool(school.id)}
                  >
                    {school.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 mt-6">
          <label className="flex mb-[-22px]">
            Link<div className="text-red-600">*</div>
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative w-full">
              <div className="w-full absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#858D9D]">
                <LinkRegis2 className="w-6 h-6 text-[#858D9D]" />
              </div>
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="w-full pl-12 p-3 text-base border rounded-lg text-[#858D9D] bg-[#EAECF0] border-none"
              />
            </div>
            <button
              onClick={handleGenerateLink}
              className="flex items-center text-[#323232] bg-[#FFC862] hover:bg-[#FFB347] font-semibold rounded-lg text-sm px-5 py-3"
            >
              <Regenerate />
              <span className='ml-2'>Regenerate</span>
            </button>
          </div>
        </div>
        <div className='w-full flex justify-between mt-10'>
          <button
            onClick={handleCopyLink}
            className="flex items-center px-6 py-3 text-sm font-semibold bg-transparent border-2 border-[#FFC862] text-[#323232] rounded-lg hover:bg-[#FFB347]"
          >
            <LinkRegis />
            <span className='ml-2'>Copy Link</span>
          </button>
          <button
            onClick={handleClose}
            className="px-8 py-3 text-sm font-semibold bg-[#FFC862] text-[#323232] border rounded-lg hover:bg-[#FFB347]"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default LinkRegisterModalView;
