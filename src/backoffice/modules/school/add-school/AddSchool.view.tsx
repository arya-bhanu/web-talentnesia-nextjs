import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  MouseEvent,
} from 'react';
import { Button, Card } from 'flowbite-react';
import AddSchool from './components/add';
import ModalAddProgram from '@/backoffice/components/modal-add-program/ModalAddProgram';
import { IAddSchoolView } from './addSchool.type';
import { TabFlex } from '../components/tabs/tabs';
import { IAccordionPanelDraggable } from '../components/accordion-panel-draggable/accordionPanelDraggable.type';
import { TabsProgram } from '../components/tabs-program/TabsProgram';
import { TabsListStudent } from '../components/tabs-list-student/TabsListStudent';

function AddSchoolView({
  open,
  selected,
  setOpen,
  setSelected,
  columns,
  rows,
  handleSubmitSelectedModul,
}: IAddSchoolView &
  Pick<IAccordionPanelDraggable, 'activeAccordion' | 'setActiveAccordion'> & {
    openModalModul: boolean;
    setOpenModalModul: Dispatch<SetStateAction<boolean>>;
    handleSubmitSelectedModul: (e: FormEvent<HTMLFormElement>) => void;
    className?: string;
  }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      title: 'Detail',
      content: (
        <div>
          <AddSchool />
        </div>
      ),
    },
    {
      title: 'Student',
      content: <TabsListStudent />,
    },
    {
      title: 'Program',
      content: <TabsProgram />,
    },
  ];

  return (
    <>
      <ModalAddProgram
        open={open}
        selected={selected}
        setOpen={setOpen}
        setSelected={setSelected}
        columns={columns}
        title="Select Program"
        rows={rows}
      />
      <TabFlex
        tabs={tabs}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </>
  );
}

export default AddSchoolView;
