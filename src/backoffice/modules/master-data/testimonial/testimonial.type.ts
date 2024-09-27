export interface TestimonialUser {
  id: string;
  name: string;
}

export interface Testimonial {
  id: string;
  code: string;
  name: string;
  description: string;
  active: number;
  user: TestimonialUser;
  createdBy: TestimonialUser;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}


export interface TestimonialResponse {
  data: {items:Testimonial[]}
}

export interface SingleTestimonialResponse {
  success: boolean;
  code: number;
  status: string;
  errors: any; 
  messages: string;
  data: Testimonial;
}

export interface TestimonialRequest {
  code: string;
  name: string;
  description: string;
  active: number;
  userId: string;
}

export interface ITestimonialView {
  data: Testimonial[];
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleActionButtonRow: (id: string, action: 'delete' | 'edit', rowData?: string) => void;
  handleAddTestimonial: (data: TestimonialRequest) => Promise<void>;
  Filter: string;
  setFilter: (value: string) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
  fetchData: () => Promise<void>;
  role: number;
}
