'use client';
import clsx from 'clsx';
import { Button } from 'flowbite-react/components/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode, Suspense } from 'react';

const FormLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      {children}
      <Suspense fallback={<h1>Loading...</h1>}>
        <SuspenseFormLayoutButton />
      </Suspense>
    </section>
  );
};

function SuspenseFormLayoutButton() {
  const path = usePathname().split('/').pop();

  return (
    <div
      className={clsx(
        'mt-14 flex items-center gap-5 justify-end',
        path === 'add-exam' ? 'hidden' : '',
      )}
    >
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
  );
}

export default FormLayout;
