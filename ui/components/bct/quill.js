import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Import table module and register it
import Table from 'quill-table';
import 'quill-table/ui/table.css';

Quill.register({
  'modules/table': Table
});

const TextEditor = () => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'], // link and image, video
      ['clean'], // remove formatting button
      ['table'], // insert table
    ],
    table: true,
  };

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        theme="snow"
      />
    </div>
  );
};

export default TextEditor;
