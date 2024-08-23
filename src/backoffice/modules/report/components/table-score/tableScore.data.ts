import { APIResponseTableScore } from "./tableScore.type";
import { format } from 'date-fns';

export const TableScoreData: APIResponseTableScore[] = [
  {
    id: 'myl9bcdph3ump2t2',
    studentName: 'Ancika',
    deadline: format(new Date(), 'dd MMMM yyyy HH:mm'),
    submitDate: format(new Date(), 'dd MMMM yyyy HH:mm'),
    status: 'On Time',
    score: 80,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'ny2ssbpig8vt1440',
    studentName: 'Bram',
    deadline: format(new Date(), 'dd MMMM yyyy HH:mm'),
    submitDate: format(new Date(), 'dd MMMM yyyy HH:mm'),
    status: 'On Time',
    score: 87,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'qw94zogehpkjh6xd',
    studentName: 'Cinda',
    deadline: format(new Date(), 'dd MMMM yyyy HH:mm'),
    submitDate: format(new Date(), 'dd MMMM yyyy HH:mm'),
    status: 'On Time',
    score: 90,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'k0qx1tcsuc3wd3sn',
    studentName: 'Dani',
    deadline: format(new Date(), 'dd MMMM yyyy HH:mm'),
    submitDate: format(new Date(), 'dd MMMM yyyy HH:mm'),
    status: 'Late',
    score: 85,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8yc1wxj5gd5qvlof',
    studentName: 'Eko',
    deadline: format(new Date(), 'dd MMMM yyyy HH:mm'),
    submitDate: format(new Date(), 'dd MMMM yyyy HH:mm'),
    status: 'Missed',
    score: 80,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]