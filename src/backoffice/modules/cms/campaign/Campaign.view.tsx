import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import TanstackTable from '@/backoffice/components/tanstack-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import Link from 'next/dist/client/link';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';
import { SearchTable } from '@/backoffice/components/search-table/SearchTable';

export interface ICampaignView {
  columns: ColumnDef<any>[];
  apiUrl: string;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  showAlertModal: boolean;
  setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmDelete: () => void;
  refreshKey: number;
  handleRefresh: () => void;
}

const CampaignView: React.FC<ICampaignView> = ({
  columns,
  apiUrl,
  filter,
  setFilter,
  showAlertModal,
  setShowAlertModal,
  confirmDelete,
  refreshKey,
  handleRefresh,
}) => {
  return (
    <>
      <TanstackTable 
        key={refreshKey}
        apiUrl="/v1/campaign" 
        columns={columns}
        onRefresh={handleRefresh}
      >
        <Link href="/backoffice/cms/add-campaign" className="block">
          <AddButton onClick={() => {}} text="Add campaign" />
        </Link>
      </TanstackTable>
      <AlertModal
        openModal={showAlertModal}
        setOpenModal={setShowAlertModal}
        setIsConfirmed={confirmDelete}
        messageText="Are you sure you want to delete this campaign?"
      />
    </>
  );
};

export default CampaignView;
