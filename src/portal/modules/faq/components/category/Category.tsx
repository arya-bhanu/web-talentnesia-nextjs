'use client';

import React, { useState } from 'react';
import { categories } from './category.data';
import { CategoryView } from './Category.view';
import { CategoryProps } from './category.type';

export const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: CategoryProps) => {
    setSelectedCategory(category.title);
    window.location.hash = category.url; // Mengatur hash URL
  };

  return (
    <CategoryView
      categories={categories}
      selectedCategory={selectedCategory}
      hoveredCategory={hoveredCategory}
      setSelectedCategory={setSelectedCategory}
      setHoveredCategory={setHoveredCategory}
      handleCategoryClick={handleCategoryClick}
    />
  );
};
