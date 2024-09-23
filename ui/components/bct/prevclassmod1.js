import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';

class PreviewModal extends Component {

    getBoldCondition(index) {
        // Replace with your actual bold condition logic
        return index === 2;
    }

    renderTable = (dataList = [], highlights = []) => {
        // Ensure that dataList is an array and get the keys for headers dynamically
        const headers = dataList.length > 0 ? Object.keys(dataList[0]) : [];

        return (
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, headerIndex) => (
                            <th key={headerIndex}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((dataRow, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, cellIndex) => (
                                <td key={cellIndex} style={{ fontWeight: highlights[cellIndex] ? 'bold' : 'normal' }}>
                                    {dataRow[header] ?? "N/A"} {/* Default to "N/A" if null or undefined */}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        const {
            show, onHide, emailContentDetails = {}, record = {}, blockDetails = [],
            blockHighlights = [], allocationDetails = [], mktShpeList = []
        } = this.props;

        return (
            <Modal show={show} onHide={onHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Preview Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: '70vh', overflowY: 'auto' }}>
                    <div className="form-group">
                        {/* Email Greeting and Record Content */}
                        <div>
                            <p dangerouslySetInnerHTML={{ __html: emailContentDetails.greeting ?? "" }}></p>
                            <p dangerouslySetInnerHTML={{ __html: record?.content ?? "" }}></p>
                        </div>

                        {/* Block Details Section */}
                        {record?.nearMatchInBlock && blockDetails?.length > 0 ? (
                            <>
                                <br /><br />Trade Details<br /><br />
                                {this.renderTable(blockDetails, blockHighlights)}
                            </>
                        ) : null}

                        {/* Allocation Details Section */}
                        {(allocationDetails?.length > 0 && (record?.SSCInvestmentType === 'TRPO' || record?.SSCInvestmentType === 'XYZ')) ? (
                            <>
                                <br /><br />Allocation Details<br /><br />
                                {this.renderTable(allocationDetails)}
                            </>
                        ) : null}

                        {/* Market Shape Details Section */}
                        {mktShpeList?.length > 0 ? (
                            <>
                                <br /><br />Market Shape Details<br /><br />
                                {this.renderTable(mktShpeList)}
                            </>
                        ) : null}

                        {/* Email Signature */}
                        <div dangerouslySetInnerHTML={{ __html: emailContentDetails?.signature ?? "" }}></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PreviewModal;
