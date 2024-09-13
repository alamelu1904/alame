import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';

// Reusable table component
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

const PreviewModal = ({ show, onHide, record }) => {
    if (!record) return null;

    // Fallback for missing data
    const emailContentDetails = record.emailContentDetails || {};
    const blockDetails = record.blockDetails || [];
    const blockHighlights = record.blockHighlights || [];
    const allocationDetails = record.allocationDetails || [];
    const mktShpeList = record.mktShpeList || [];
    const mktShtpeList = record.mktShtpeList || [];
    const alcnList = record.alcnList || [];
    const ctrlList = record.ctrlList || [];
    const nearMatchAllocationList = record.nearMatchAllocationList || [];

    const boldCondition = function(index) {
        return record.sensitiveAccount || index === 0;
    };

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
                                headers={["Column 1", "Column 2", "Column 3"]} // Replace with your actual headers
                                boldCondition={function(index) { return index === 2 && blockHighlights[index]; }}
                                tableStyle={{ width: '60%' }}
                            />
                        </>
                    ) : null}
                    {(allocationDetails.length > 0 && (record.SSCInvestmentType === 'TRPO' || record.SSCInvestmentType === 'XYZ')) ? (
                        <>
                            <br /><br />Allocation Details<br /><br />
                            <DataTable
                                data={allocationDetails}
                                headers={["Allocation 1", "Allocation 2", "Allocation 3"]} // Replace with your actual headers
                                boldCondition={boldCondition}
                            />
                        </>
                    ) : null}
                    {mktShpeList.length > 0 ? (
                        <>
                            <br /><br />Market Shape Details<br /><br />
                            <DataTable
                                data={mktShpeList}
                                headers={["Market Shape 1", "Market Shape 2"]} // Replace with your actual headers
                                boldCondition={boldCondition}
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
};

export default PreviewModal;
