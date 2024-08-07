import { Button } from 'flowbite-react/components/Button';
import Link from 'next/link';
import React, { ReactNode } from 'react';

const FormLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      {children}
      <div className="mt-14 flex items-center gap-5 justify-end">
        <Button
          type="button"
          outline
          className="border transition-none delay-0 border-[#F04438] text-[#F04438] outline-transparent bg-transparent enabled:hover:bg-[#F04438] enabled:hover:text-white"
        >
          <Link className="" href={'/backoffice/manage-modul'}>
            Cancel
          </Link>
        </Button>
        <Button
          type="submit"
          color={'warning'}
          className="bg-[#FFC862] text-black"
        >
          Submit
        </Button>
      </div>
    </section>
  );
};

export default FormLayout;
