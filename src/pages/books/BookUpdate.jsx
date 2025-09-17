import { useParams } from "react-router-dom";
import { usePublishing } from "../../hooks/usePublishings";
import { Card, Tab, Tabs } from "react-bootstrap";
import BookUpdateForm from "../../components/books/BookUpdateForm";

export default function BookUpdate() {
  const { id } = useParams();

  const { publishing, isPublishingLoading } = usePublishing(id);

  if (isPublishingLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <h1>Actualizando {publishing?.data.title}</h1>
      <hr />
      <p>Esta es la pagina de actualizacion de libros</p>

      <Card className="mb-3">
        <Card.Header>Actualizando informacion del libro</Card.Header>

        <Card.Body>
          <Tabs defaultActiveKey={"basic-info"} id="bookTabs" className="mb-3">
            <Tab eventKey={"basic-info"} title="Español">
              <BookUpdateForm publishing={publishing} />
            </Tab>
            <Tab eventKey={"basic-info-english"} title="Inglés">
              <BookUpdateForm publishing={publishing} />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
}
