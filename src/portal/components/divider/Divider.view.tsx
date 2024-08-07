import React from 'react';

export const DividerView = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <div className="border-t border-[#D0D3D9]"></div>
    </section>
  );
};
