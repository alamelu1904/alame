import React, { Component } from 'react';
import Modal from 'react-modal';
import CKEditor from 'ckeditor4-react';

class YourComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            record: {
                fileName: '',
                templateName: '',
                isClosed: false,
                brokerRecipientDetails: {
                    content: ''
                }
            },
            showFile: false,
            file: null, // This will hold the file to be uploaded
            modalIsOpen: false,
            modalParams: {},
            content: ''
        };
        this.fileInput = React.createRef();
    }

    handleEditorChange = (event) => {
        const data = event.editor.getData();
        this.setState({ content: data });
    };

    handleFileChange = (event) => {
        this.setState({ file: event.target.files[0] });
    };

    save = () => {
        const { contextPath } = this.props;
        const url = `${contextPath}/angular/ims/SaveBrokerRecipientDetails.action`;
        const { content, showFile, record, file } = this.state;

        if (!showFile && !record.fileName) {
            this.setState({
                record: {
                    ...record,
                    fileName: '',
                    templateName: ''
                }
            });
            // Remove file logic here
        }

        const formData = new FormData();
        formData.append('broker', JSON.stringify(record));
        formData.append('content', content);
        if (file) {
            formData.append('file', file); // Add file to the form data if it exists
        }

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.errorMessage) {
                // Handle error
                console.error(data.errorMessage);
            } else {
                this.setState({
                    record: {
                        ...data.savedBrokerDetails,
                        isClosed: false
                    }
                });

                const textColor = 'green';
                this.successMsg(data, textColor);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    successMsg = (data, textColor) => {
        this.setState({
            modalParams: {
                title: 'Success',
                message: data.successMessage,
                textColor: textColor
            },
            modalIsOpen: true
        });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        const { modalIsOpen, modalParams } = this.state;

        return (
            <div>
                <input type="file" ref={this.fileInput} onChange={this.handleFileChange} />
                <button onClick={this.save}>Save</button>
                <CKEditor
                    data="<p>Initial content</p>"
                    onInstanceReady={(editor) => {
                        CKEDITOR.instances['content1'] = editor.editorInstance;
                    }}
                    onChange={this.handleEditorChange}
                />
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Success Modal"
                >
                    <h2>{modalParams.title}</h2>
                    <div style={{ color: modalParams.textColor }}>
                        {modalParams.message}
                    </div>
                    <button onClick={this.closeModal}>Close</button>
                </Modal>
            </div>
        );
    }
}

export default YourComponent;
