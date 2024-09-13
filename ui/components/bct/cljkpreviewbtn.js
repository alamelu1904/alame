import React, { Component } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';

// Reusable table component as a functional component
const DataTable = ({ data, headers, boldCondition, tableStyle }) => (
    <Table bordered style={tableStyle}>
        <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ fontWeight: boldCondition(rowIndex) ? 'bold' : 'normal' }}>
                    {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </Table>
);

class PreviewModal extends Component {
    getBoldCondition(index) {
        const { record } = this.props;
        return record.sensitiveAccount || index === 0;
    }

    render() {
        const { show, onHide, record } = this.props;

        if (!record) return null;

        const emailContentDetails = record.emailContentDetails || {};
        const blockDetails = record.blockDetails || [];
        const blockHighlights = record.blockHighlights || [];
        const allocationDetails = record.allocationDetails || [];
        const mktShpeList = record.mktShpeList || [];

        return (
            <Modal show={show} onHide={onHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Preview Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: '70vh', overflowY: 'auto' }}>
                    <div className="form-group">
                        <div>
                            <p dangerouslySetInnerHTML={{ __html: emailContentDetails.greeting }}></p>
                            <p dangerouslySetInnerHTML={{ __html: record.content }}></p>
                        </div>
                        {record.nearMatchInBlock ? (
                            <>
                                <br /><br />Trade Details<br /><br />
                                <DataTable
                                    data={blockDetails}
                                    headers={["Column 1", "Column 2", "Column 3"]}
                                    boldCondition={(index) => index === 2 && blockHighlights[index]}
                                    tableStyle={{ width: '60%' }}
                                />
                            </>
                        ) : null}
                        {(allocationDetails.length > 0 && (record.SSCInvestmentType === 'TRPO' || record.SSCInvestmentType === 'XYZ')) ? (
                            <>
                                <br /><br />Allocation Details<br /><br />
                                <DataTable
                                    data={allocationDetails}
                                    headers={["Allocation 1", "Allocation 2", "Allocation 3"]}
                                    boldCondition={(index) => this.getBoldCondition(index)}
                                />
                            </>
                        ) : null}
                        {mktShpeList.length > 0 ? (
                            <>
                                <br /><br />Market Shape Details<br /><br />
                                <DataTable
                                    data={mktShpeList}
                                    headers={["Market Shape 1", "Market Shape 2"]}
                                    boldCondition={(index) => this.getBoldCondition(index)}
                                />
                            </>
                        ) : null}
                        <div dangerouslySetInnerHTML={{ __html: emailContentDetails.signature }}></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class ParentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false, // state to control the modal visibility
            record: {
                emailContentDetails: { greeting: "Hello", signature: "Best regards" },
                content: "Here is the content.",
                nearMatchInBlock: true,
                blockDetails: [
                    ["Block 1", "Block 2", "Block 3"],
                    ["Block 4", "Block 5", "Block 6"]
                ],
                blockHighlights: [false, true, false],
                allocationDetails: [["Alloc 1", "Alloc 2", "Alloc 3"]],
                SSCInvestmentType: "TRPO",
                sensitiveAccount: false,
                mktShpeList: [["Shape 1", "Shape 2"]]
            }
        };
    }

    // Method to open modal
    handlePreview = () => {
        this.setState({ showModal: true });
    };

    // Method to close modal
    handleClose = () => {
        this.setState({ showModal: false });
    };

    handleExportNearMatch = () => {
        // Logic for attaching related unconfirmed pairs can go here
        console.log("Attach Related Unconfirmed Pairs");
    };

    render() {
        return (
            <div>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.handleExportNearMatch}>Attach Related Unconfirmed Pairs</Button>
                    <Button bsStyle="primary" onClick={this.handlePreview}>Preview</Button>
                    <Button bsStyle="primary" onClick={this.handleClose}>Save</Button>
                    <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
                </Modal.Footer>

                {/* PreviewModal that opens on click of "Preview" button */}
                <PreviewModal
                    show={this.state.showModal}
                    onHide={this.handleClose}
                    record={this.state.record}
                />
            </div>
        );
    }
}

export default ParentComponent;
