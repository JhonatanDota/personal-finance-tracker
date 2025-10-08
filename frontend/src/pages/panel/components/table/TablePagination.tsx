import { PaginationMeta } from "../../../../types/pagination";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

type TablePaginationProps = {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
};

export default function TablePagination(props: TablePaginationProps) {
  const { meta, onPageChange } = props;
  const { currentPage, lastPage } = meta;

  function generatePages(): (number | string)[] {
    const pages = [];

    if (lastPage <= 5) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(lastPage - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < lastPage - 2) {
      pages.push("...");
    }

    pages.push(lastPage);

    return pages;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-primary-text">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="button-pagination"
      >
        <MdOutlineKeyboardArrowLeft />
      </button>

      {generatePages().map((page, index) =>
        typeof page === "string" ? (
          <span key={index} className="px-2">
            {page}
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border-[1px] rounded hover:border-tertiary transaction-colors ${
              currentPage === page
                ? "bg-primary border-tertiary"
                : "border-transparent"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="button-pagination"
      >
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
}
