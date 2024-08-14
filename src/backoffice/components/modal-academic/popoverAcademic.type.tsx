export interface IPopoverAcademic {
  handleActionButtonRow: (id: string, action: "delete" | "edit") => void;
  id: string;
  index: number;
  openPopoverIndex: number | null;
  setOpenPopoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onUpdate: () => Promise<void>;
  onDelete: () => Promise<void>;
}