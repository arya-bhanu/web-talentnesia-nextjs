export interface IPopover {
  index: number;
  openPopoverIndex: number;
  handleActionButtonRow: (id: number, action: 'delete' | 'edit') => void;
  id: number;
  setOpenPopoverIndex: (id: number) => void;
}
