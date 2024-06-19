import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';

const PreviewModal = ({ show, onHide, record }) => {
    if (!record) return null;

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Preview Details</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: '70vh', overflowY: 'auto' }}>
                <div className="form-group">
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: record.emailContentDetails.greeting }}></p>
                        <p dangerouslySetInnerHTML={{ __html: record.content }}></p>
                    </div>
                    <br /><br />Trade Details<br /><br />
                    {record.nearMatchInBlock && (
                        <>
                            <Table bordered width="60%">
                                {record.blockDetails.map((blocks, index) => (
                                    <tr key={index} style={{ fontWeight: index === 2 && record.blockHighlights[index] ? 'bold' : '' }}>
                                        {blocks.map((block, subIndex) => (
                                            <td key={subIndex} style={{ color: subIndex === 2 && record.blockHighlights[index] ? 'red' : '' }}>
                                                <span>{block}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </Table>
                            <Table width="30%">
                                {record.blockDetails.map((blocks, index) => (
                                    <tr key={index} style={{ display: 'table' }}>
                                        {blocks.map((block, subIndex) => (
                                            <td key={subIndex} style={{ fontWeight: subIndex === 2 ? 'bold' : '' }}>
                                                <span>{block}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </Table>
                        </>
                    )}
                    {record.allocationDetails.length > 0 && (record.SSCInvestmentType === 'TRPO' || record.SSCInvestmentType === 'XYZ') && (
                        <>
                            <br /><br />Allocation Details<br /><br />
                            <Table striped bordered>
                                {record.allocationDetails.map((allocations, index) => (
                                    <tr key={index} style={{ fontWeight: record.sensitiveAccount || index === 0 ? 'bold' : '' }}>
                                        {allocations.map((allocation, subIndex) => (
                                            <td key={subIndex} style={{ textAlign: 'center', verticalAlign: 'center' }}>
                                                <span>{allocation}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </Table>
                        </>
                    )}
                    {record.mktShpelist.length > 0 && (
                        <>
                            <br /><br />Market Shape Details<br /><br />
                            <Table striped bordered>
                                {record.mktShpeList.map((mktShpe, index) => (
                                    <tr key={index} style={{ fontWeight: record.sensitiveAccount || index === 0 ? 'bold' : '' }}>
                                        {mktShpe.map((mktShpeItem, subIndex) => (
                                            <td key={subIndex} style={{ textAlign: 'center', verticalAlign: 'center' }}>
                                                <span>{mktShpeItem}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </Table>
                        </>
                    )}
                    {record.mktShtpeList.length > 0 && (
                        <>
                            <br /><br />Market Shape Details<br /><br />
                            <Table bordered>
                                {record.mktShtpeList.map((mktShtpe, index) => (
                                    <tr key={index} style={{ fontWeight: record.sensitiveAccount || index === 0 ? 'bold' : '' }} ng-if="record.dynamicColumnLayout">
                                        <td>
                                            <span>{mktShtpe}</span>
                                        </td>
                                    </tr>
                                ))}
                            </Table>
                        </>
                    )}
                    {record.alcnList.length > 0 && (
                        <>
                            <br /><br />Allocation Details<br /><br />
                            <Table bordered>
                                {record.alcnList.map((allocation, index) => (
                                    <tr key={index} style={{ fontWeight: record.sensitiveAccount || index === 0 ? 'bold' : '' }} ng-if="record.dynamicColumnLayout">
                                        <td>
                                            <span>{allocation}</span>
                                        </td>
                                    </tr>
                                ))}
                            </Table>
                        </>
                    )}
                    {record.ctrlList.length > 0 && (
                        <>
                            <br /><br />Collateral Details<br /><br />
                            <Table bordered>
                                {record.ctrlList.map((collateral, index) => (
                                    <tr key={index} style={{ fontWeight: record.sensitiveAccount || index === 0 ? 'bold' : '' }} ng-if="record.dynamicColumnLayout">
                                        <td>
                                            <span>{collateral}</span>
                                        </td>
                                    </tr>
                                ))}
                            </Table>
                        </>
                    )}
                    {record.nearMatchAllocation && (
                        <>
                            <br /><br />Near Match Allocation Details<br /><br />
                            <Table bordered>
                                {record.nearMatchAllocationList.map((nearMatchAllocation, index) => (
                                    <tr key={index} style={{ fontWeight: record.sensitiveAccount || index === 0 ? 'bold' : '' }} ng-if="record.dynamicColumnLayout">
                                        <td>
                                            <span>{nearMatchAllocation}</span>
                                        </td>
                                    </tr>
                                ))}
                            </Table>
                        </>
                    )}
                </div>
                <div dangerouslySetInnerHTML={{ __html: record.emailContentDetails.signature }}></div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PreviewModal;
