import React from 'react';
import { Modal, Select } from 'flowbite-react';
import LabelForm from '@/backoffice/components/label-form';
import ModulProgress from '../modul-progres';
import AccordionPanelDraggable from '../accordion-panel-draggable/AccordionPanelDraggable';
import { CourseDetailProps } from './courseDetail.type';

const CourseDetailView: React.FC<CourseDetailProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [activeAccordion, setActiveAccordion] = React.useState<number>(1);
  const [openModalModul, setOpenModalModul] = React.useState(false);

  const handleSubmitSelectedModul = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
        <Modal.Header>Program Detail</Modal.Header>
        <Modal.Body>
          <Modal
            show={openModalModul}
            onClose={() => setOpenModalModul(false)}
            size="md"
          >
            <Modal.Header>Select Modul</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmitSelectedModul}>
                <div>
                  <LabelForm isImportant htmlFor="modul">
                    Modul Name
                  </LabelForm>
                  <Select id="modul" name="modul">
                    <option value={1}>Modul 1</option>
                    <option value={2}>Modul 2</option>
                    <option value={3}>Modul 3</option>
                  </Select>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          <div>
            <div className="flex items-center justify-between gap-10 mt-5">
              <ModulProgress progress={50} className="flex-1" />
            </div>
            <div className="mt-5">
              <AccordionPanelDraggable
                activeAccordion={activeAccordion}
                setActiveAccordion={setActiveAccordion}
                title="UX Design Principles"
                index={1}
                totalCurriculum={6}
                totalMinuteDuration={58}
                contents={[
                  {
                    date: new Date(),
                    durationMinute: 30,
                    title: 'Law',
                    type: '1',
                  },
                  {
                    date: new Date(),
                    durationMinute: 20,
                    title: 'Law Hick',
                    type: '2',
                  },
                  {
                    date: new Date(),
                    durationMinute: 20,
                    title: 'Law Hick',
                    type: '2',
                  },
                  {
                    date: new Date(),
                    durationMinute: 20,
                    title: 'Law Hick',
                    type: '1',
                  },
                  {
                    date: new Date(),
                    durationMinute: 20,
                    title: 'Law Hick',
                    type: '',
                  },
                  {
                    date: new Date(),
                    durationMinute: 20,
                    title: 'Law Hick',
                    type: '2',
                  },
                ]}
              />
              <AccordionPanelDraggable
                activeAccordion={activeAccordion}
                setActiveAccordion={setActiveAccordion}
                title="UI Design Principles"
                index={2}
                totalCurriculum={6}
                totalMinuteDuration={45}
                contents={[
                  {
                    date: new Date(),
                    durationMinute: 30,
                    title: 'Law',
                    type: '1',
                  },
                  {
                    date: new Date(),
                    durationMinute: 20,
                    title: 'Law Hick',
                    type: '2',
                  },
                ]}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CourseDetailView;
