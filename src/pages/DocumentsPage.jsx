import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import DocumentForm from "../components/documents/DocumentForm";
import Modal from "../components/ui/modal/Modal";
import { useDocumentMutations, useDocuments } from "../hooks/useDocuments";
import { useDebounce } from "../hooks/utils/useDebounce";

export default function DocumentsPage() {
  const { documents, isLoading, error } = useDocuments();
  const { toggleDocumentState } = useDocumentMutations();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentToChangeState, setDocumentToChangeState] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredDocuments = useMemo(() => {
    const query = debouncedSearch.trim().toLocaleLowerCase();
    return (documents?.data || []).filter((document) =>
      `${document.title} ${document.slug}`.toLocaleLowerCase().includes(query),
    );
  }, [documents, debouncedSearch]);
  const defaultSortOrder = (documents?.data || []).reduce(
    (highestOrder, document) =>
      Math.max(highestOrder, Number(document.sort_order) || 0),
    0,
  ) + 1;

  const openCreateForm = () => {
    setSelectedDocument(null);
    setIsFormOpen(true);
  };

  const openEditForm = (document) => {
    setSelectedDocument(document);
    setIsFormOpen(true);
  };

  const confirmChangeState = async () => {
    try {
      await toggleDocumentState(documentToChangeState.idDocument);
      toast.success(
        documentToChangeState.state
          ? "Documento desactivado"
          : "Documento activado",
      );
      setDocumentToChangeState(null);
    } catch (mutationError) {
      toast.error(mutationError.message || "Error cambiando estado");
    }
  };

  return (
    <>
      <h1>Documentos</h1>
      <hr />
      <p>
        Administra los documentos y el contenido MDX que se muestra en la página
        principal de la Editorial.
      </p>

      <div className="card">
        <div className="card-header">Listado de documentos</div>
        <div className="card-body">
          <div className="d-flex flex-row gap-3 pb-4">
            <button
              className="btn btn-success"
              onClick={openCreateForm}
              disabled={isLoading}
            >
              Agregar nuevo documento
            </button>
            <input
              type="search"
              className="form-control w-50 ms-auto"
              placeholder="Buscar documento..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {isLoading ? (
            <p className="text-center">Cargando documentos...</p>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              No fue posible cargar los documentos.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered table-striped align-middle">
                <thead className="table-primary">
                  <tr className="text-center">
                    <th>Título</th>
                    <th>Ruta</th>
                    <th>Orden</th>
                    <th>Estado</th>
                    <th>Operaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((document) => (
                    <tr key={document.idDocument}>
                      <td>{document.title}</td>
                      <td>
                        <code>/documentos/{document.slug}</code>
                      </td>
                      <td className="text-center">{document.sort_order}</td>
                      <td className="text-center">
                        <span
                          className={`badge ${document.state ? "bg-success" : "bg-secondary"}`}
                        >
                          {document.state ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-primary btn-sm"
                            title="Editar documento"
                            onClick={() => openEditForm(document)}
                          >
                            <i className="bi bi-pencil-square" />
                          </button>
                          <button
                            className={`btn btn-sm ${document.state ? "btn-danger" : "btn-success"}`}
                            title={document.state ? "Desactivar" : "Activar"}
                            onClick={() => setDocumentToChangeState(document)}
                          >
                            <i
                              className={`bi ${document.state ? "bi-x-circle" : "bi-check-circle"}`}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!filteredDocuments.length && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No se encontraron documentos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <DocumentForm
          key={selectedDocument?.idDocument || "new-document"}
          document={selectedDocument}
          defaultSortOrder={defaultSortOrder}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => setSelectedDocument(null)}
        />
      )}

      <Modal
        isOpen={Boolean(documentToChangeState)}
        onClose={() => setDocumentToChangeState(null)}
        title={`${documentToChangeState?.state ? "Desactivar" : "Activar"} documento`}
        onSave={confirmChangeState}
        saveButtonText={documentToChangeState?.state ? "Desactivar" : "Activar"}
        closeButtonText="Cancelar"
      >
        <p>
          ¿Está seguro que desea {documentToChangeState?.state ? "desactivar" : "activar"} el documento
          {" "}<b>"{documentToChangeState?.title}"</b>?
        </p>
      </Modal>
    </>
  );
}
