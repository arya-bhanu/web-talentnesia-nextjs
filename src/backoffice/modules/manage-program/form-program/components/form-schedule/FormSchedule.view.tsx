import LabelForm from '@/backoffice/components/label-form';
import TimeInput from '@/backoffice/components/time-input';
import { Datepicker } from 'flowbite-react/components/Datepicker';
import React, { Dispatch, SetStateAction } from 'react';

const FormScheduleView: React.FC<{
  timeInputState: { setTime: Dispatch<SetStateAction<Date>>; time: Date };
}> = ({ timeInputState }) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex-1">
        <LabelForm isImportant htmlFor="date">
          Date
        </LabelForm>
        <Datepicker />
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
