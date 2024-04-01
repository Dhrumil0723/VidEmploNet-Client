import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";


const CkEditor = ({ ...props }) => {
  const editorConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "link",
        "blockQuote",
        "|",
        "undo",
        "redo",
      ],
    },
    language: "en",
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        addTargetToExternalLinks: {
          mode: "manual",
          label: "Open in a new tab",
          defaultValue: true,
        },
      },
    },
    heading: {
      options: [
        { model: "paragraph", title: "paragraph", class: "ck-heading_paragraph" },
        { model: "heading1", view: "h2", title: "large", class: "ck-heading_heading1" },
        { model: "heading2", view: "h3", title: "medium", class: "ck-heading_heading2" },
        { model: "heading3", view: "h4", title: "small", class: "ck-heading_heading3" },
      ],
    },
  };
 
  editorConfig.link = {
    addTargetToExternalLinks: true,
  };

  return <CKEditor editor={ClassicEditor} config={editorConfig} {...props} />;
};

export default CkEditor;