import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface ILink {
  label: string;
  link: string;
}

export interface FooterViewProps {
  className?: string;
  dataNavs: {
    title: string;
    links: ILink[];
  }[];
  query: UseQueryResult<AxiosResponse<any, any>, Error>;
}
