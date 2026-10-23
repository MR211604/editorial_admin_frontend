import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import LocationForm from "../components/locations/LocationForm";
import Modal from "../components/ui/modal/Modal";
import { useLocationMutations, useLocations } from "../hooks/useLocations";

const EMPTY_LOCATIONS = [];

export default function LocationsPage() {
  const { locations: response, isLoading, error } = useLocations();
  const { toggleLocationState } = useLocationMutations();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationToToggle, setLocationToToggle] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const locations = response?.data || EMPTY_LOCATIONS;

  const filteredLocations = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return locations.filter((location) =>
      `${location.name} ${location.address} ${location.mapsQuery}`
        .toLocaleLowerCase()
        .includes(query),
    );
  }, [locations, search]);

  const defaultSortOrder =
    locations.reduce(
      (highestOrder, location) =>
        Math.max(highestOrder, Number(location.sort_order) || 0),
      0,
    ) + 1;

  const openCreateForm = () => {
    setSelectedLocation(null);
    setIsFormOpen(true);
  };

  const openEditForm = (location) => {
    setSelectedLocation(location);
    setIsFormOpen(true);
  };

  const confirmToggleState = async () => {
    try {
      await toggleLocationState(locationToToggle.idLocation);
      toast.success(
        locationToToggle.state ? "Ubicación ocultada" : "Ubicación activada",
      );
      setLocationToToggle(null);
    } catch (mutationError) {
      toast.error(mutationError.message || "Error cambiando estado");
    }
  };

  return (
    <>
      <h1>Ubicaciones</h1>
      <hr />
      <p>
        Administra las tarjetas de puntos de venta que se muestran en la página
        pública de ubicaciones.
      </p>

      <div className="card">
        <div className="card-header">Listado de ubicaciones</div>
        <div className="card-body">
          <div className="d-flex flex-row gap-3 pb-4">
            <button
              className="btn btn-success"
              onClick={openCreateForm}
              disabled={isLoading}
            >
              Agregar ubicación
            </button>
            <input
              type="search"
              className="form-control w-50 ms-auto"
              placeholder="Buscar ubicación..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {isLoading ? (
            <p className="text-center">Cargando ubicaciones...</p>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              No fue posible cargar las ubicaciones.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered table-striped align-middle">
                <thead className="table-primary">
                  <tr className="text-center">
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Orden</th>
                    <th>Estado</th>
                    <th>Operaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLocations.map((location) => (
                    <tr key={location.idLocation}>
                      <td>{location.name}</td>
                      <td>{location.address}</td>
                      <td className="text-center">{location.sort_order}</td>
                      <td className="text-center">
                        <span
                          className={`badge ${location.state ? "bg-success" : "bg-secondary"}`}
                        >
                          {location.state ? "Visible" : "Oculta"}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-primary btn-sm"
                            title="Editar ubicación"
                            onClick={() => openEditForm(location)}
                          >
                            <i className="bi bi-pencil-square" />
                          </button>
                          <button
                            className={`btn btn-sm ${location.state ? "btn-danger" : "btn-success"}`}
                            title={location.state ? "Ocultar" : "Activar"}
                            onClick={() => setLocationToToggle(location)}
                          >
                            <i
                              className={`bi ${location.state ? "bi-eye-slash" : "bi-eye"}`}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!filteredLocations.length && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No se encontraron ubicaciones.
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
        <LocationForm
          key={selectedLocation?.idLocation || "new-location"}
          location={selectedLocation}
          defaultSortOrder={defaultSortOrder}
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedLocation(null);
          }}
        />
      )}

      <Modal
        isOpen={Boolean(locationToToggle)}
        onClose={() => setLocationToToggle(null)}
        title={`${locationToToggle?.state ? "Ocultar" : "Activar"} ubicación`}
        onSave={confirmToggleState}
        saveButtonText={locationToToggle?.state ? "Ocultar" : "Activar"}
        closeButtonText="Cancelar"
      >
        <p>
          ¿Está seguro que desea {locationToToggle?.state ? "ocultar" : "activar"} la ubicación{" "}
          <b>"{locationToToggle?.name}"</b>?
        </p>
      </Modal>
    </>
  );
}
