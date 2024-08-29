import React from 'react';
import Link from 'next/link';
import { FaUser } from "react-icons/fa";

interface CustomCardProps {
  imgSrc: string;
  status: "Finished" | "On Going" | "Not Started";
  title: string;
  periode: string;
  totalParticipants: number;
  id: string;
}

export function CustomCard({
  imgSrc,
  status,
  title,
  periode,
  totalParticipants,
  id,
}: CustomCardProps) {
  const statusColor =
    status === "Finished"
      ? "bg-green-100 text-green-400"
      : status === "On Going"
      ? "bg-orange-100 text-orange-400"
      : "bg-red-100 text-red-400";

  return (
    <Link href={`/operator/program/${id}`}>
      <div className="relative max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
        <img
          src={imgSrc}
          alt="Program Image"
          className="rounded-t-lg w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span
            className={`inline-block rounded-[9px] px-3 py-1.5 text-sm font-normal ${statusColor}`}
          >
            {status}
          </span>
        </div>
        <div className="p-4">
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
          <p className="text-gray-500 text-sm">{periode}</p>
        </div>
      </div>
    </Link>
  );
}
