import React from 'react';
import { Question } from './task.type';

interface TaskViewProps {
  question: Question;
  onClick: () => void;
  isActive: boolean;
  isAnswered: boolean;
}

const TaskView: React.FC<TaskViewProps> = ({ question, onClick, isActive, isAnswered }) => {
  return (
    <div
      className={`flex items-center justify-center w-8 h-10 border rounded cursor-pointer transition ease-in-out
                 ${isAnswered ? 'bg-blue-200 border-blue-400 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-700'}
                 ${isActive && 'ring-1 ring-blue-500'}`}
      onClick={onClick}
    >
      {question.id}
    </div>
  );
};

export default TaskView;
