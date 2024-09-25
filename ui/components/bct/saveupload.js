import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';

class SaveBrokerRecipientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {
        fileName: '',
        isClosed: true,
        // other properties of record
      },
      content: '',
      file: null, // Store the selected file here
    };

    this.uploader = { start: this.handleFileUpload }; // Binding to the upload logic
  }

  handleSave = () => {
    const url = '/angular/ims/SaveBrokerRecipientDetails.action';
    const { record, content } = this.state;

    if (record.fileName) {
      const args = {
        broker: JSON.stringify(record),
        content: this.state.content,
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errorMessage) {
            this.showErrors(data.errorMessage);
          } else {
            this.setState({
              record: {
                ...data.savedBrokerDetails,
                isClosed: false,
              },
            });

            const textColor = 'green';

            if (this.state.file && this.uploader) {
              this.uploader.start(); // Trigger file upload
            }

            this.successMsg(data, textColor);
          }
        })
        .catch((error) => {
          console.error('There was an error saving broker details!', error);
        });
    }
  };

  handleEditorChange = (event) => {
    this.setState({ content: event.editor.getData() });
  };

  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  handleFileUpload = async () => {
    const { file } = this.state;
    if (!file) {
      console.error('No file selected for upload');
      return;
    }

    const result = await this.uploadFile(file);
    if (result.success) {
      console.log('File uploaded successfully', result.data);
    } else {
      console.error('Error uploading file:', result.message);
    }
  };

  uploadFile = async (file) => {
    const url = 'https://tde-ual.statetest.com/uattoolui/angular/ims/UploadFilesAction.action';

    let formData = new FormData();
    formData.append('name', 'RelatedUnconfirmedPairs_2982.csv'); // You can customize this name based on file name logic
    formData.append('appId', 'BLR');
    formData.append('upload', file);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.status);
      }

      const result = await response.json();
      if (result.errMsg) {
        console.error('Error from server: ', result.errMsg);
        return { success: false, code: response.status, message: result.errMsg };
      }

      console.log('Upload successful:', result);
      return { success: true, code: response.status, data: result };
    } catch (error) {
      console.error('Error uploading file:', error);
      return { success: false, code: 500, message: error.message };
    }
  };

  showErrors = (errorMessage) => {
    // Implement error display logic
    alert(errorMessage);
  };

  successMsg = (data, color) => {
    // Implement success message display logic
    console.log(`Success: ${data}, color: ${color}`);
  };

  render() {
    return (
      <div>
        {/* CKEditor to capture content */}
        <CKEditor
          data={this.state.content}
          onChange={this.handleEditorChange}
        />

        {/* File input to select file */}
        <input
          type="file"
          onChange={this.handleFileChange}
        />

        {/* Trigger save operation */}
        <button onClick={this.handleSave}>
          Save Broker Recipient Details
        </button>

        {/* Other UI elements and uploader logic */}
      </div>
    );
  }
}

export default SaveBrokerRecipientDetails;
