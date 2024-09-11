import { ChangeEvent } from "react";

export interface SearchBarViewProps {
  placeHolder: string;
  className?: string;
  onMouseIn?: () => void;
  value?: string;
  mouseValue?: boolean,
  onMouseOut?: () => void,
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void
}
