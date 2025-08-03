import { useParams } from "react-router-dom"
import CategoryUpdateForm from "../../components/categories/CategoryUpdateForm";
import { Card, Tab, Tabs } from "react-bootstrap";
import { useCategory } from "../../hooks/useCategories";
import { useMemo } from "react";


export default function CategoryUpdate() {

  const { id } = useParams();
  
  const { category, isLoading } = useCategory(id);

  const memoizedCategory = useMemo(() => category, [category]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <h1>Actualizando {memoizedCategory?.data.title}</h1>
      <hr />
      <p>Esta es la pagina de actualizacion de categorias</p>

      <Card className="mb-3">
        <Card.Header>Actualizando informacion de categorias</Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="basic-info" id="magazineTabs" className="mb-3">
            <Tab eventKey="basic-info" title="Español">
              <CategoryUpdateForm category={memoizedCategory} />
            </Tab>
            {/* <Tab eventKey="authors" title="Inglés">
              <CategoryUpdateForm category={category} />
            </Tab> */}
          </Tabs>
        </Card.Body>
      </Card>
    </>

  )
}
