export interface APIResponseManageModul {
  id: number;
  chapter?: any | null;
  modulName: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IManageModul {
  data?: APIResponseManageModul[];
}
