import React, { useState } from "react";
import { connect } from "react-redux";
import TextFieldInput from "../../../custom/TextFieldInputWithheader";
import { Row, Col } from "reactstrap";
import CollapseCustom from "./CollapseCustom";
import { SOCIAL_NETWORK_LABEL } from "../../../../utils/common";

// todo SAVE TO JSON
const SocialNetworkForm = ({ errors, formData, onChange }) => {
  return (
    <>
      <CollapseCustom className="mt-4">
        <Row>
          {Object.keys(formData).map((key) => (
            <Col xs={12} className="mb-4">
              <TextFieldInput
                id="outlined-multiline-flexible"
                name={key}
                label={SOCIAL_NETWORK_LABEL[key]}
                fullWidth
                value={formData[key]}
                onChange={onChange}
                placeHolder="Enter play role"
                error={errors[key]}
                variant="outlined"
              />
            </Col>
          ))}
        </Row>
      </CollapseCustom>
    </>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, {})(SocialNetworkForm);
