import React, { useEffect } from 'react';
import { Datepicker as FlowbiteDatepicker } from 'flowbite-react';
import Image from 'next/image';

interface DatepickerProps {
  onReset?: (resetFunction: () => void) => void;
  selectedDate?: string;
  setSelectedDate?: (arg: string) => void;
}

const CalendarIcon = () => (
  <Image
    src="/img/manage-user/calendar.svg"
    width={25}
    height={24}
    alt="Calendar"
  />
);

export function Component({
  onReset,
  selectedDate,
  setSelectedDate,
}: DatepickerProps) {
  useEffect(() => {
    if (onReset && setSelectedDate) {
      onReset(() => setSelectedDate(''));
    }
  }, [onReset, setSelectedDate]);

  const parseDate = (dateString: string | undefined): Date | undefined => {
    if (!dateString) return undefined;
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
  };

  return (
    <FlowbiteDatepicker
      icon={CalendarIcon}
      // Kirimkan string format 'YYYY-MM-DD' atau string kosong jika tidak ada tanggal
      value={selectedDate || ''} // Menggunakan string sesuai dengan tipe yang diharapkan
      onSelect={(date) => {
        if (setSelectedDate && date instanceof Date) {
          setSelectedDate(date.toISOString().split('T')[0]); // Simpan tanggal sebagai string 'YYYY-MM-DD'
        }
      }}
    />
  );
}
