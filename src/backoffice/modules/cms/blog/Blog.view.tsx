import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import TanstackTable from '@/backoffice/components/tanstack-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import Link from 'next/dist/client/link';

export interface IBlogView {
  columns: ColumnDef<any>[];
}

const BlogView: React.FC<IBlogView> = ({ columns }) => {
  return (
    <>
    
      <div className="flex justify-between items-center font-poppins">
        <Link href="/backoffice/cms/add-blog" className="block">
          <AddButton onClick={() => {}} text="Add Blog" />
        </Link>
      </div>
      <TanstackTable apiUrl="/v1/blog" columns={columns} />
    </>
  );
};

export default BlogView;
