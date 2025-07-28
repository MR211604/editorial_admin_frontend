import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  imagePlugin,
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
import { Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Modal from '../ui/modal/Modal';

export default function MagazineUpdateArticle({ isOpen, onClose, onEditSuccess, article }) {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      URL: '',
      summary: ''
    }
  })

  const onSubmit = (data) => {
    console.log('Form data:', data);
    onEditSuccess();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a una API
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        saveButtonText='Guardar Artículo'
        closeButtonText='Cancelar'
        size="lg"
        onSave={() => handleSubmit(onSubmit)()}
        title={`Editando ${article?.title}`}
        showFooter={true}>
        <Form>
          <Row className="mb-3">
            <Form.Group controlId="formTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control isInvalid={!!errors.title} type="text" placeholder="Ingrese el título" {...register('title', {
                required: 'El título es obligatorio',
                minLength: {
                  value: 3,
                  message: 'El título debe tener al menos 3 caracteres'
                }
              })} />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="formURL">
              <Form.Label>URL</Form.Label>
              <Form.Control isInvalid={!!errors.URL} type="text" placeholder="Ingrese la URL" {...register('URL', {
                required: 'La URL es obligatoria',
                minLength: {
                  value: 3,
                  message: 'El título debe tener al menos 3 caracteres'
                }
              })} />
              <Form.Control.Feedback type="invalid">
                {errors.URL?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group controlId="formSummary">
              <Form.Label>Resumen</Form.Label>
              <MDXEditor
                markdown="#Hello world"
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

                  // Plugin de toolbar con todos los componentes
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
                      </>
                    )
                  })
                ]}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
