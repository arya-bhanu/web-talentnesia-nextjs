'use client';

import { useState } from 'react';
import { CustomCard } from '@/backoffice/components/program-card/programCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import { fetchIicpListProgram } from './api/listProgram.api';
import { listProgramDataResponse } from './listProgram.type';

export const ListProgramView = () => {
  const [hasMore, setHasMore] = useState(true);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['iicp-programs'],
      queryFn: ({ pageParam = 1 }) => fetchIicpListProgram(pageParam),
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.data.meta.currentPage + 1;
        return nextPage <= lastPage.data.meta.lastPage ? nextPage : undefined;
      },
      initialPageParam: 1,
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    } else {
      setHasMore(false);
    }
  };

  const allPrograms = data?.pages.flatMap((page) => page.data.items) || [];

  return (
    <Loading isLoading={isLoading}>
      <h1 className="font-poppins font-semibold text-[25px] mb-6">
        List Program
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {allPrograms.map((program: listProgramDataResponse) => (
          <CustomCard key={program.id} {...program} />
        ))}
      </div>
      {hasMore ? (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={!hasNextPage || isFetchingNextPage}
            className="px-4 py-2 text-blue-500 font-semibold hover:text-blue-600 disabled:text-gray-300"
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
                ? 'View More'
                : 'No more data'}
          </button>
        </div>
      ) : (
        <p className="mt-6 text-center text-blue-500 font-semibold">
          All available data has been loaded.
        </p>
      )}
    </Loading>
  );
};
