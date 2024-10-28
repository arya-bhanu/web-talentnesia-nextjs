import NewsLetterSubscriptionCard from '@/portal/components/news-letter-subscription-card';
import React from 'react';

const NewsLetterSubscriptionSectionView = ({
  className,
  isLoading,
  heading,
  subheading,
}: {
  className?: string;
  isLoading?: boolean;
  heading: string;
  subheading: string;
}) => {
  return (
    <section className={className}>
      <NewsLetterSubscriptionCard
        subTitle={subheading}
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
        title={heading}
        isLoading={isLoading}
      />
    </section>
  );
};

export default NewsLetterSubscriptionSectionView;
