public String saveBrokerRecipientDetails() throws BlotterException, SessionExpiredException {
    String result = SUCCESS;
    try {
        super.execute();
        Gson gson = new GsonBuilder().create();
        BrokerCommunicationToolVO brkrCommToolVO = gson.fromJson(getRequest().getParameter("broker"), BrokerCommunicationToolVO.class);
        String content = getRequest().getParameter("content");

        BrokerCommunicationToolService brkservice = new BrokerCommunicationToolService(this.dsName, this.getAppID(), this.getEnv());
        brkrCommToolVO.getBrokerRecipientDetails().setContent(content);
        setSavedBrokerDetails(brkservice.saveBrokerRecipientDetails(brkrCommToolVO));
        this.setSuccessMessage(BrokerCommunicationToolConstants.SUCCESS_MSG_SAVE);
    } catch (Exception e) {
        this.setErrorMessage(Arrays.asList(BrokerCommunicationToolConstants.ERR_MSG_SAVE));
        LogUtil.severe("Exception raised in BrokerCommunicationToolAction.saveBrokerRecipientDetails() = User: " + getUser().getUserID(), e, this);
    }
    return result;
}




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
                isClosed: false
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
        formData.append('file', file); // Add file to the form data

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


To call the Java upload functionality on save, instead of using an uploader, you can send the file in binary format directly to your backend endpoint. I'll assume that the backend is already set up to handle file uploads.

First, you need to set up your React component to send the file in binary format to the Java backend. Here's how you can do it:

Update your React component to handle file uploads using Fetch and send the file in binary format.
React Component


Explanation
File Input: Added an <input type="file" /> element to handle file selection.
State Management: Added file to the component state to hold the selected file.
Handle File Change: handleFileChange method updates the state with the selected file.
FormData: Using FormData to send the file and other data to the backend.
Fetch: Using Fetch API to send a POST request with FormData.
Java Backend
Ensure your Java backend is set up to handle file uploads. Here's a simplified example of how your Java code might look:

