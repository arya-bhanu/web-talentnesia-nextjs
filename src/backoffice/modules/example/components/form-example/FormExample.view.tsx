import React from 'react';

interface FormExampleViewProps {
  onSubmit: (event: React.FormEvent) => void;
}

const FormExampleView: React.FC<FormExampleViewProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormExampleView;
