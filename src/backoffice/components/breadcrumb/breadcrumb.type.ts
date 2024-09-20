export interface BreadcrumbViewProps {
  pathSegments: string[];
  formattedSegments: string[];
  className?: string;
  currentPath?: string;
  moduleRoutePath: string;
}

export interface CustomBreadcrumbs {
  [key: string]: string;
}
