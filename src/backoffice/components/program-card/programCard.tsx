import React from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface CustomCardProps {
  id: string;
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  userCount: number | null;
  institutionId?: string;
}

export function CustomCard({
  id,
  name,
  image,
  startDate,
  endDate,
  userCount,
  institutionId,
}: CustomCardProps) {
  const pathname = usePathname();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatus = () => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'Not Started';
    if (now > end) return 'Finished';
    return 'On Going';
  };

  const status = getStatus();
  const statusColor =
    status === 'Finished'
      ? 'bg-green-100 text-green-400'
      : status === 'On Going'
        ? 'bg-orange-100 text-orange-400'
        : 'bg-red-100 text-red-400';

  return (
    <Link
      href={`${pathname}detail-program?programId=${id}&schoolId=${institutionId}`}
    >
      <div className="relative max-w-full bg-white border border-gray-200 rounded-lg xl:rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
        <Image
          src={`${process.env.API_SERVER_URL}/v1/file/${image}` || ''}
          alt="Program Image"
          width={300}
          height={300}
          className="rounded-t-lg xl:rounded-t-2xl w-full h-48 object-cover"
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
              {name}
            </h5>
            <div className="flex items-center">
              <FaUser className="text-gray-500 mr-1" />
              <span className="text-gray-900 dark:text-white font-medium">
                {userCount || 0}
              </span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">{`${formatDate(startDate)} - ${formatDate(endDate)}`}</p>
        </div>
      </div>
    </Link>
  );
}
