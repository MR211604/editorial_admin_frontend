import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from 'react-router-dom';
import { usePublishing } from '../../hooks/usePublishings';

export default function MagazineArticles() {
  const { id } = useParams();

  const { publishing } = usePublishing(id)

  return (
    <>
      <h1>Articulos de {publishing?.data.title}</h1>
      <hr />

      <Tabs defaultActiveKey="basic-info" id="magazineTabs" className="mb-3">
        <Tab eventKey="basic-info" title="Español">
          <p>Contenido en español</p>
        </Tab>
        <Tab eventKey="authors" title="Inglés">
          <p>Contenido en inglés</p>
        </Tab>
      </Tabs>

    </>
  )
}
