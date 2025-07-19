import { useParams } from "react-router-dom";
import { usePublishing } from "../../hooks/usePublishings";
import MagazineUpdateForm from "../../components/magazines/MagazineUpdateForm";

export default function MagazineUpdate() {

  const { id } = useParams();

  const {
    publishing,
    isPublishingLoading
  } = usePublishing(id);

  if (isPublishingLoading) {
    return <div>Cargando revista...</div>;
  }

  return (
    <>
      <h1>Actualizando {publishing?.data.title}</h1>
      <hr />
      <p>Esta es la pagina de actualizacion de revistas</p>

      {/* Tabs de Bootstrap */}
      <ul className="nav nav-tabs" id="magazineTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="basic-info-tab"
            data-bs-toggle="tab"
            data-bs-target="#basic-info"
            type="button"
            role="tab"
            aria-controls="basic-info"
            aria-selected="true"
          >
            Español
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="authors-tab"
            data-bs-toggle="tab"
            data-bs-target="#authors"
            type="button"
            role="tab"
            aria-controls="authors"
            aria-selected="false"
          >
            Inglés
          </button>
        </li>
      </ul>

      {/* Contenido de los tabs */}
      <div className="tab-content" id="magazineTabsContent">

        {/* Tab 1: Información Básica */}
        <div className="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="basic-info-tab">
          <div className="card mt-3">
            <div className="card-header">
              Formulario basico de revista
            </div>
            <div className="card-body">
              <MagazineUpdateForm publishing={publishing} />
            </div>
          </div>
        </div>

        <div className="tab-pane fade" id="authors" role="tabpanel" aria-labelledby="authors-tab">
          <div className="card mt-3">
            <div className="card-header">
              Formulario basico de revista (Inglés)
            </div>
            <div className="card-body">
              <MagazineUpdateForm publishing={publishing} />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}