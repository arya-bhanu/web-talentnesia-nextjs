import React, { useState } from 'react';

interface ExpandableInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ExpandableInput: React.FC<ExpandableInputProps> = ({ value, onChange, placeholder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      setIsExpanded(true); // Expand to textarea
    }
  };

  return isExpanded ? (
    <textarea
      className="w-full p-2 transition-all resize-none"
      style={{ border: 'none', borderBottom: '1px solid #ccc', outline: 'none' }}
      rows={4}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  ) : (
    <input
      type="text"
      className="w-full p-2 transition-all"
      style={{ border: 'none', borderBottom: '1px solid #ccc', outline: 'none' }}
      value={value}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
    />
  );
};

export default ExpandableInput;
