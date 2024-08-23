import { registerCustomizations } from "@/backoffice/components/global-customization/globalCustomizations";
import { APIResponseTableProgram } from "./tableProgram.type";

export const TableProgramData: APIResponseTableProgram[] = [
  {
    id: "ejph5bh7nso2ubmh",
    class: "Kelas A Tefa SMK",
    type: "IICP",
    progress: 65,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "y8wdew7gii871jdo",
    class: "Kelas B Tefa SMK",
    type: "IICP",
    progress: 80,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "ts2xvhqr49xbdi8y",
    class: "Kelas C Tefa SMK",
    type: "Bootcamp",
    progress: 95,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "1zm8jcdafudtojb1",
    class: "Kelas D Tefa SMK",
    type: "IICP",
    progress: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "p2sgdtl6bje1sj1n",
    class: "Kelas E Tefa SMK",
    type: "Bootcamp",
    progress: 75,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

const programCustomTitles = {
  'ejph5bh7nso2ubmh': 'Kelas A Tefa SMK',
  'y8wdew7gii871jdo': 'Kelas B Tefa SMK',
  'ts2xvhqr49xbdi8y': 'Kelas C Tefa SMK',
  '1zm8jcdafudtojb1': 'Kelas D Tefa SMK',
  'p2sgdtl6bje1sj1n': 'Kelas E Tefa SMK'
};

const programCustomBreadcrumbs = {
  'ejph5bh7nso2ubmh': 'Kelas A Tefa SMK',
  'y8wdew7gii871jdo': 'Kelas B Tefa SMK',
  'ts2xvhqr49xbdi8y': 'Kelas C Tefa SMK',
  '1zm8jcdafudtojb1': 'Kelas D Tefa SMK',
  'p2sgdtl6bje1sj1n': 'Kelas E Tefa SMK'
};

registerCustomizations('program', programCustomTitles, programCustomBreadcrumbs);