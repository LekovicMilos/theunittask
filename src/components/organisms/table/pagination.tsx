// Pagination.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => (
  <div className="flex items-center justify-end space-x-2 py-4">
    <span>
      {' '}
      Page {currentPage} of {totalPages}{' '}
    </span>
    <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
      Previous
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
);

export default Pagination;
