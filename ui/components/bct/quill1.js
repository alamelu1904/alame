import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TableBlot, TableRow, TableCell } from './Table';

Quill.register(TableBlot);
Quill.register(TableRow);
Quill.register(TableCell);

const TextEditor = () => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
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
        'table': () => insertTable(),
      }
    }
  };

  const insertTable = () => {
    const range = quillRef.current.getEditor().getSelection();
    if (range) {
      let row = quillRef.current.getEditor().clipboard.convert('<tr><td>Cell 1</td><td>Cell 2</td></tr>');
      let table = quillRef.current.getEditor().clipboard.convert('<table><tbody></tbody></table>');
      table.childNodes[0].appendChild(row);
      quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(range.index, table.innerHTML);
    }
  };

  const quillRef = React.useRef();

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
