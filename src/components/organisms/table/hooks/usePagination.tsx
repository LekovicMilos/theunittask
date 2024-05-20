import { useState, useEffect } from 'react';

export const usePagination = (data: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / itemsPerPage));

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data, itemsPerPage]);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return { paginatedData, currentPage, totalPages, handlePreviousPage, handleNextPage };
};