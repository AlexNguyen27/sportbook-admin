import React, { useState, useEffect } from "react";
import SubGroundList from "./component/SubGroundList";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextFieldInput from "../../custom/TextFieldInputWithheader";
import { getGrounds } from "../../../store/actions/ground";
import DropdownV2 from "../../custom/DropdownV2";
import { trimObjProperties } from "../../../utils/formatString";
import {
  addSubGround,
  getSubGrounds,
  deleteSubGround,
} from "../../../store/actions/subGround";
import Swal from "sweetalert2";
import EditSubGroundModal from "./component/EditSubGroundModal";
import PageLoader from "../../custom/PageLoader";

const SubGroundManagement = ({
  getGrounds,
  grounds,
  errors,
  addSubGround,
  getSubGrounds,
  deleteSubGround,
}) => {
  const [loading, setLoading] = useState(true);
  const [modelEdit, setModelEdit] = useState(false);
  const [subGroundData, setSubGroundData] = useState();
  const [formData, setFormData] = useState({
    name: "",
    numberOfPlayers: "",
  });
  const groundArr = Object.keys(grounds).map((groundId) => grounds[groundId]);

  const [selectedGroundId, setSelectedGroundId] = useState(
    groundArr[0]?.id || ""
  );

  useEffect(() => {
    getGrounds(setLoading).then(() => {
      setLoading(true);
      getSubGrounds(setLoading, selectedGroundId);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getSubGrounds(setLoading, selectedGroundId);
  }, [setSelectedGroundId, selectedGroundId]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const error = {};

    const formatedData = trimObjProperties({
      ...formData,
      groundId: selectedGroundId,
    });
    Object.keys(formatedData).map((key) => {
      if (!formatedData[key]) {
        error[key] = "This field is required";
      }
    });

    if (JSON.stringify(error) === "{}") {
      formatedData.numberOfPlayers = Number(formData.numberOfPlayers);
      addSubGround(setLoading, formatedData);
    }
  };

  const onDeleteSubGround = (subGroundId) => {
    console.log("su ground id=-------------", subGroundId);
    Swal.fire({
      title: `Are you sure to delete ?`,
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        setLoading(true);
        deleteSubGround(setLoading, subGroundId);
      }
    });
  };

  const onEditSubGround = (subGroundData) => {
    console.log(subGroundData, "d----");
    setModelEdit(true);
    setSubGroundData(subGroundData);
  };

  const { name, numberOfPlayers } = formData;
  return (
    <PageLoader loading={loading}>
      <form onSubmit={(e) => onSubmit(e)}>
        <Row>
          <Col xs={5}>
            <DropdownV2
              fullWidth
              label="Select a ground"
              value={selectedGroundId.toString() || ""}
              options={groundArr || []}
              valueBasedOnProperty="id"
              displayProperty="title"
              onChange={(id) => setSelectedGroundId(id)}
              error={errors.groundId}
              variant="outlined"
            />
          </Col>
        </Row>
        <Row className="mt-4 mb-4">
          <Col xs={5}>
            <TextFieldInput
              required
              variant="outlined"
              name="name"
              label="Subground name"
              fullWidth
              value={name}
              onChange={onChange}
            />
          </Col>
          <Col xs={3}>
            <TextFieldInput
              required
              name="numberOfPlayers"
              label="Number of players"
              fullWidth
              variant="outlined"
              type="number"
              value={numberOfPlayers}
              onChange={onChange}
              InputProps={{
                shrink: true,
                inputProps: {
                  min: 2,
                },
              }}
            />
          </Col>
          <Col>
            <Button
              style={{ marginTop: "auto" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              <AddCircleIcon className="mr-2" /> Add
            </Button>
          </Col>
        </Row>
      </form>
      <SubGroundList onDelete={onDeleteSubGround} onEdit={onEditSubGround} />
      <EditSubGroundModal
        modal={modelEdit}
        setModal={setModelEdit}
        editedData={subGroundData}
      />
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  grounds: state.ground.grounds,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getGrounds,
  addSubGround,
  getSubGrounds,
  deleteSubGround,
})(SubGroundManagement);
