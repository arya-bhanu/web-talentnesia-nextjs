"use client";

import { CustomCard } from "@/backoffice/components/program-card/programCard";
import { programsData } from './program.data';

export default function ProgramView() {
  return (
    <div>
      <h1 className="font-poppins font-semibold text-[25px] mb-6">
        List Program
      </h1>
      <div className="space-x-3 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* {programsData.map((program) => (
          <CustomCard key={program.id} {...program} />
        ))} */}
      </div>
    </div>
  );
}
