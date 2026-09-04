import { useInventory } from '@/stores/use-inventory';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);

  const { setProducts, loading ,updateInventoryLoadingStatus } = useInventory();

  // Fetch products for the current page
  const fetchProducts = async (page: number) => {
    updateInventoryLoadingStatus(true);
    try {
      const response = await api.get('/products/', {
        params: { page, page_size: pageSize }
      });

      const data = response.data;

      // Use optional chaining and provide a fallback empty array
      setProducts(data?.data || []);

      if (data?.pagination) {
        setTotalPages(data.pagination.total_pages);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Clear products on error to avoid stale data
    } finally {
      updateInventoryLoadingStatus(false);
    }
  };

  // Fetch products when page changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Calculate the range of page numbers to display
  let startPage = currentPage - 1;
  if (startPage <= 0) startPage = 1;
  let endPage = startPage + 2;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - 2 > 0 ? totalPages - 2 : 1;
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !loading) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 dark:text-whiteSecondary text-blackPrimary py-1 px-3 hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
      >
        {loading ? 'Loading...' : 'Prev'}
      </button>

      {pageNumbers.map(number => (
        <button
          key={number}
          className={`border border-gray-600 py-1 px-3 hover:border-gray-500 disabled:opacity-50 ${currentPage === number
              ? 'dark:bg-whiteSecondary bg-blackPrimary dark:text-blackPrimary text-whiteSecondary'
              : 'dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary'
            }`}
          onClick={() => handlePageChange(number)}
          disabled={loading}
        >
          {number}
        </button>
      ))}

      <button
        className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 dark:text-whiteSecondary text-blackPrimary py-1 px-3 hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;