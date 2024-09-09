import React, { useState, useMemo } from 'react';
import { DataTable } from '@/backoffice/modules/user/components/data-table/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { SearchTable } from '@/backoffice/components/search-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import Image from 'next/image';

interface CertificateData {
  id: string;
  title: string;
  image: string;
  isDownload: number;
  active: number;
}

interface CertificateProps {
  certificates: CertificateData[];
}

const Certificate: React.FC<CertificateProps> = ({ certificates }) => {
  const [filter, setFilter] = useState('');

  const activeCertificates = certificates.filter(cert => cert.active === 1);

  const columns = useMemo<ColumnDef<CertificateData>[]>(
    () => [
      {
        id: 'no',
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: 'title',
        header: ({ column }) => <SortingTable column={column} title="Chapter" />,
        cell: (info) => info.getValue(),
      },
      {
        id: 'certificate',
        header: 'Certificate',
        cell: (info) => (
          <button 
            className={`inline-flex items-center justify-center gap-2 px-20 py-3 text-sm font-semibold text-gray-700 rounded-full shadow-sm transition-all duration-150 ${
              info.row.original.active === 1 
                ? 'bg-[#FFC862] hover:bg-[#ffc24f]' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={info.row.original.active !== 1}
            onClick={() => handleDownload(info.row.original)}
          >
            <Image
                    src="/icons/download.svg"
                    alt="download"
                    width={25}
                    height={25}
                    className="transition-transform"
                  />
            Download
          </button>
        ),
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return activeCertificates.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [activeCertificates, filter]);

  const handleDownload = (certificate: CertificateData) => {
    if (certificate.active === 1) {
      window.open(certificate.image, '_blank');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Certificate</h1>
      <div className="mb-4">
        <SearchTable value={filter} onChange={setFilter} />
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        filter={{ Filter: filter, setFilter: setFilter }}
      />
    </div>
  );
};

export default Certificate;
