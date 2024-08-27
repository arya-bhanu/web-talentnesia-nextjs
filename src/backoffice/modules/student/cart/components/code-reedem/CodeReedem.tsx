import React, { useState } from 'react';
import CodeReedemView from './CodeReedem.view';

const CodeReedem: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [discountMessage, setDiscountMessage] = useState<string | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    if (code === 'PROMO20') {
      setDiscountMessage('Discount 33.33%');
    } else {
      setDiscountMessage('Kode promo salah!');
    }
  };

  const handleCancel = () => {
    setCode('');
    setDiscountMessage(undefined);
  };

  return (
    <CodeReedemView
      code={code}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      discountMessage={discountMessage}
      onCancel={handleCancel}
      className="mt-4 w-40 flex"
    />
  );
};

export default CodeReedem;
