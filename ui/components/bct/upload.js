// public void setUploadFileName(String uploadFileName) {
//     this.uploadFileName = uploadFileName;
// }

// public String execute() throws BrowserException {
//     try {
//         super.execute();

//         if (fileSizeExceeded()) {
//             this.setErrMsg("File size should not exceed 5 MB");
//             return SUCCESS;
//         }

//         String userID = getUser().getUserID();
//         String templateName = getAppID() + "\\" + userID + "\\" + "BrokerCommunicationTool" + "\\" + uploadFileName.toUpperCase();
//         BrowserPersistVO browserPersistVO = new BrowserPersistVO();
//         browserPersistVO.setFileName(templateName);
//         browserPersistVO.setBlobData(CommonUtils.getBytesFromFile(upload));
//         BrowserPersistDAO browserDao = new BrowserPersistDAO(getEnv());
//         browserDao.insertRow(browserPersistVO);

//     } catch (Exception e) {
//         LogUtil.getInstance().severe("Exception raised in FileUploadAction = User: " + getUser().getUserID(), e, this);
//         return SUCCESS;
//     }
//     return SUCCESS;
// }

// private boolean fileSizeExceeded() {
//     long byteFor5mb = 5242880;
//     if (upload.length() > byteFor5mb) {
//         return true;
//     }
//     return false;
// }

// public String removeFile() {
//     try {
//         super.execute();
//         String userID = getUser().getUserID();
//         String appID = !CommonUtils.isEmpty(getAppID()) ? getAppID() : getRequest().getParameter("appId");
//         uploadFileName = !CommonUtils.isEmpty(uploadFileName) ? uploadFileName : getRequest().getParameter("uploadFileName");
//         String templateName = appID + "\\" + userID + "\\" + "BrokerCommunicationTool" + "\\" + uploadFileName.toUpperCase();
//         BrowserPersistVO browserPersistVO = new BrowserPersistVO();
//         browserPersistVO.setFileName(templateName);
//         browserPersistVO.setLastUpdatedUserId(userID);
//         BrowserPersistDAO browserDao = new BrowserPersistDAO(getEnv());
//         browserDao.deleteRow(browserPersistVO);
//     } catch (Exception e) {
//         LogUtil.getInstance().severe("Exception raised in FileUploadAction: removeFile() = User: " + getUser().getUserID(), e, this);
//         return SUCCESS;
//     }
//     return SUCCESS;
// }


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
            uploader: null, // Define your uploader logic here
            modalIsOpen: false,
            modalParams: {},
            content: ''
        };
    }

    handleEditorChange = (event) => {
        const data = event.editor.getData();
        this.setState({ content: data });
    };

    save = () => {
        const { contextPath } = this.props;
        const url = `${contextPath}/angular/ims/SaveBrokerRecipientDetails.action`;
        const { content, showFile, record, uploader } = this.state;

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

        const args = {
            broker: JSON.stringify(record),
            content: content
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(args)
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

                if (showFile && record.fileName && uploader) {
                    this.setState({
                        record: {
                            ...record,
                            fileName: record.fileName
                        }
                    });
                    // Define your uploader start logic here
                    this.state.uploader.start();
                    this.successMsg(data, textColor);
                } else {
                    this.successMsg(data, textColor);
                }
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
