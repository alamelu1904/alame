componentDidMount = () => {
    const { updateStatusFrmData } = this.state;
    if (updateStatusFrmData["actualSettlemetDate"]) {
        console.log("date as is from json :::::::::::::::::::::::", updateStatusFrmData["actualSettlemetDate"]);
        let date = moment(updateStatusFrmData["actualSettlemetDate"].split('T')[0], 'YYYY-DD-MM');
        console.log("date after formate date time is ::::::::::::::::", date);
        if (date.isValid()) {
            this.setState({ actualSettlementData: date });
        }
    }
    console.log("update status updateStatusFrmData", updateStatusFrmData);
    console.log("update status selectedValues", this.state.selectedValues);
}

componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
        const { updateStatusFrmData } = this.props.data;
        if (updateStatusFrmData["actualSettlemetDate"]) {
            let date = moment(updateStatusFrmData["actualSettlemetDate"].split('T')[0], 'YYYY-DD-MM');
            if (date.isValid()) {
                this.setState({ actualSettlementData: date });
            }
        }
        this.setState({ updateStatusFrmData });
    }
}

dateSelection = (date, dateString) => {
    var updateStatusFrmData = this.state.updateStatusFrmData;
    if (date && date.isValid()) {
        updateStatusFrmData["actualSettlemetDate"] = date.format('YYYY-DD-MM');
        this.setState({ actualSettlementData: date, updateStatusFrmData });
    }
}

render() {
    const { dateFormat, actualSettlementData, updateStatusFrmData, open, updateStatusErrorModFlag, updateStatusErrModData, showSpecialLookUpModal, lookupSpecialFilterJson } = this.state;

    return (
        <React.Fragment>
            {tradeTicketModalPopup}
            <Modal
                id="updateSettlementStatusModal"
                animation={false}
                show={open}
                backdrop={"static"}
                onHide={this.handleClose}
                dialogClassName={"updateSettlementStatusModal"}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>Update Status/Reason</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Grid id="modalUpdateStatusGrid">
                        <Row style={{ margin: "0px", padding: "0px" }}>
                            <div className="card-layout" style={{ backgroundColor: "white" }}>
                                <div className="card-header">
                                    <div className="card-header-text-wrap">
                                        <span className="option-span">Update Failed Reason Description and other fields</span>
                                    </div>
                                </div>
                                <div className="card-body" style={{ paddingBottom: "50px" }}>
                                    <Row style={{ margin: "0px", padding: "0px" }}>
                                        <Col xs={12} sm={3} md={3} lg={3} style={{ marginTop: "5px" }}>
                                            <div className="field-wrapper">
                                                <div className="field-title">Actual Settlement Date ({dateFormat.toUpperCase()})</div>
                                                <DatePicker
                                                    name="actualSettlemetDate"
                                                    id="actualSettlemetDate"
                                                    format={dateFormat}
                                                    value={actualSettlementData}
                                                    onChange={this.dateSelection}
                                                    popupClassName="advanceTabDatePickerModel"
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={3} md={3} lg={3} style={{ marginTop: "5px" }}>
                                            <div className="field-wrapper">
                                                <div className="field-title">Actual Shares {this.state.markActualFieldsMand ? " (*)" : ""}</div>
                                                <input name="actualShares" className="design2-input" autoComplete="off"
                                                    value={updateStatusFrmData["actualShares"]} readOnly={this.state.disActualShares} />
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={3} md={3} lg={3} style={{ marginTop: "5px" }}>
                                            <div className="field-wrapper">
                                                <div className="field-title">Actual Net Amount</div>
                                                <input name="actualNetAmount" className="design2-input" autoComplete="off"
                                                    value={updateStatusFrmData["actualNetAmount"]} readOnly={this.state.disActualNetAmount} />
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* Other Rows */}
                                </div>
                            </div>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary">Ok</Button>
                    <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            {updateStatusErrorModFlag && <ErrorPageModal errorModFlag={updateStatusErrorModFlag}
                errormodTitle={updateStatusErrModData["modeltitle"]}
                errormodDesc={updateStatusErrModData["errorMessage"]} onClose={this.hideTradeTicketErrModal} />}

            {showSpecialLookUpModal && (<SpecialLookup show={showSpecialLookUpModal}
                hideModal={this.hideUpdateStatusLookupageModal} lookupJson={lookupSpecialFilterJson}
                lookupField={this.state.lookUpSelectedFieldL} applicId={this.props.applicId} />)}
        </React.Fragment>
    );
}
