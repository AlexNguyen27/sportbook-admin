import React, { useState, useEffect } from "react";
import SubGroundList from "./component/SubGroundList";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { getGrounds } from "../../../store/actions/ground";
import DropdownV2 from "../../custom/DropdownV2";
import {
  addSubGround,
  getSubGrounds,
  deleteSubGround,
} from "../../../store/actions/subGround";
import Swal from "sweetalert2";
import EditSubGroundModal from "./component/AddSubGroundModal";
import PageLoader from "../../custom/PageLoader";
import AddSubGroundModal from "./component/AddSubGroundModal";

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
  const [modelAdd, setModelAdd] = useState(false);
  const [subGroundData, setSubGroundData] = useState();
  
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


  const onDeleteSubGround = (subGroundId) => {
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
    setModelEdit(true);
    setSubGroundData(subGroundData);
  };

  return (
    <>
      <Row>
        <Col xs={7}>
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
        <Col xs={5} style={{ alignSelf: "center" }}>
          <Button
            onClick={() => setModelAdd(true)}
            variant="contained"
            color="primary"
          >
            <AddCircleIcon className="mr-2" /> Add subground
          </Button>
        </Col>
      </Row>

      <PageLoader loading={loading}>
        <SubGroundList onDelete={onDeleteSubGround} onEdit={onEditSubGround} />
      </PageLoader>
      <EditSubGroundModal
        modal={modelEdit}
        setModal={setModelEdit}
        editedData={subGroundData}
      />

      <AddSubGroundModal
        modal={modelAdd}
        setModal={setModelAdd}
        selectedGroundId={selectedGroundId}
      />
    </>
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
