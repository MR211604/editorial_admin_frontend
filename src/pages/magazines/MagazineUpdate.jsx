import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from "react-router-dom";
import MagazineUpdateForm from "../../components/magazines/MagazineUpdateForm";
import { usePublishing } from "../../hooks/usePublishings";

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

      <Tabs defaultActiveKey="basic-info" id="magazineTabs" className="mb-3">
        <Tab eventKey="basic-info" title="Español">
          <MagazineUpdateForm publishing={publishing} />
        </Tab>
        <Tab eventKey="authors" title="Inglés">
          <MagazineUpdateForm publishing={publishing} />
        </Tab>
      </Tabs>

    </>
  )
}