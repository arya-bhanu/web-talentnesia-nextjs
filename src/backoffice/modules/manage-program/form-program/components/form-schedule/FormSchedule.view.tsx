import LabelForm from '@/backoffice/components/label-form';
import TimeInput from '@/backoffice/components/time-input';
import { Datepicker } from 'flowbite-react';
import React, { Dispatch, SetStateAction } from 'react';

const FormScheduleView: React.FC<{
  timeInputState: { setTime: Dispatch<SetStateAction<Date>>; time: Date };
  dateInputState: { setDate: Dispatch<SetStateAction<Date>>; date: Date };
}> = ({ timeInputState, dateInputState }) => {
  return (
    <div className="flex items-start gap-5 min-h-[30vh]">
      <div className="flex-1">
        <LabelForm isImportant htmlFor="date">
          Date
        </LabelForm>
        <Datepicker
          defaultDate={dateInputState.date}
          onSelectedDateChanged={(date) => dateInputState.setDate(date)}
        />
      </div>
      <div className="flex-1">
        <TimeInput
          setTime={timeInputState.setTime}
          time={timeInputState.time}
          label={{
            isImportant: true,
            text: 'Time',
          }}
        />
      </div>
    </div>
  );
};

export default FormScheduleView;
