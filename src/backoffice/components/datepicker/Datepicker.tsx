"use client";

import React, { useState } from 'react';
import { Datepicker as FlowbiteDatepicker } from "flowbite-react";
import Image from 'next/image';

const CalendarIcon = () => (
  <Image
    src="/img/manage-user/calendar.svg"
    width={25}
    height={24}
    alt="Calendar"
  />
);


export function Component() {
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <FlowbiteDatepicker
      icon={CalendarIcon}
      value={selectedDate}
      onSelectedDateChanged={(date) => setSelectedDate(date ? date.toDateString() : "")}
      placeholder="Select Date"
    />
  );
}
