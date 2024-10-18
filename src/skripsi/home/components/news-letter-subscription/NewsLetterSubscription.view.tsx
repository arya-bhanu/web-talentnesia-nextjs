import NewsLetterSubscriptionCard from '@/portal/components/news-letter-subscription-card';
import React from 'react';

const NewsLetterSubscriptionSectionView = ({
  className,
  isLoading
}: {
  className?: string;
  isLoading?: boolean;
}) => {
  return (
    <section className={className}>
      <NewsLetterSubscriptionCard
        subTitle="Mulai berlangganan newsletter kami untuk mendapatkan update artikel terbaru dari Talentnesia"
        color={{
          bg: 'bg-[#00558C]',
          text: 'text-[#FFFFFF]',
          input: '#FFFFFF',
        }}
        actionButton={{
          bgColor: 'bg-[#FFC862]',
          text: 'Gabung Sekarang',
          textColor: 'text-[#2B2E33]',
        }} 
        title="Dapatkan Wawasan Eksklusif Sesuai Minatmu Langsung melalui Emailmu"
        isLoading={isLoading}
      />
    </section>
  );
};

export default NewsLetterSubscriptionSectionView;
