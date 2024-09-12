import React from 'react';

interface TaskViewProps {
  examNumber: string;
  onClick: () => void;
  isActive: boolean;
  isAnswered: boolean;
}

const TaskView: React.FC<TaskViewProps> = ({ examNumber, onClick, isActive, isAnswered }) => {
  return (
    <div
      className={`flex items-center justify-center w-8 h-10 border rounded cursor-pointer transition ease-in-out
                 ${isAnswered ? 'bg-[#46AEC7] border-blue-400 text-white' : 'bg-gray-100 border-gray-300 text-gray-700'}
                 ${isActive && (isAnswered ? 'ring-2 ring-[#2A9D8F]' : 'ring-2 ring-[#219EBC] bg-[#D3ECF2] border-[#D3ECF2] text-black')}`}
      onClick={onClick}
    >
      {examNumber}
    </div>
  );
};

export default TaskView;
