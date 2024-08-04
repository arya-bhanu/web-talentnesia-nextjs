import React, { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { CategoryViewProps } from './category.type';

export const CategoryView: React.FC<CategoryViewProps> = ({
  categories,
  selectedCategory,
  hoveredCategory,
  setSelectedCategory,
  setHoveredCategory,
  handleCategoryClick,
}) => {

  return (
    <div className="bg-[#F9FAFB] rounded-lg shadow-sm">
      <ul className="">
        {categories.map((category, index) => (
          <li key={index}>
            <button
              className={clsx(
                'w-full text-left p-4 font-semibold text-[#344054] transition-colors flex justify-between items-center font-poppins',
                selectedCategory === category.title
                  ? 'bg-[#00B3AD] text-white'
                  : 'hover:bg-[#00B3AD] hover:text-white',
              )}
              onClick={() => handleCategoryClick(category)}
              onMouseEnter={() => setHoveredCategory(category.title)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <span>{category.title}</span>
              <Image
                src={
                  selectedCategory === category.title
                    ? '/img/faq/category/arrow-right-white.svg'
                    : hoveredCategory === category.title
                    ? '/img/faq/category/arrow-right-white.svg'
                    : '/img/faq/category/arrow-right-black.svg'
                }
                width={6}
                height={6}
                alt="arrow-right"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
