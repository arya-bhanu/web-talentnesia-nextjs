import { CustomTitles } from '@/backoffice/components/title-navbar/titleNavbar.type';
import { CustomBreadcrumbs } from '@/backoffice/components/breadcrumb/breadcrumb.type';

export const globalCustomTitles: CustomTitles = {};
export const globalCustomBreadcrumbs: CustomBreadcrumbs = {};

export const manualCustomTitles: CustomTitles = {
  'manage-modul': 'Manage Modul',
  'create': 'Add Modul',
  'academic-level': 'Academic Levels'
};

export const manualCustomBreadcrumbs: CustomBreadcrumbs = {
    'manage-modul': 'Manage Modul',
    'create': 'Add Modul',
    'academic-level': 'Academic Levels'
  };

export function registerCustomizations(moduleName: string, titles?: CustomTitles, breadcrumbs?: CustomBreadcrumbs) {
  if (titles) {
    Object.assign(globalCustomTitles, titles);
  }
  if (breadcrumbs) {
    Object.assign(globalCustomBreadcrumbs, breadcrumbs);
  }
}

export function getCustomBreadcrumb(path: string): string | undefined {
  return manualCustomBreadcrumbs[path] || globalCustomBreadcrumbs[path];
}

export function getCustomTitle(path: string): string | undefined {
  return manualCustomTitles[path] || globalCustomTitles[path];
}
