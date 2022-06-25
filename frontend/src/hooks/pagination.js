import { useMemo } from 'react';

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({ page, total_pages, neighbors = 1 }) => {
  const paginationRange = useMemo(() => {
    // first [more] (neighbor) + current + (neighbor) [more] last
    const totalPagesShown = neighbors + 5;

    // First case: total_pages is less than needed for full pagination
    if (totalPagesShown >= total_pages) {
      return range(1, total_pages);
    }

    const leftNeighbourPos = Math.max(page - neighbors, 1);
    const rightNeighbourPos = Math.min(page + neighbors, total_pages);

    const showLeftDots = leftNeighbourPos > 2;
    const showRightDots = rightNeighbourPos < total_pages - 2;

    const firstPagePos = 1;
    const lastPagePos = total_pages;

    // Second case: only show right dots
    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + 2 * neighbors);
      return [...leftRange, 'dots', total_pages];
    }

    // Third case: only show right dots
    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * neighbors;
      const rightRange = range(total_pages - rightItemCount + 1, total_pages);
      return [firstPagePos, 'dots', ...rightRange];
    }

    // Fourth case: only show right dots
    if (showLeftDots && showRightDots) {
      let middleRange = range(leftNeighbourPos, rightNeighbourPos);
      return [firstPagePos, 'dots', ...middleRange, 'dots', lastPagePos];
    }
  }, [page, total_pages, neighbors]);

  return paginationRange;
};
