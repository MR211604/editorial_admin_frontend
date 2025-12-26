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
import { useUploadCategoryImage } from "../../hooks/useCategories";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB en bytes

export default function MDXEditorField({
  name,
  control,
  label,
  helpText,
  placeholder = "Inserte su contenido aquí",
}) {
  const { uploadCategory } = useUploadCategoryImage();
  const editorRef = useRef(null);

  const handleInputImageUpload = useCallback(
    async (image) => {
      // Validar tamaño primero
      if (image.size > MAX_FILE_SIZE) {
        toast.error("La imagen debe ser menor a 1MB");
        throw new Error("La imagen debe ser menor a 1MB");
      }

      const formData = new FormData();
      formData.append("file", image);
      const nombreSinExtension = image.name.replace(/\.[^/.]+$/, "");
      formData.append("title", nombreSinExtension);

      try {
        const { data } = await uploadCategory(formData);
        toast.success("Imagen subida correctamente");
        return data.url;
      } catch (error) {
        toast.error(error.message || "Error al subir imagen");
        throw error;
      }
    },
    [uploadCategory]
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
    [handleInputImageUpload]
  );

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MDXEditor
            ref={editorRef}
            markdown={field.value || placeholder}
            onChange={(value) => {
              field.onChange(value);
            }}
            contentEditableClassName="mdx-editor-content"
            plugins={plugins}
          />
        )}
      />
      <Form.Text className="text-muted">{helpText}</Form.Text>
    </Form.Group>
  );
}
