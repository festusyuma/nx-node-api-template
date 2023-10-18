import { Pagination } from '../types';

export const updatePagination = (
  pagination: Pagination,
  totalItems: number
): Pagination => {
  return {
    ...pagination,
    totalItems,
    totalPages: Math.ceil(totalItems / pagination.size) || 1,
  };
};
