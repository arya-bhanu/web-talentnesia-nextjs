export interface IicpData {
    testimonials?: any[];
    partners?: any[];
  }
  
  export interface IicpViewProps {
    data: IicpData;
  }
  
  export interface HomeProps {
    data?: IicpData;
    error?: string;
  }
  