import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { TEMPLATE_HTML } from './index.html.string';
import { TEMPLATE_CSS } from './index.css.string';
interface ITinyMceTemplateEditorProps {
  disabled?: boolean;
  editorRef: React.MutableRefObject<any>;
  initialValue?: string;
}

const TinyMceEditorWithTemplate = (props: ITinyMceTemplateEditorProps) => {
  const handleImageUpload = async (values: any) => {
    const http = new HttpService();

    const response: any = await http
      .service()
      .postFormData(apiRoutes.staff.base, values);
    return response.data.data;
  };
  // console.log(props.editorRef);
  return (
    <Editor
      onInit={(evt, editor) => {
        props.editorRef.current = editor;
      }}
      apiKey="cfjfj03aqrqyu5dx3oakt4c1bocijou54maxe7lpnluo1o37"
      initialValue={props.initialValue ? props.initialValue : TEMPLATE_HTML}
      init={{
        images_upload_handler: async (Blob, progress) => {
          const formData = new FormData();
          formData.append('file', Blob.blob(), Blob.filename());
          const url = await handleImageUpload(formData);
          return `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`;
        },

        plugins: 'anchor autolink link lists image code   wordcount',
        toolbar:
          'undo redo | blocks | bold italic strikethrough backcolor  | link image | align bullist numlist | code ',
        height: 900,
        editable_root: false,
        editable_class: 'editable',
        content_style: TEMPLATE_CSS,
        elementpath: false,
        newdocument_content: props.initialValue
          ? props.initialValue
          : TEMPLATE_HTML,
      }}
    />
  );
};

export default TinyMceEditorWithTemplate;

//initial value
// editorRef
// const editorRef = useRef(null);
