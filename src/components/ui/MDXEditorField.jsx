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
  UndoRedo,
} from "@mdxeditor/editor";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useCallback, useMemo, useRef, useState } from "react";
import { resolveMdxImageUrls } from "../../helpers/mdxImages";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB en bytes

export default function MDXEditorField({
  name,
  control,
  onImageAdded,
  label,
  helpText,
  placeholder = "Inserte su contenido aquí",
}) {
  const editorRef = useRef(null);
  const [overlayContainer, setOverlayContainer] = useState(null);
  const setOverlayContainerRef = useCallback((element) => {
    if (element) setOverlayContainer(element);
  }, []);

  const handleInputImageUpload = useCallback(
    async (image) => {
      if (image.size > MAX_FILE_SIZE) {
        toast.error("La imagen debe ser menor a 1MB");
        throw new Error("La imagen debe ser menor a 1MB");
      }

      // Crear URL temporal para la vista previa
      const objectUrl = URL.createObjectURL(image);

      // Pasar la imagen y la URL al padre para guardarla en estado
      if (onImageAdded) {
        onImageAdded(objectUrl, image);
      }

      return objectUrl;
    },
    [onImageAdded],
  );

  const plugins = useMemo(
    () => [
      // Plugins básicos
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      thematicBreakPlugin(),
      markdownShortcutPlugin(),

      // Plugins de links e imágenes
      linkPlugin(),
      linkDialogPlugin(),
      imagePlugin({
        imageUploadHandler: handleInputImageUpload,
        imageAutocompleteSuggestions: [],
      }),

      // Plugins de tablas y código
      tablePlugin(),
      codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
      codeMirrorPlugin({
        codeBlockLanguages: {
          js: "JavaScript",
          css: "CSS",
          txt: "text",
          tsx: "TypeScript",
        },
      }),

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
        ),
      }),
    ],
    [handleInputImageUpload],
  );

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div ref={setOverlayContainerRef}>
        {overlayContainer && (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <MDXEditor
                ref={editorRef}
                markdown={resolveMdxImageUrls(field.value || placeholder)}
                onChange={(value) => {
                  field.onChange(value);
                }}
                contentEditableClassName="mdx-editor-content"
                overlayContainer={overlayContainer}
                plugins={plugins}
              />
            )}
          />
        )}
      </div>
      <Form.Text className="text-muted">{helpText}</Form.Text>
    </Form.Group>
  );
}
