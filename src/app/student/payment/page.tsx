import PaymentView from '@/backoffice/modules/student/payment/Payment.view';
import { paymentData } from '@/backoffice/modules/student/payment/payment.data';

const PaymentPage = () => {
  return (
    <>
      <PaymentView payments={paymentData} />
    </>
  );
};

export default PaymentPage;
