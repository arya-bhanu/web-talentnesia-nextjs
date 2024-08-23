import { IAccordionPanelDraggable } from '../accordion-panel-draggable/accordionPanelDraggable.type';

export const accordionData: Omit<IAccordionPanelDraggable, 'activeAccordion' | 'setActiveAccordion'>[] = [
  {
    index: 1,
    title: "UX Design Principles",
    totalCurriculum: 6,
    totalMinuteDuration: 58,
    contents: [
      {
        date: new Date(),
        durationMinute: 30,
        title: "Law",
        type: "1",
      },
      {
        date: new Date(),
        durationMinute: 20,
        title: "Law Hick",
        type: "2",
      },
      {
        date: new Date(),
        durationMinute: 20,
        title: "Ronaldo",
        type: "3",
      },
      {
        date: new Date(),
        durationMinute: 20,
        title: "Messi",
        type: "4",
      },
      {
        date: new Date(),
        durationMinute: 20,
        title: "Law Hick",
        type: "3",
      },
      {
        date: new Date(),
        durationMinute: 20,
        title: "Law Hick",
        type: "2",
      },
    ],
  },
  {
    index: 2,
    title: "UI Design Principles",
    totalCurriculum: 6,
    totalMinuteDuration: 45,
    contents: [
      {
        date: new Date(),
        durationMinute: 30,
        title: "Law",
        type: "4",
      },
      {
        date: new Date(),
        durationMinute: 20,
        title: "Law Hick",
        type: "2",
      },
    ],
  },
];
