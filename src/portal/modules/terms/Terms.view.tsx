import { Breadcrumb } from '@/portal/components/breadcrumb';
import React from 'react';
import { ListCard } from './components/list-card';
import { Content } from './components/content';

export const TermsView = () => {
  return (
    <main className="container mt-28">
      <Breadcrumb pathSegments={['']} />
      <div className="flex flex-col md:flex-row gap-8 mx-auto">
        <div className="order-2 md:order-1 flex-1 min-w-[300px] md:w-2/3">
          <Content />
        </div>
        <div className="order-1 md:order-2 flex-none md:w-1/3">
          <ListCard />
        </div>
      </div>
    </main>
  );
};
