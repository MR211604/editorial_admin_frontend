
export default function TablePagination({ table }) {

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
      <ul className="pagination mb-0">
        <li className="page-item">
          <a
            className={`page-link ${pageIndex === 0 ? 'disabled' : ''}`}
            onClick={() => pageIndex === 0 ? null : table.previousPage()}
            href="#"
          >
            Anterior
          </a>
        </li>

        {pageIndex >= 3 && (
          <>
            <li className="page-item">
              <a className="page-link" onClick={() => table.setPageIndex(0)}>1</a>
            </li>
            {pageIndex > 3 && (
              <a className="page-item" onClick={() => table.setPageIndex(pageIndex - 3)}><span className="page-link">...</span></a>
            )}
          </>
        )}

        {pageIndex - 2 >= 0 && (
          <li className="page-item">
            <a className="page-link" onClick={() => table.setPageIndex(pageIndex - 2)}>
              {pageIndex - 1}
            </a>
          </li>
        )}
        {pageIndex - 1 >= 0 && (
          <li className="page-item">
            <a className="page-link" onClick={() => table.setPageIndex(pageIndex - 1)}>
              {pageIndex}
            </a>
          </li>
        )}

        {/* Current page */}
        <li className="page-item active">
          <a className="page-link">
            {pageIndex + 1}
          </a>
        </li>

        {/* Pages after current */}

        {pageIndex + 1 < pageCount && (
          <li className="page-item">
            <a className="page-link" onClick={() => table.setPageIndex(pageIndex + 1)}>
              {pageIndex + 2}
            </a>
          </li>
        )}
        {pageIndex + 2 < pageCount && (
          <li className="page-item">
            <a className="page-link" onClick={() => table.setPageIndex(pageIndex + 2)}>
              {pageIndex + 3}
            </a>
          </li>
        )}

        {pageIndex + 3 < pageCount && (
          <>
            {pageIndex + 3 < pageCount - 1 && (
              <li className="page-item"><span className="page-link" onClick={() => table.setPageIndex(pageIndex + 3)}>...</span></li>
            )}
            <li className="page-item">
              <a className="page-link" onClick={() => table.setPageIndex(pageCount - 1)}>
                {pageCount}
              </a>
            </li>
          </>
        )}

        <li className="page-item">
          <a
            className={`page-link ${pageIndex === pageCount - 1 ? 'disabled' : ''}`}
            onClick={() => pageIndex === pageCount - 1 ? null : table.nextPage()}
          >
            Siguiente
          </a>
        </li>
      </ul>
  );
}

