import React, { useState, useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Table, TableRow, TableCell } from './Table';

Quill.register(Table);
Quill.register(TableRow);
Quill.register(TableCell);

const TextEditor = () => {
  const [content, setContent] = useState('');

  const quillRef = useRef(null);

  const handleChange = (value) => {
    setContent(value);
  };

  const insertTable = () => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    if (range) {
      const table = quill.clipboard.convert('<table><tr><td>Cell 1</td><td>Cell 2</td></tr></table>');
      quill.updateContents(
        quill.clipboard.convert({
          ops: [{ insert: table }],
        })
      );
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean'],
        [{ 'table': 'insert' }],
      ],
      handlers: {
        table: insertTable,
      },
    },
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleChange}
        modules={modules}
        theme="snow"
      />
    </div>
  );
};

export default TextEditor;
