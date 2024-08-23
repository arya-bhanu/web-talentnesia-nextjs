export interface PaymentCardProps {
    title: string;
    status: 'success' | 'process' | 'failed';
    price: number;
    downloadLink: string;
    discount: number;
    tax: number;
  }
  
  export interface PaymentViewProps {
    payments: PaymentCardProps[];
  }
  