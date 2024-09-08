import { QuestionListProps } from '../../detailExam.type';

const QuestionList: React.FC<QuestionListProps> = ({
  id,
  index,
  questionType,
  content,
}) => {
  console.log(content?.data);

  return (
    <div className="flex items-start gap-5">
      <div className="font-semibold text-md">{index + 1}.</div>

      {/* Question Title */}
      <div className="flex-[2]">
        <div className="flex flex-col gap-1">
          <label className="w-fit">Question</label>
          <div
            className="w-full border-0 border-b-2 p-2"
            dangerouslySetInnerHTML={{ __html: content?.data.title || '' }}
          />

          {/* Options */}
          {content?.data.options && (
            <ul className="list-disc list-inside mt-4 pl-5">
              {content.data.options.map((option) => (
                <li key={option.id} className="my-2">
                  <span>{option.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
