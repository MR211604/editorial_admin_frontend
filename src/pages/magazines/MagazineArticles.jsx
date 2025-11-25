import { Button, Card, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate, useParams } from "react-router-dom";
import MagazineArticlesTable from "../../components/magazines/MagazineArticlesTable";
import MagazineCreateArticle from "../../components/magazines/MagazineCreateArticle";
import MagazineUpdateArticle from "../../components/magazines/MagazineUpdateArticle";
import { usePublishing } from "../../hooks/usePublishings";
import { useModalCRUD } from "../../hooks/utils/useModalCRUD";
import ModalDelete from "../../components/ui/modal/ModalDelete";
import { useDeletePublishingDetail } from "../../hooks/usePublishingsDetails";
import { useState } from "react";

export default function MagazineArticles() {
  const { id } = useParams();
  const { publishing } = usePublishing(id);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("spanish");
  const {
    isModalOpen,
    closeModal,
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess,
    handleCreateValue,
    selectedValue,
    handleEditValue,
    handleDeleteValue,
  } = useModalCRUD();

  const { deletePublishingMutation } = useDeletePublishingDetail(
    selectedValue?.id
  );

  const onDeleteArticleSuccess = () => {
    onDeleteSuccess();
    navigate(0);
  };

  //TODO: obtener el id de los lenguajes dinamicamente
  const getCurrentLanguageId = () => {
    return activeTab === "spanish" ? 1 : 2;
  };

  return (
    <>
      <h1>Articulos de {publishing?.data.title}</h1>
      <hr />

      <Card className="mb-3">
        <Card.Header>Lista de articulos</Card.Header>
        <Card.Body>
          <Tabs
            defaultActiveKey="spanish"
            onSelect={(k) => setActiveTab(k)}
            id="magazineTabs"
            className="mb-3"
          >
            <Tab eventKey="spanish" title="Español">
              <Container>
                <Row>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      variant="success"
                      className="mb-3"
                      onClick={handleCreateValue}
                    >
                      Agregar Articulo
                    </Button>
                  </div>
                </Row>
                <Row>
                  <MagazineArticlesTable
                    publishing={publishing}
                    languageId={1}
                    handleEdit={handleEditValue}
                    handleDelete={handleDeleteValue}
                  />
                </Row>
                <Row className="mt-3">
                  <div className="col-12 d-flex justify-content-end gap-2">
                    <Button
                      variant="secondary"
                      className="mb-3"
                      onClick={() => navigate(-1)}
                    >
                      Cancelar
                    </Button>
                    <Button variant="primary" className="mb-3">
                      Guardar cambios
                    </Button>
                  </div>
                </Row>
              </Container>
            </Tab>
            <Tab eventKey="english" title="Inglés">
              <Container>
                <Row>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      variant="success"
                      className="mb-3"
                      onClick={handleCreateValue}
                    >
                      Agregar Articulo
                    </Button>
                  </div>
                </Row>
                <Row>
                  <MagazineArticlesTable
                    publishing={publishing}
                    languageId={2}
                    handleEdit={handleEditValue}
                    handleDelete={handleDeleteValue}
                  />
                </Row>
                <Row className="mt-3">
                  <div className="col-12 d-flex justify-content-end gap-2">
                    <Button
                      variant="secondary"
                      className="mb-3"
                      onClick={() => navigate(-1)}
                    >
                      Cancelar
                    </Button>
                    <Button variant="primary" className="mb-3">
                      Guardar cambios
                    </Button>
                  </div>
                </Row>
              </Container>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      {/* Modales para las opciones de la sub-pagina */}
      {isModalOpen("create") && (
        <MagazineCreateArticle
          publishing={publishing}
          languageId={getCurrentLanguageId()}
          isOpen={isModalOpen("create")}
          onClose={() => closeModal("create")}
          onCreateSuccess={onCreateSuccess}
        />
      )}

      {isModalOpen("edit") && selectedValue && (
        <MagazineUpdateArticle
          isOpen={isModalOpen("edit")}
          onClose={() => closeModal("edit")}
          onEditSuccess={onEditSuccess}
          article={selectedValue}
        />
      )}

      {isModalOpen("delete") && selectedValue && (
        <ModalDelete
          isOpen={isModalOpen("delete")}
          onClose={() => closeModal("delete")}
          onSuccess={onDeleteArticleSuccess}
          selectedValue={selectedValue}
          title={selectedValue?.title}
          deleteMutationFn={deletePublishingMutation}
        />
      )}
    </>
  );
}
