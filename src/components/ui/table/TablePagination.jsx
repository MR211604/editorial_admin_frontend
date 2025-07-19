import { Link } from "react-router-dom";

export default function TablePagination({ table }) {

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
      <ul className="pagination mb-0">
        <li className="page-item">
          <Link
            className={`page-link ${pageIndex === 0 ? 'disabled' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              pageIndex === 0 ? null : table.previousPage()
            }}            
          >
            Anterior
          </Link>
        </li>

        {pageIndex >= 3 && (
          <>
            <li className="page-item">
              <Link className="page-link" onClick={(e) => { e.preventDefault(); table.setPageIndex(0); }}>1</Link>
            </li>
            {pageIndex > 3 && (
              <Link className="page-item" onClick={(e) => { e.preventDefault(); table.setPageIndex(pageIndex - 3); }}><span className="page-link">...</span></Link>
            )}
          </>
        )}

        {pageIndex - 2 >= 0 && (
          <li className="page-item">
            <Link className="page-link" onClick={(e) => { e.preventDefault(); table.setPageIndex(pageIndex - 2); }}>
              {pageIndex - 1}
            </Link>
          </li>
        )}
        {pageIndex - 1 >= 0 && (
          <li className="page-item">
            <Link className="page-link" onClick={(e) => { e.preventDefault(); table.setPageIndex(pageIndex - 1); }}>
              {pageIndex}
            </Link>
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
            <Link className="page-link" onClick={(e) => { e.preventDefault(); table.setPageIndex(pageIndex + 1); }}>
              {pageIndex + 2}
            </Link>
          </li>
        )}
        {pageIndex + 2 < pageCount && (
          <li className="page-item">
            <Link className="page-link" onClick={(e) => { e.preventDefault(); table.setPageIndex(pageIndex + 2); }}>
              {pageIndex + 3}
            </Link>
          </li>
        )}

        {pageIndex + 3 < pageCount && (
          <>
            {pageIndex + 3 < pageCount - 1 && (
              <li className="page-item"><span className="page-link" onClick={(e) => { e.preventDefault(); table.setPageIndex(pageIndex + 3); }}>...</span></li>
            )}
            <li className="page-item">
              <Link className="page-link" onClick={(e) => { e.preventDefault(); table.setPageIndex(pageCount - 1); }}>
                {pageCount}
              </Link>
            </li>
          </>
        )}

        <li className="page-item">
          <Link
            className={`page-link ${pageIndex === pageCount - 1 ? 'disabled' : ''}`}
            onClick={(e) => { e.preventDefault(); pageIndex === pageCount - 1 ? null : table.nextPage(); }}
          >
            Siguiente
          </Link>
        </li>
      </ul>
  );
}

