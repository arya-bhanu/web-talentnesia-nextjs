import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface InputPhoneNumberProps {
  value: string;
  onChange: (value: string) => void;
}

const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({ value, onChange }) => {
  const handleOnChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins">
      <PhoneInput
        country={'id'}
        value={value}
        onChange={handleOnChange}
        inputStyle={{ width: '100%', height: '100%', border: 'none' }}
        buttonStyle={{border: 'none'}}
        dropdownClass="bg-white dark:bg-gray-700 text-sm font-poppins"
        placeholder="Enter phone number"
        specialLabel=""
      />
    </div>
  );
};

export default InputPhoneNumber;
