import React, { Component } from 'react';
import { CKEditor } from 'ckeditor4-react';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '<p>This is the initial content of the editor with <strong>bold</strong>, <em>italic</em>, and <u>underline</u> text.</p>',
    };
  }

  handleEditorChange = (event) => {
    this.setState({ content: event.editor.getData() });
  };

  render() {
    return (
      <div>
        <h2>CKEditor 4 React Example</h2>
        <CKEditor
          data={this.state.content}
          onChange={this.handleEditorChange}
          config={{
            toolbar: [
              { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
              { name: 'links', items: ['Link', 'Unlink'] },
              { name: 'paragraph', items: ['NumberedList', 'BulletedList'] },
              { name: 'insert', items: ['Image', 'Table'] },
              { name: 'styles', items: ['Format'] },
              { name: 'tools', items: ['Maximize'] }
            ],
          }}
        />
        <div className="html-output">
          <h3>HTML Output</h3>
          <div>{this.state.content}</div>
        </div>
      </div>
    );
  }
}

export default TextEditor;
