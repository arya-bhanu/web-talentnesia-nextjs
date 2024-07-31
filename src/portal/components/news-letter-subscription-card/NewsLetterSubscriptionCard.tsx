import clsx from 'clsx';
import React from 'react';
import RoundedPrimaryButton from '../rounded-primary-button';
const NewsLetterSubscriptionCard = ({
  title,
  subTitle,
  actionButton,
  color,
}: {
  title: string;
  subTitle: string;
  actionButton: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  color: {
    bg: string;
    text: string;
    input: string;
  };
}) => {
  const placeholderColor = `placeholder-[${color.input}]`;
  const borderColor = `border-b border-b-[${color.input}]`;
  return (
    <div
      className={clsx(
        color.bg,
        ' rounded-2xl md:rounded-3xl pl-8 md:pl-10 lg:pl-16 py-8 sm:py-10 md:py-16 pr-8 flex lg:items-end  items-center gap-6 md:gap-9 lg:gap-12 flex-wrap lg:flex-row flex-col ',
      )}
    >
      <div className={clsx(color.text, 'flex-[2]')}>
        <h3 className=" text-base sm:text-lg md:text-xl font-semibold font-poppins">
          {title}
        </h3>
        <p className=" text-xs md:text-sm font-[400] mt-4 md:mt-5 lg:mt-9">
          {subTitle}
        </p>
      </div>
      <input
        type="email"
        placeholder="Tulis email anda"
        className={clsx(
          color.text,
          'bg-transparent outline-none flex-[2] w-full py-2 md:text-sm',
          placeholderColor,
          borderColor,
        )}
      />
      <RoundedPrimaryButton className="px-6 w-full sm:w-fit">
        {actionButton.text}
      </RoundedPrimaryButton>
    </div>
  );
};

export default NewsLetterSubscriptionCard;
