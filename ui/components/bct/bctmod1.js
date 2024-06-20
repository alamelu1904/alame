render() {
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
                        <Button bsStyle="primary" name="Add Attachment" autoComplete="off"
                            onClick={this.addAttachment} style={{ marginLeft: "1.0%" }}>
                            Add Attachment
                            <Icon id="addAttachmentIcon" name={ICONS.ATTACHMENT} size="18" title="Add Attachment" />
                        </Button>
                        <div id="attachedFiles">
                            <label>Files attached comes here</label> 
                            <Icon id="addAttachmentIcon" name={ICONS.CLOSE} size="18" title="Add Attachment" />
                        </div>
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
                            onChange={this.onChange}
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
                <Button bsStyle="primary" onClick={this.handleClose}>Attach Related Unconfirmed Pairs</Button>
                <Button bsStyle="primary" onClick={this.handleClose}>Preview</Button>
                <Button bsStyle="primary" onClick={this.handleClose}>Save</Button>
                <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
        </React.Fragment>
    );
}
