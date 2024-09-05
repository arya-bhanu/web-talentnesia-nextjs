import { IAccessRight } from '@/types/global.type';

export const isGrantedPermission = (
  currentPathname: string,
  pathPermitted: string,
  codePermitted: string,
  access: IAccessRight[] | null,
) => {
  const shortCurrPathname = currentPathname
    .split('/')
    .filter((s) => s !== '')
    .pop();
  const shortPathPermitted = pathPermitted
    .split('/')
    .filter((s) => s !== '')
    .pop();
  if (access) {
    if (shortCurrPathname === shortCurrPathname) {
      if (access.map((el) => el.code).includes(codePermitted)) {
        return true;
      }
    }
  }
  return false;
};
