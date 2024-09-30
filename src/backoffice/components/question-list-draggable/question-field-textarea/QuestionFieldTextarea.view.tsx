import { Textarea } from 'flowbite-react/components/Textarea';
import React from 'react';

interface QuestionFieldTextareaViewProps {
  body: string;
  onBodyChange: (newBody: string) => void;
}

const QuestionFieldTextareaView: React.FC<QuestionFieldTextareaViewProps> = ({ body, onBodyChange }) => {
  return (
    <Textarea 
      id="comment" 
      placeholder="Answer" 
      rows={4} 
      value={body}
      onChange={(e) => onBodyChange(e.target.value)}
    />
  );
};

export default QuestionFieldTextareaView;
