import React, { useState, useEffect, Suspense, lazy } from 'react';
import { StudentCourseAPI } from '@/backoffice/modules/student/course/api/studentCourseApi';
import { format, isValid } from 'date-fns';

const Task = lazy(() => import('../task/Task')); 

interface ExamProps {
  contentId: string;
}

const Exam: React.FC<ExamProps> = ({ contentId }) => {
  const [showTask, setShowTask] = useState(false);
  const [examData, setExamData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const storedAnswers = localStorage.getItem('taskAnswers');
        if (storedAnswers) {
          const parsedAnswers = JSON.parse(storedAnswers);
          if (parsedAnswers.contentId === contentId) {
            setExamData(parsedAnswers);
            setShowTask(true);
            return;
          }
        }
        const response = await StudentCourseAPI.fetchDetailContent(contentId);
        setExamData(response.data);
      } catch (error) {
        console.error('Error fetching exam data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchExamData();
  }, [contentId]);

  const handleExamComplete = () => {
    setShowTask(false);
  };

  const handleStartExam = async () => {
    try {
      await StudentCourseAPI.startExam(contentId);
      setShowTask(true);
    } catch (error) {
      console.error('Error starting exam:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formattedDate = examData && examData.date && isValid(new Date(examData.date))
    ? format(new Date(examData.date), 'dd-MM-yyyy HH:mm')
    : 'Invalid Date';

  return (
    <div>
      {showTask ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Task contentId={contentId} onExamComplete={handleExamComplete} />
        </Suspense>
      ) : (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Exam Details</h1>
          {examData && (
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500">Deadline Pengerjaan</p>
                <p className="font-semibold">{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-semibold">{examData.isCompleted ? 'Sudah Dikerjakan' : 'Belum Dikerjakan'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nilai</p>
                <p className="font-semibold">-</p>
              </div>
            </div>
          )}
          {examData && !examData.isCompleted && (
            <div className="flex justify-center mt-16 mb-6">
              <button
                className="focus:outline-none text-black bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-bold rounded-[30px] text-sm px-44 py-3 dark:focus:ring-yellow-900"
                onClick={handleStartExam}
              >
                Start Exam
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Exam;
