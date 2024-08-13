export interface Issue {
  id: string;
  label: string;
}

export interface ContactFormViewProps {
  className?: string;
  selectedIssue: string;
  onIssueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  issues: Issue[];
}
