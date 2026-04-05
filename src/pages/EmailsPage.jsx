import { EmailColumns } from "../components/emails/EmailColumns";
import ToolBar from "../components/ui/ToolBar";
import Table from "../components/ui/table/Table";
import { useEmails } from "../hooks/useEmails";
import { useDebounce } from "../hooks/utils/useDebounce";
import { usePage } from "./hooks/usePage";

export default function EmailsPage() {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,

    // Handlers específicos
    searchHandler,
  } = usePage();

  const debouncedSearch = useDebounce(search, 300);
  const { allEmails, isAllEmailsLoading } = useEmails(
    pagination.pageIndex + 1,
    pagination.pageSize,
    sorting,
    debouncedSearch,
  );

  const bannerColumns = EmailColumns();

  return (
    <>
      <h1>Correos</h1>
      <hr />
      <p>
        Aqui puedes encontrar una lista de todos los emails registrados a partir
        de la pagina de contacto de la web principal.
      </p>

      <div className="card">
        <div className="card-header">Listado de correos</div>

        <div className="card-body">
          <ToolBar
            hasCreateClick={false}
            search={search}
            onSearchChange={searchHandler}
            searchPlaceholder="Buscar correo..."
          />

          <Table
            paginatedTableData={allEmails}
            columns={bannerColumns}
            pagination={pagination}
            setPagination={setPagination}
            isTableDataLoading={isAllEmailsLoading}
            sorting={sorting}
            setSorting={setSorting}
            setSearch={setSearch}
          />
        </div>
      </div>
    </>
  );
}
