import { convertStrToTime } from '@/helpers/formatter.helper';
import { SortableContext } from '@dnd-kit/sortable';
import QuestionList from './components/question-list/QuestionList';
import { ExamListProps } from './detailExam.type';
import TimeReadOnly from './components/time-read-only/TimeReadOnly';

export const DetailExam: React.FC<{ content: ExamListProps }> = ({
  content,
}) => {
  return (
    <div className="font-lato">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <div className="items-center">
            <label className="text-xl break-words overflow-wrap font-semibold items-center">
              {content.title}
            </label>
          </div>
        </div>
        <div className="justify-end">
          <TimeReadOnly
            label={{ text: 'Duration' }}
            time={convertStrToTime(content?.duration || '00:00')}
            className="h-full justify-end"
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-poppins font-semibold text-sm">Questions</h2>
        </div>
        <div className="mt-8 flex flex-col gap-14">
          {content?.exams && (
            <SortableContext items={content.exams.map((exam) => exam.id)}>
              {content.exams.map((exam, index) => (
                <QuestionList
                  key={exam.id}
                  id={exam.id}
                  index={index}
                  questionType={exam.type}
                  content={{ data: exam }}
                />
              ))}
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  );
};
