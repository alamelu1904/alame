import React, { Component } from "react";
import { Button, Modal, Grid, Row, Col, Icon, Select, SpinnerProgress } from "ssc-cdt4";
import { DatePicker } from "antd";
import moment from 'moment';
import EnvProps from "../app/EnvProps";
import ErrorPageModal from "../components/ErrorPageModal/ErrorPageModal";
import SpecialLookup from "../pages/SpecialLookup";
import "../styles/UpdateSettlementStatusStyle.css";

export default class UpdateSettlementStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            updateStatusLoader: false,
            dateFormat: null,
            open: this.props.data.modelShow,
            updateStatusFrmData: this.props.data,
            selectedValues: this.props.data["keyValues"],
            disFullPartialFlag: true,
            disActualSettlemetDate: true,
            disActualShares: true,
            disActualNetAmount: true,
            markActualFieldsMand: false,
            initailLoad: true,
            removeTot_OutStanding: true,
            updateStatusErrorModFlag: false,
            updateStatusErrModData: {},
            actualSettlementData: null,
            lookupSpecialFilterJson: {},
            showSpecialLookUpModal: false,
            lookUpSelectedFieldL: ""
        };

        this.dateSelection = this.dateSelection.bind(this);
    }

    componentWillMount = () => {
        let userInfo = EnvProps.getUserInfo();
        let dateFormat = "MM/DD/YYYY"; // Default to US format
        if (userInfo && userInfo.locale) {
            if (userInfo.locale === 'UK') {
                dateFormat = 'DD/MM/YYYY';
            }
        }

        const updateStatusFrmData = { ...this.state.updateStatusFrmData, dateFormat };
        this.setState({ dateFormat, updateStatusFrmData });
    }

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

    dateSelection = (dates, dateStrings) => {
        let { updateStatusFrmData } = this.state;
        const initialSavedData = EnvProps.getInitInfo();
        let dateStr = dateStrings;
        let actSetData = dates;
        console.log("date selections.....", dates);
        console.log("date selections.....", dateStrings);
        console.log("Initial Data.......", initialSavedData);

        let maxDate = new Date();
        let temptoDate = moment(new Date().setDate(maxDate.getDate() + 1)).format(updateStatusFrmData["dateFormat"].toUpperCase());
        console.log("temptoDate...........", temptoDate);

        let userDate = null;
        if (updateStatusFrmData['dateFormat'] === 'DD/MM/YYYY') {
            let actualSetData = dateStrings;
            let d = actualSetData.split("/");
            console.log("Data Form.....", new Date(d[2] + '/' + d[1] + '/' + d[0]));
            userDate = new Date(d[2] + '/' + d[1] + '/' + d[0]);
        } else {
            userDate = new Date(dateStrings);
        }

        let dateComp = new Date();
        dateComp.setDate(maxDate.getDate() + 1);

        if (dateComp < userDate) {
            this.showErrors({ errorMessage: "Actual Settlement Date cannot be greater than : " + temptoDate, modeltitle: "Error", isValid: false });
            dateStr = moment(initialSavedData.actualSettlemetDate).format(updateStatusFrmData["dateFormat"].toUpperCase());
            let timestamp = moment(initialSavedData.actualSettlemetDate);
            actSetData = timestamp;
        }

        updateStatusFrmData["actualSettlemetDate"] = dateStr;
        this.setState({
            updateStatusFrmData: updateStatusFrmData,
            actualSettlementData: actSetData
        }, () => {
            console.log("After Update Data......", this.state.updateStatusFrmData);
        });
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.onClose();
    }

    render() {
        const { dateFormat, actualSettlementData, updateStatusFrmData, open, updateStatusErrorModFlag, updateStatusErrModData, showSpecialLookUpModal, lookupSpecialFilterJson } = this.state;

        return (
            <React.Fragment>
                {this.state.updateStatusLoader && (
                    <Modal
                        className="LoadingModalCSS"
                        animation={false}
                        show={this.state.updateStatusLoader}
                        backdrop={false}
                        dialogClassName="customDateRangeModalStyle"
                    >
                        <Modal.Body style={{ left: "50%", marginLeft: "-4em" }}>
                            <SpinnerProgress size="large" type="determinate" style={{ marginTop: "10%" }} />
                        </Modal.Body>
                    </Modal>
                )}
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
}
