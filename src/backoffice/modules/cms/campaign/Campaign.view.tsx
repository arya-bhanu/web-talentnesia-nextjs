import { AddButton } from '@/backoffice/components/add-button-table/AddButtonTable';
import { DataTable } from '@/backoffice/components/data-table/DataTable';
import { SearchTable } from '@/backoffice/components/search-table/SearchTable';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/dist/client/link';
import React, { Dispatch, SetStateAction } from 'react';

export interface ICampaignView {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  columns: ColumnDef<any>[];
}

const dataCampagin = [
  {
    title: 'New Year Discount',
    discount: 'Discount 1',
    date: {
      dateStart: 'Jan 12th 2024',
      dateEnd: ' Jan 30th 2024',
    },
    status: 'finished',
    id: '1',
  },
];

const CampaignView: React.FC<ICampaignView> = ({
  filter,
  columns,
  setFilter,
}) => {
  return (
    <>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={filter} onChange={setFilter} />
        <Link href="/backoffice/manage-modul/create" className="block">
          <AddButton onClick={() => {}} text="Add Module" />
        </Link>
      </div>
      <DataTable
        data={dataCampagin}
        columns={columns}
        sorting={[]}
        filter={{ Filter: filter, setFilter }}
      />
    </>
  );
};

export default CampaignView;
