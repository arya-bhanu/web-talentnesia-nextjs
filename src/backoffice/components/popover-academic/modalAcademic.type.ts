import { Dispatch, SetStateAction } from "react";

export interface IModalAcademic {
  handleActionButtonRow: (id: string, action: "delete" | "edit") => void;
  id: string;
  index: number;
  openModalIndex: number | null;
  setOpenModalIndex: Dispatch<SetStateAction<number | null>>;
  onUpdate: () => Promise<void>;
  onDelete: () => Promise<void>;
}