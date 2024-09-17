export interface IicpData {
    testimonials?: any[];
    partners?: any[];
  }
  
  export interface IicpViewProps {
    data: IicpData;
    isLoading?: boolean
  }
  
  export interface HomeProps {
    data?: IicpData;
    error?: string;
  }
  