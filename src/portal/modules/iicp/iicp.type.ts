export interface IicpData {
    testimonials?: Testimonials[];
    partners?: Partners[];
  }
  
  export interface Testimonials {
    photo?: string;
    fullName?: string;
    statusUser?: string;
    description?: string;
  }

  export type Partners = {
    logo: string;
    link?: string;
  };

  export interface IicpViewProps {
    data: IicpData;
    isLoading?: boolean
  }
  
  export interface HomeProps {
    data?: IicpData;
    error?: string;
  }
  