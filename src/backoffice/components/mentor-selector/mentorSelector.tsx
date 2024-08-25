import { Dispatch, SetStateAction, useState } from 'react';
import { Badge, Checkbox, TextInput } from 'flowbite-react';
import { Mentor } from './mentorSelector.type';

function MentorSelector({
  selectedMentors,
  setSelectedMentors,
  defaultMentors,
}: {
  selectedMentors: Mentor[];
  setSelectedMentors: Dispatch<SetStateAction<Mentor[]>>;
  defaultMentors: Mentor[];
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMentorSelection = (mentor: Mentor) => {
    setSelectedMentors((prev) =>
      prev.map((el) => el.name).includes(mentor.name)
        ? prev.filter((m) => m.name !== mentor.name)
        : [...prev, mentor],
    );
  };

  return (
    <div className="relative">
      {/* Custom Select with Badges */}
      <div
        className="flex items-center border rounded-md p-2 cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {selectedMentors.length > 0 ? (
          selectedMentors.map((mentor) => (
            <Badge
              key={mentor.id}
              color="info"
              className="flex items-center mr-2"
            >
              <span className="flex items-center">
                {mentor.name}
                <span
                  className="ml-2 cursor-pointer flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMentorSelection(mentor);
                  }}
                >
                  <svg
                    className="w-4 h-4 text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#3795BD"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </span>
            </Badge>
          ))
        ) : (
          <span className="text-gray-500">Pilih Mentor</span>
        )}
        <span className="ml-auto">&darr;</span>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white border mt-1 rounded-md shadow-lg z-10">
          {/* Search Bar */}
          <div className="p-2">
            <TextInput
              placeholder="Search Mentor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <hr />
          {/* Mentor List with Checkboxes */}
          <div className="p-2 max-h-40 overflow-y-auto">
            {defaultMentors
              .filter((mentor) =>
                mentor.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((mentor) => (
                <div key={mentor.id} className="flex items-center mb-2">
                  <Checkbox
                    id={mentor.id}
                    value={mentor.name}
                    checked={selectedMentors.includes(mentor)}
                    onChange={() => toggleMentorSelection(mentor)}
                  />
                  <label htmlFor={mentor.id} className="ml-2">
                    {mentor.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MentorSelector;
