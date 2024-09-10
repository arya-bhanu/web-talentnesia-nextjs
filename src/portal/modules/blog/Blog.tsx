'use client';
import React, { useState, useEffect } from 'react';
import Blogview from './Blog.view';
import { recentArticles } from './Blog.data';
import { Article } from './blog.type';

const articlesPerPage = 12;

export const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedArticles, setPaginatedArticles] = useState<Article[]>(recentArticles);

  useEffect(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    setPaginatedArticles(recentArticles.slice(startIndex, endIndex));
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= Math.ceil(recentArticles.length / articlesPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <Blogview
      articles={paginatedArticles}
      currentPage={currentPage}
      totalPages={Math.ceil(recentArticles.length / articlesPerPage)}
      onPageChange={handlePageChange}
    />
  );
};

