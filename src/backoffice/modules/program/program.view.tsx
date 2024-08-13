// src/app/backoffice/program/program.view.tsx

"use client";

import { CustomCard } from "@/backoffice/components/program-card/programCard";

export default function ProgramView() {
  return (
    <div>
        <h1 className="font-poppins font-semibold text-[25px] mb-6">
            List Program
        </h1>
    <div className="space-x-3 grid grid-cols-1 md:grid-cols-3 gap-5">
      <CustomCard
        imgSrc="/img/program-card/card-sample-1.svg"
        status="Finished"
        title="Kelas A Tefa SMK"
        periode="Periode Januari 2024 - Juni 2024"
        totalParticipants={40}
      />
      <CustomCard
        imgSrc="/img/program-card/card-sample-2.svg"
        status="On Going"
        title="Kelas B Tefa SMK"
        periode="Periode Januari 2024 - Juni 2024"
        totalParticipants={40}
      />
      <CustomCard
        imgSrc="/img/program-card/card-sample-3.svg"
        status="Not Started"
        title="Kelas C Tefa SMK"
        periode="Periode Januari 2024 - Juni 2024"
        totalParticipants={40}
      />
    </div>
    </div>
  );
}
