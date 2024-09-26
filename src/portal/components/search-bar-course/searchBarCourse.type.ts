import { ChangeEvent } from "react";

export interface SearchBarCourseViewProps {
  placeHolder: string;
  className?: string;
  onMouseIn?: () => void;
  value?: string;
  mouseValue?: boolean,
  onMouseOut?: () => void,
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void
}
