import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Icon } from "your-icon-library"; // Replace with your actual icon library

const FileAttachment = () => {
    const [attachedFile, setAttachedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) { // 5MB size limit
            setAttachedFile(file);
        } else {
            alert("File size exceeds 5MB.");
        }
    };

    const handleRemoveFile = () => {
        setAttachedFile(null);
    };

    return (
        <Row style={{ marginTop: "1%" }}>
            <Col>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <Button
                    bsStyle="primary"
                    name="Add Attachment"
                    autoComplete="off"
                    onClick={() => document.getElementById('fileInput').click()}
                    style={{ marginLeft: "1.0%" }}
                >
                    Add Attachment
                    <Icon id="addAttachmentIcon" name="attachment" size="18" title="Add Attachment" />
                </Button>
                {attachedFile && (
                    <div id="attachedFiles" style={{ marginLeft: "1.0%", display: "inline-block" }}>
                        <a href={URL.createObjectURL(attachedFile)} download={attachedFile.name}>
                            {attachedFile.name}
                        </a>
                        <Icon id="removeAttachmentIcon" name="close" size="18" title="Remove Attachment" onClick={handleRemoveFile} style={{ cursor: "pointer", marginLeft: "10px" }} />
                    </div>
                )}
                <span style={{ marginLeft: "1.0%" }}>
                    (Maximum file size allowed is 5MB. To view/download auto attached file click on file name)
                </span>
            </Col>
        </Row>
    );
};

export default FileAttachment;
