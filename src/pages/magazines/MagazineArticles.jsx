import { Button, Card, Container, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from 'react-router-dom';
import MagazineArticlesTable from '../../components/magazines/MagazineArticlesTable';
import MagazineCreateArticle from '../../components/magazines/MagazineCreateArticle';
import MagazineUpdateArticle from '../../components/magazines/MagazineUpdateArticle';
import { usePublishing } from '../../hooks/usePublishings';
import { useModalCRUD } from '../../hooks/utils/useModalCRUD';


export default function MagazineArticles() {
  const { id } = useParams();
  const { publishing } = usePublishing(id);

  const { isModalOpen, closeModal, onCreateSuccess, onEditSuccess, handleCreateValue, selectedValue, handleEditValue } = useModalCRUD();

  return (
    <>
      <h1>Articulos de {publishing?.data.title}</h1>
      <hr />

      <Card className="mb-3">
        <Card.Header>Lista de articulos</Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="basic-info" id="magazineTabs" className="mb-3">
            <Tab eventKey="basic-info" title="Español">
              <Container>
                <Row>
                  <div className='d-flex justify-content-between align-items-center'>
                    <Button variant="success" className="mb-3" onClick={handleCreateValue}>Agregar Articulo</Button>
                  </div>
                </Row>
                <Row>
                  <MagazineArticlesTable publishing={publishing} handleEdit={handleEditValue} />
                </Row>
                <Row className="mt-3">
                  <div className="col-12 d-flex justify-content-end gap-2">
                    <Button variant="primary" className="mb-3">Guardar cambios</Button>
                  </div>
                </Row>
              </Container>
            </Tab>
            <Tab eventKey="authors" title="Inglés">
              <MagazineArticlesTable />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>


      {/* Modales para las opciones de la sub-pagina */}
      {
        isModalOpen('create') &&
        <MagazineCreateArticle publishing={publishing} isOpen={isModalOpen('create')} onClose={() => closeModal('create')} onCreateSuccess={onCreateSuccess} />
      }

      {
        isModalOpen('edit') && selectedValue &&
        <MagazineUpdateArticle isOpen={isModalOpen('edit')} onClose={() => closeModal('edit')} onSuccess={onEditSuccess} article={selectedValue} />
      }

    </>
  )
}
