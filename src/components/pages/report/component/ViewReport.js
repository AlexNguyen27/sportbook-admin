import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";
// COMPONENTS
import Button from "@material-ui/core/Button";
import {
  clearErrors,
  REPORT_STATUS_ARRAY,
  REPORT_STATUS_OBJECT,
} from "../../../../utils/common";

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import Colors from "../../../../constants/Colors";

const ViewReportModal = ({ modal, setModal, reportData }) => {
  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
  };

  const {
    reason,
    description,
    status,
    title,
    username,
    imageUrl,
    createdAt,
    totalReporters,
    updatedAt,
  } = reportData || {};

  const statusDisplayValue = REPORT_STATUS_OBJECT[status];

  console.log(imageUrl);
  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      <ModalHeader toggle={() => closeModal()}>Reported Post</ModalHeader>
      {/** MODAL BODY */}
      <Form onSubmit={() => {}}>
        <ModalBody>
          <Row>
            {imageUrl && (
              <Col xs="12">
                <img width="100%" src={imageUrl} alt={title} />
              </Col>
            )}
            <Col xs="12" className={imageUrl ? 'mt-3' : ''}>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                label="Post name"
                value={title}
                fullWidth
                rows={4}
              />
            </Col>
            <Col xs="12" className="mt-3">
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                label="Author"
                value={username}
                fullWidth
                rows={4}
              />
            </Col>
            <Col xs="12" className="mt-3">
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                label="Reported Reason"
                value={reason}
                fullWidth
              />
            </Col>
            <Col xs="12" className="mt-3">
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                multiline
                rows={3}
                label="Admin Comment"
                value={description}
                fullWidth
              />
            </Col>
            <Row className="mt-3 justify-content-center">
              <Col xs="6">
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Status"
                  value={statusDisplayValue}
                  fullWidth
                  rows={4}
                />
              </Col>
              <Col xs="5" className="ml-3">
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Total Reporters"
                  value={totalReporters}
                  fullWidth
                />
              </Col>
            </Row>
            <Row className="mt-3 justify-content-center">
              <Col xs="6">
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Created at"
                  value={createdAt}
                  fullWidth
                />
              </Col>
              <Col xs="5" className="ml-3">
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Updated At"
                  value={updatedAt}
                  fullWidth
                />
              </Col>
            </Row>
            <Col xs="12" className="mt-3"></Col>
          </Row>
        </ModalBody>

        {/** MODAL FOOTER */}
        <ModalFooter>
          <Button
            variant="contained"
            className="ml-2"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(ViewReportModal);
