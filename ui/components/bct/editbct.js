import React from 'react';
import { Button, Checkbox, Col, Grid, Modal, Row } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ICONS from 'your-icons-file'; // Adjust the import based on your project structure
import PreviewModal from './PreviewModal'; // Adjust the import based on your project structure

class YourComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            subject: '',
            includeReplyButton: false,
            sender: '',
            cc: '',
            receiver: '',
            confirmTTModFlag: false,
            displayTTConfirmOk: false,
            confirmTTModTitle: '',
            confirmTTModDesc: '',
            tradeTicketErrModFlag: false,
            tradeTicketUpErrModData: {},
            errorListModalFlag: false,
            errorListModalTitle: '',
            errorListModalData: {},
            fileName: '',
            content: '',
            file: null,
            showModal: false,
            record: null
        };
    }

    handleExportNearMatch = () => {
        const { blotterKey, transType, filterType, appID, file } = this.state;
        const { tradeProcessingGroupID, clientDealingDesk, SSCInvestmentType, clientExecutingBrokerID, settlementCurrency, SSCTradeCountry, tradeCurrency } = this.state;

        if (!file) {
            alert("Please attach a file before proceeding.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('blotter_key', blotterKey);
        formData.append('transType', transType);
        formData.append('filterType', filterType);
        formData.append('appID', appID);
        formData.append('tradeProcessingGroupID', tradeProcessingGroupID);
        formData.append('clientDealingDesk', clientDealingDesk);
        formData.append('SSCInvestmentType', SSCInvestmentType);
        formData.append('clientExecutingBrokerID', clientExecutingBrokerID);
        formData.append('settlementCurrency', settlementCurrency);
        formData.append('SSCTradeCountry', SSCTradeCountry);
        formData.append('tradeCurrency', tradeCurrency);

        fetch('/angular/ims/ExportRelatedUnconfirmedPairs.action', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.errorMessage) {
                    console.error(data.errorMessage);
                } else {
                    if (data.resultType === "success") {
                        const downloadArgs = {
                            fileName: data.fileName,
                            methodName: "getExportContent",
                            tradeProcessingGroupID: tradeProcessingGroupID,
                            clientDealingDesk: clientDealingDesk,
                            SSCInvestmentType: SSCInvestmentType,
                            clientExecutingBrokerID: clientExecutingBrokerID,
                            settlementCurrency: settlementCurrency,
                            SSCTradeCountry: SSCTradeCountry,
                            tradeCurrency: tradeCurrency
                        };

                        const anchor = document.createElement('a');
                        anchor.href = `/FileDownloadServlet?${new URLSearchParams(downloadArgs)}&csrftoken=${document.getElementById('UID').value}`;
                        anchor.download = data.fileName;
                        anchor.click();

                        this.setState({
                            autoload: true,
                            showFile: true,
                            uploader: undefined,
                            fileName: data.fileName,
                            file: new File([data.file], data.fileName),
                            includeReplyButton: false,
                            templateName: data.templateName
                        });

                        console.info("As user has attached a file for batch offline processing, the related Broker-IM combination trades will be processed.");
                    }
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (file.size <= 5 * 1024 * 1024) { // 5MB size limit
                this.setState({ file: file, fileName: file.name });
            } else {
                alert("File size exceeds 5MB.");
            }
        }
    };

    handleRemoveFile = () => {
        this.setState({ file: null, fileName: '' });
    };

    handlePreview = () => {
        // Simulate fetching record data
        const record = {
            emailContentDetails: {
                greeting: "Hello, this is a greeting.",
                signature: "Best regards, Signature"
            },
            content: "This is the content of the email.",
            nearMatchInBlock: true,
            blockDetails: [
                ["Block 1", "Block 2", "Block 3"],
                ["Block 4", "Block 5", "Block 6"]
            ],
            blockHighlights: [false, true],
            allocationDetails: [["Allocation 1", "Allocation 2", "Allocation 3"]],
            SSCInvestmentType: 'TRPO',
            mktShpelist: [],
            mktShpeList: [],
            mktShtpeList: [],
            alcnList: [],
            ctrlList: [],
            nearMatchAllocation: false,
            nearMatchAllocationList: [],
            sensitiveAccount: false
        };

        this.setState({ showModal: true, record: record });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { getRootProps, getInputProps } = useDropzone({ onDrop: this.onDrop });

        return (
            <React.Fragment>
                <Grid id="modalEditBCTGrid" style={{ border: "1px" }}>
                    <Row style={{ marginTop: "1%" }}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <div className="field-wrapper">
                                <div className="field-title">Subject</div>
                                <input name="subject" className="editBCT" autoComplete="off"
                                    value={this.state.subject} readOnly />
                            </div>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "1%" }}>
                        <Col>
                            <Checkbox name="includeReply" inline={true}
                                checked={this.state.includeReplyButton} label="Include Reply Button In Email"
                                value={this.state.includeReplyButton} style={{ marginLeft: "1.0%" }} />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "1%" }}>
                        <Col>
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop a file here, or click to select a file</p>
                            </div>
                            <Button bsStyle="primary" name="Add Attachment" autoComplete="off"
                                onClick={() => document.querySelector('.dropzone input').click()} style={{ marginLeft: "1.0%" }}>
                                Add Attachment
                                <Icon id="addAttachmentIcon" name={ICONS.ATTACHMENT} size="18" title="Add Attachment" />
                            </Button>
                            {this.state.file && (
                                <div id="attachedFiles" style={{ display: 'inline-block', marginLeft: '10px' }}>
                                    <a href={URL.createObjectURL(this.state.file)} download={this.state.fileName}>
                                        {this.state.fileName}
                                    </a>
                                    <Icon id="removeAttachmentIcon" name={ICONS.CLOSE} size="18" title="Remove Attachment" onClick={this.handleRemoveFile} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                                </div>
                            )}
                            <span style={{ marginLeft: "1.0%" }}>
                                (Maximum File size allowed is 5MB. To view/download auto attached file click on file name)
                            </span>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "1%" }}>
                        <Col>
                            <div className="field-title">Content</div>
                            <TextEditor
                                value={this.state.content}
                                onChange={this.handleEditorChange}
                                className="abc"
                                style={{ margin: 100, width: 500 }}
                            />
                        </Col>
                    </Row>
                </Grid>

                <Modal.Body>
                    <Grid id="modalEditBCTGrid" style={{ border: "1px" }}>
                        {/* Other form fields */}
                    </Grid>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.handleExportNearMatch}>Attach Related Unconfirmed Pairs</Button>
                    <Button bsStyle="primary" onClick={this.handlePreview}>Preview</Button>
                    <Button bsStyle="primary" onClick={this.handleClose}>Save</Button>
                    <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
                </Modal.Footer>

                <PreviewModal
                    show={this.state.showModal}
                    onHide={this.handleCloseModal}
                    record={this.state.record}
                />
            </React.Fragment>
        );
    }
}

export default YourComponent;
