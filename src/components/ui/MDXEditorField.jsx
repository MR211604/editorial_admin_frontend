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

export default function MDXEditorField({
  name,
  control,
  label,
  helpText,
  placeholder = "Inserte su contenido aquí",
}) {
  const handleInputImageUpload = (image) => {
    const formData = new FormData();
    formData.append("image", image);
    console.log("Uploading image...", image);
    return new Promise((resolve) => {
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(image);
        console.log("Image uploaded:", imageUrl);
        resolve(imageUrl);
      }, 2000);
    });
  };

  const plugins = [
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
  ];

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MDXEditor
            markdown={field.value || placeholder}
            onChange={field.onChange}
            contentEditableClassName="mdx-editor-content"
            plugins={plugins}
          />
        )}
      />
      <Form.Text className="text-muted">{helpText}</Form.Text>
    </Form.Group>
  );
}
