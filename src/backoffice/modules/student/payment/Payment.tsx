import React from 'react';
import PaymentView from './Payment.view';
import { paymentData } from './payment.data';

const Payment: React.FC = () => {
  return <PaymentView payments={paymentData} />;
};

export default Payment;
