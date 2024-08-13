"use client";

import { FaUser } from "react-icons/fa"; // Import icon orang

interface CustomCardProps {
  imgSrc: string;
  status: "Finished" | "On Going" | "Not Started";
  title: string;
  periode: string;
  totalParticipants: number;
}

export function CustomCard({
  imgSrc,
  status,
  title,
  periode,
  totalParticipants,
}: CustomCardProps) {
  // Define color based on status
  const statusColor =
    status === "Finished"
      ? "bg-green-100 text-green-400"
      : status === "On Going"
      ? "bg-orange-100 text-orange-400"
      : "bg-red-100 text-red-400"; // Red color for "Not Started"

  return (
    <div className="relative max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Image Section */}
      <img
        src={imgSrc}
        alt="Program Image"
        className="rounded-t-lg w-full h-48 object-cover"
      />

      {/* Status Badge di Pojok Kiri Atas */}
      <div className="absolute top-2 left-2">
        <span
          className={`inline-block rounded-[9px] px-3 py-1.5 text-sm font-normal ${statusColor}`} // More rounded and slightly taller
        >
          {status}
        </span>
      </div>

      {/* Konten Card tanpa Padding */}
      <div className="p-4"> {/* Menghilangkan semua margin dan padding */}
        {/* Title dan Jumlah Partisipan */}
        <div className="flex justify-between items-baseline">
          <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <div className="flex items-center">
            <FaUser className="text-gray-500 mr-1" />
            <span className="text-gray-900 dark:text-white font-medium">
              {totalParticipants}
            </span>
          </div>
        </div>

        {/* Deskripsi Periode */}
        <p className="text-gray-500 text-sm">
          {periode}
        </p>
      </div>
    </div>
  );
}

export function Component() {
  return (
    <div className="flex space-x-4">
      <CustomCard
        imgSrc="/path/to/image1.jpg"
        status="Finished"
        title="Kelas A Tefa SMK"
        periode="Periode Januari 2024 - Juni 2024"
        totalParticipants={40}
      />
      <CustomCard
        imgSrc="/path/to/image2.jpg"
        status="On Going"
        title="Kelas B Tefa SMK"
        periode="Periode Januari 2024 - Juni 2024"
        totalParticipants={40}
      />
      <CustomCard
        imgSrc="/path/to/image3.jpg"
        status="Not Started"
        title="Kelas C Tefa SMK"
        periode="Periode Januari 2024 - Juni 2024"
        totalParticipants={40}
      />
    </div>
  );
}
