import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import TanstackTable from '@/backoffice/components/tanstack-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import Link from 'next/dist/client/link';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';

export interface IBlogView {
  columns: ColumnDef<any>[];
  refreshKey: number;
  handleRefresh: () => void;
  showAlertModal: boolean;
  setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmDelete: () => void;
}

const BlogView: React.FC<IBlogView> = ({ 
  columns, 
  refreshKey, 
  handleRefresh, 
  showAlertModal, 
  setShowAlertModal, 
  confirmDelete 
}) => {
  return (
    <>
      <TanstackTable 
        key={refreshKey}
        apiUrl="/v1/blog" 
        columns={columns}
        onRefresh={handleRefresh}
      >
        <Link href="/backoffice/cms/add-blog" className="block">
          <AddButton onClick={() => {}} text="Add Blog" />
        </Link>
      </TanstackTable>
      <AlertModal
        openModal={showAlertModal}
        setOpenModal={setShowAlertModal}
        setIsConfirmed={confirmDelete}
        messageText="Are you sure you want to delete this blog post?"
      />
    </>
  );
};

export default BlogView;
