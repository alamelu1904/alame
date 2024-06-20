import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MyEditor = () => {
  // Initial content can be set to an HTML string
  const [content, setContent] = useState('<p>Initial <strong>bold</strong> content with a <a href="https://example.com">link</a></p>');

  const handleEditorChange = (content, editor) => {
    setContent(content);
    console.log('Content was updated:', content);
  };

  return (
    <div>
      <Editor
        apiKey="YOUR_TINYMCE_API_KEY"
        value={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
      />
      <h2>Output</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default MyEditor;
