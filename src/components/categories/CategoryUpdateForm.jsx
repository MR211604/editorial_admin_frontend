
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  CreateLink,
  headingsPlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo
} from '@mdxeditor/editor';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SelectCategories from "../magazines/SelectCategories";

export default function CategoryUpdateForm({ category }) {

  const navigate = useNavigate();

  console.log('Category data:', category);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: category?.data.title,
      description: category?.data.description,
      category_id: category?.data.category_id,
      is_featured: category?.data.is_featured
    }
  })

  const onSubmit = (data) => {
    console.log(data)
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row>
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Titulo de categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la categoria"
                {...register("title", { required: true })}
              />
              <Form.Text className="text-muted">
                Ingrese un título de categoría
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la descripcion de la categoria"
                {...register("description", { required: true })}
              />
              <Form.Text className="text-muted">
                Ingrese una descripción corta de la categoría
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Categoria Padre</Form.Label>
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <>
                    <SelectCategories onCategoryChange={(e) => field.onChange(e.target.value)}
                      selectedCategory={field.value} className="form-select"
                    />
                  </>
                )}
              />
              <Form.Text className="text-muted">
                Seleccione la categoría de la publicación
              </Form.Text>
            </Form.Group>
          </Col>

          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Mostrar en novedades</Form.Label>
              <Controller
                name="is_featured"
                control={control}
                render={({ field }) => (
                  <Form.Select {...field}>
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </Form.Select>
                )}
              />
              <Form.Text className="text-muted">
                Seleccione si desea mostrar la categoría como destacada
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Acerca de</Form.Label>
              <MDXEditor
                markdown="Inserte su resumen aquí"
                contentEditableClassName="mdx-editor-content"
                plugins={[
                  // Plugins básicos
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),

                  // Plugins de links e imágenes
                  linkPlugin(),
                  linkDialogPlugin(),
                  imagePlugin(),
                  // Plugins de tablas y código
                  tablePlugin(),
                  codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),

                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <Separator />
                        <BlockTypeSelect />
                        <ListsToggle />
                        <Separator />
                        <InsertTable />
                        <InsertThematicBreak />
                        <InsertImage />
                      </>
                    )
                  })
                ]}
              />
              <Form.Text className="text-muted">
                Ingrese la descripcion de la categoria
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Consejo editorial</Form.Label>
              <MDXEditor
                markdown="Inserte su resumen aquí"
                contentEditableClassName="mdx-editor-content"
                plugins={[
                  // Plugins básicos
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),

                  // Plugins de links e imágenes
                  linkPlugin(),
                  linkDialogPlugin(),
                  imagePlugin(), //!ESTO TIENE QUE MODIFICARSE PARA QUE FUNCIONE CON EL BACKEND
                  linkDialogPlugin(),

                  // Plugins de tablas y código
                  tablePlugin(),
                  codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),

                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <Separator />
                        <BlockTypeSelect />
                        <ListsToggle />
                        <Separator />
                        <InsertTable />
                        <InsertThematicBreak />
                        <InsertImage />
                        <CreateLink />
                      </>
                    )
                  })
                ]}
              />
              <Form.Text className="text-muted">
                Ingrese Información sobre consejo editorial
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Politica editorial
              </Form.Label>
              <MDXEditor
                markdown="Inserte su resumen aquí"
                contentEditableClassName="mdx-editor-content"
                plugins={[
                  // Plugins básicos
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),

                  // Plugins de links e imágenes
                  linkPlugin(),
                  linkDialogPlugin(),
                  imagePlugin(),
                  // Plugins de tablas y código
                  tablePlugin(),
                  codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),

                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <Separator />
                        <BlockTypeSelect />
                        <ListsToggle />
                        <Separator />
                        <InsertTable />
                        <InsertThematicBreak />
                        <InsertImage />
                      </>
                    )
                  })
                ]}
              />
              <Form.Text className="text-muted">
                Ingrese Información sobre Politica editorial
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Norma editorial</Form.Label>
              <MDXEditor
                markdown="Inserte su resumen aquí"
                contentEditableClassName="mdx-editor-content"
                plugins={[
                  // Plugins básicos
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),

                  // Plugins de links e imágenes
                  linkPlugin(),
                  linkDialogPlugin(),
                  imagePlugin(), //!ESTO TIENE QUE MODIFICARSE PARA QUE FUNCIONE CON EL BACKEND
                  linkDialogPlugin(),

                  // Plugins de tablas y código
                  tablePlugin(),
                  codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),

                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <Separator />
                        <BlockTypeSelect />
                        <ListsToggle />
                        <Separator />
                        <InsertTable />
                        <InsertThematicBreak />
                        <InsertImage />
                        <CreateLink />
                      </>
                    )
                  })
                ]}
              />
              <Form.Text className="text-muted">
                Ingrese Información sobre Norma editorial
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Proceso de Aceptación</Form.Label>
              <MDXEditor
                markdown="Inserte su resumen aquí"
                contentEditableClassName="mdx-editor-content"
                plugins={[
                  // Plugins básicos
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),

                  // Plugins de links e imágenes
                  linkPlugin(),
                  linkDialogPlugin(),
                  imagePlugin(),
                  // Plugins de tablas y código
                  tablePlugin(),
                  codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),

                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <Separator />
                        <BlockTypeSelect />
                        <ListsToggle />
                        <Separator />
                        <InsertTable />
                        <InsertThematicBreak />
                        <InsertImage />
                      </>
                    )
                  })
                ]}
              />
              <Form.Text className="text-muted">
                Ingrese Información sobre Proceso de Aceptación
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Contacto editorial</Form.Label>
              <MDXEditor
                markdown="Inserte su resumen aquí"
                contentEditableClassName="mdx-editor-content"
                plugins={[
                  // Plugins básicos
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),

                  // Plugins de links e imágenes
                  linkPlugin(),
                  linkDialogPlugin(),
                  imagePlugin(), //!ESTO TIENE QUE MODIFICARSE PARA QUE FUNCIONE CON EL BACKEND
                  linkDialogPlugin(),

                  // Plugins de tablas y código
                  tablePlugin(),
                  codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),

                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <Separator />
                        <BlockTypeSelect />
                        <ListsToggle />
                        <Separator />
                        <InsertTable />
                        <InsertThematicBreak />
                        <InsertImage />
                        <CreateLink />
                      </>
                    )
                  })
                ]}
              />
              <Form.Text className="text-muted">
                Ingrese Información sobre Contacto editorial
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <div className="col-12 d-flex justify-content-end gap-2">
            <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>Cancelar</Button>
            <Button variant="primary" className="mb-3">Guardar cambios</Button>
          </div>
        </Row>

      </Container>
    </Form>
  )
}
