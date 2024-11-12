{nearMatchAllocationList.length > 0 && (
    <Row style={{ margin: "0px", padding: "0px" }}>
        <Col xs={12} sm={12} md={12} lg={12} style={{ marginBottom: "10px", fontSize: "14px", fontWeight: "bold" }}>
            <h8>Near Match Allocation Details</h8>
            <table className="table table-striped table-bordered bctPreviewBorderedTable" style={{ display: "table" }}>
                {nearMatchAllocationList.map((element, index) => {
                    contractMap.push(record.mismatchContract[index]);
                    return (
                        <tr
                            key={index}
                            style={{
                                fontWeight: record.sensitiveAccount === true || index === 0 ? 'bold' : 'normal'
                            }}
                        >
                            {element.map((data, cellIndex) => (
                                record.dynaColumnFlagContractNearMatch[cellIndex] && (
                                    <td
                                        key={cellIndex}
                                        style={{
                                            textAlign: "center",
                                            verticalAlign: "center",
                                            whiteSpace: "nowrap",
                                            color: contractMap[cellIndex] === true ? 'red' : 'black',
                                            fontWeight: contractMap[cellIndex] === true ? 'bold' : 'normal'
                                        }}
                                    >
                                        <p>{data}</p>
                                    </td>
                                )
                            ))}
                        </tr>
                    );
                })}
            </table>
        </Col>
    </Row>
)}

{/* Email Signature */}
<Row style={{ margin: "0px", padding: "0px" }}>
    <Col xs={12} sm={12} md={12} lg={12} style={{ marginBottom: "10px", fontSize: "12px" }}>
        <div dangerouslySetInnerHTML={{ __html: emailContentDetails?.signature ?? "" }} />
    </Col>
</Row>
