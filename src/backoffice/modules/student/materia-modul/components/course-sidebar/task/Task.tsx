import React, { useState, useEffect } from 'react';
import TaskView from './Task.view';
import { questions } from './task.data';
import { Question } from './task.type';
import TimerIcon from '@/../public/icons/timer.svg';

interface SelectedAnswers {
  [key: number]: number | null;
}

const Task: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(questions[0]);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [activeQuestionId, setActiveQuestionId] = useState<number>(questions[0].id);

  const [timeLeft, setTimeLeft] = useState<number>(7200);
  const [timerExpired, setTimerExpired] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          setTimerExpired(true);
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTaskClick = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    setSelectedQuestion(question || null);
    setActiveQuestionId(questionId);
  };

  const handleChoiceClick = (questionId: number, choiceIndex: number) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: choiceIndex
    }));
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <div className="w-48">
          <div className="grid grid-cols-5 gap-x-2 gap-y-4">
            {questions.map(question => (
              <TaskView
                key={question.id}
                question={question}
                onClick={() => handleTaskClick(question.id)}
                isActive={question.id === activeQuestionId}
                isAnswered={selectedAnswers[question.id] !== undefined}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${selectedAnswers[activeQuestionId] !== undefined ? 'bg-[#46AEC7]' : 'bg-gray-500'}`} />
              <span className="text-sm">Terjawab</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${selectedAnswers[activeQuestionId] === undefined ? 'bg-blue-500' : 'bg-gray-500'}`} />
              <span className="text-sm whitespace-nowrap">Belum Terjawab</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-8 p-4 w-full">
        {selectedQuestion ? (
          <div>
            <div className="flex items-center mb-4">
              <div className="flex-grow">
                <h2 className="font-bold">Pertanyaan {selectedQuestion.id}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <TimerIcon className="w-6 h-6" />
                <span className="font-mono text-lg">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            <hr className="my-4 border-gray-300 mb-6" />
            <p className="mb-12">{selectedQuestion.content}</p>
            <div className="space-y-2">
              {selectedQuestion.choices.map((choice, index) => (
                <div
                  key={index}
                  onClick={() => handleChoiceClick(selectedQuestion.id, index)}
                  className={`flex items-center p-2 border rounded cursor-pointer transition ease-in-out 
                             ${selectedAnswers[selectedQuestion.id] === index ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'} 
                             hover:bg-blue-50`}
                >
                  {choice}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Task;
