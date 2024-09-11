import React, { useState, useEffect } from 'react';
import TaskView from './Task.view';
import { Exam, Answer, StoredAnswers, TaskData, FileUploadResponse } from './task.type';
import TimerIcon from '@/../public/icons/timer.svg';
import ExpandableInput from '@/backoffice/components/expandable-textarea/ExpantdableInput';
import { Component as FileInput } from '@/backoffice/components/input-file-exam/InputFileExam';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';
import { useStatusModalStore } from '@/lib/store';
import { StudentCourseAPI } from '@/backoffice/modules/student/course/api/studentCourseApi';
import { fileHelper } from '@/helpers/file-manager/fileUpload.helper';

const Task: React.FC<{ contentId: string; onExamComplete: () => void }> = ({ contentId, onExamComplete }) => {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<Answer[]>(() => {
    const storedAnswers = localStorage.getItem('taskAnswers');
    if (storedAnswers) {
      const parsedAnswers: StoredAnswers = JSON.parse(storedAnswers);
      if (parsedAnswers.contentId === contentId) {
        return parsedAnswers.answers;
      }
    }
    return [];
  });
  const [activeExamId, setActiveExamId] = useState<string>('');

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerExpired, setTimerExpired] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { openModal: openStatusModal } = useStatusModalStore();

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await StudentCourseAPI.fetchDetailContent(contentId);
        setTaskData(response.data);
        setSelectedExam(response.data.exams[0]);
        setActiveExamId(response.data.exams[0].id);
        const durationInSeconds = parseDuration(response.data.duration);
        setTimeLeft(durationInSeconds);
      } catch (error) {
        console.error('Error fetching exam data:', error);
      }
    };

    fetchExamData();
  }, [contentId]);

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

  useEffect(() => {
    const storedAnswers: StoredAnswers = {
      contentId: contentId,
      answers: answers
    };
    localStorage.setItem('taskAnswers', JSON.stringify(storedAnswers));
  }, [answers, contentId]);

  useEffect(() => {
    if (isConfirmed) {
      handleSubmit();
    }
  }, [isConfirmed]);

  const parseDuration = (duration: string): number => {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours * 3600 + minutes * 60;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getExamNumber = (index: number) => {
    return (index + 1).toString().padStart(2, '0');
  };

  const handleExamClick = (examId: string) => {
    const exam = taskData?.exams.find(e => e.id === examId);
    setSelectedExam(exam || null);
    setActiveExamId(examId);
  };

  const handleAnswerChange = (questionId: string, optionId: string | null, valueText: string) => {
    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === questionId);
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, optionId, valueText };
        return updatedAnswers;
      } else {
        return [...prevAnswers, { questionId, optionId, valueText }];
      }
    });
  };

  const handleFileChange = async (file: File | null) => {
    if (file && selectedExam) {
      try {
        const response = await fileHelper.uploadExamFile(file, 'exam');
        if (response && response.path) {
          let filePath = typeof response.path === 'string' 
            ? response.path 
            : response.path.origins;
          
          const newAnswers = answers.map(answer => 
            answer.questionId === selectedExam.id 
              ? { ...answer, valueText: filePath, originalFileName: file.name } 
              : answer
          );
          
          if (!newAnswers.some(answer => answer.questionId === selectedExam.id)) {
            newAnswers.push({ questionId: selectedExam.id, optionId: null, valueText: filePath, originalFileName: file.name });
          }
          
          setAnswers(newAnswers);
          
          localStorage.setItem('taskAnswers', JSON.stringify({ 
            contentId, 
            answers: newAnswers.map(answer => ({
              ...answer,
              originalFileName: answer.originalFileName || file.name
            }))
          }));
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSubmitClick = () => {
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = answers.map(answer => ({
        questionId: answer.questionId,
        optionId: answer.optionId,
        valueText: answer.valueText
      }));
  
      await StudentCourseAPI.submitExam(contentId, formattedAnswers);
      
      localStorage.removeItem('taskAnswers');
      
      openStatusModal({
        status: 'success',
        action: 'create',
        message: 'Exam submitted successfully'
      });
  
      onExamComplete();
    } catch (error) {
      console.error('Error submitting exam:', error);
      openStatusModal({
        status: 'error',
        action: 'create',
        message: 'Failed to submit exam. Please try again.'
      });
    }
  };

  if (!taskData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <div className="w-48">
          <div className="grid grid-cols-5 gap-x-2 gap-y-4">
            {taskData.exams.map((exam, index) => (
              <TaskView
                key={exam.id}
                examNumber={getExamNumber(index)}
                onClick={() => handleExamClick(exam.id)}
                isActive={exam.id === activeExamId}
                isAnswered={answers.some(a => a.questionId === exam.id && (a.optionId || a.valueText))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="ml-8 p-4 w-full">
        {selectedExam && (
          <div>
            <div className="flex items-center mb-4">
              <div className="flex-grow">
                <h2 className="font-bold">Pertanyaan {getExamNumber(taskData.exams.indexOf(selectedExam))}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <TimerIcon className="w-6 h-6" />
                <span className="font-mono text-lg">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            <hr className="my-4 border-gray-300 mb-6" />
            <div dangerouslySetInnerHTML={{ __html: selectedExam.title }} className="mb-12" />
            <div className="space-y-2">
              {selectedExam.type === 'radio' && selectedExam.options ? (
                selectedExam.options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleAnswerChange(selectedExam.id, option.id, option.text)}
                    className={`flex items-center p-2 border rounded cursor-pointer transition ease-in-out 
                               ${answers.some(a => a.questionId === selectedExam.id && a.optionId === option.id) ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'} 
                               hover:bg-blue-50`}
                  >
                    {option.text}
                  </div>
                ))
              ) : selectedExam.type === 'textarea' ? (
                <ExpandableInput
                  value={answers.find(a => a.questionId === selectedExam.id)?.valueText || ''}
                  onChange={(value) => handleAnswerChange(selectedExam.id, null, value)}
                  placeholder="Type your answer here..."
                />
              ) : selectedExam.type === 'file' ? (
                <FileInput
                  id={`file-input-${selectedExam.id}`}
                  label="Upload File"
                  onChange={handleFileChange}
                  initialFilename={answers.find(a => a.questionId === selectedExam.id)?.originalFileName}
                />
              ) : null}
            </div>
            {selectedExam.id === taskData.exams[taskData.exams.length - 1].id && (
              <div className="mt-4 w-full">
                <button
                  onClick={handleSubmitClick}
                  className="w-full px-14 py-2 rounded-full bg-[#FFC862] hover:bg-[#ffb428] text-gray-700 flex items-center justify-center"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <AlertModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setIsConfirmed={setIsConfirmed}
        messageText="Are you sure you want to submit your exam?"
      />
    </div>
  );
};

export default Task;
