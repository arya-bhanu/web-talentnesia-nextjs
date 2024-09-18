export interface listProgramDataResponse {
  id: string
  name: string
  image: string
  startDate: string
  endDate: string
  type?: string
  active?: number
  userCount: number
  progress?: string
  institutionId?: string;
}
