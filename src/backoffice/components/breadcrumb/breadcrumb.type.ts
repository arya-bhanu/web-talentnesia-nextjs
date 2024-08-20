export interface BreadcrumbViewProps {
  pathSegments: string[];
  formattedSegments: string[];
  className?: string;
  currentPath?: string;
}

export interface CustomBreadcrumbs {
  [key: string]: string;
}
