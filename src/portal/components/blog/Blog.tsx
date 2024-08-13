'use client'
import React, { useState, useEffect } from 'react';
import Blogview from './Blog.view';
import { recentArticles } from './Blog.data';
import { Article } from './blog.type';

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const articlesPerPage = 12;

const Blog = () => {
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
    <>
      <Blogview
        articles={paginatedArticles}
        currentPage={currentPage}
        totalPages={Math.ceil(recentArticles.length / articlesPerPage)}
        onPageChange={handlePageChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(recentArticles.length / articlesPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Blog;
