import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import GroundList from "./component/GroundList";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddGroundModal from "./component/AddGroundModal";
import { getGrounds, deleteGround } from "../../../store/actions/ground";
import PageLoader from "../../custom/PageLoader";
import Swal from "sweetalert2";
import EditGroundModal from "./component/EditGroundModal";
import GroundsList from "../admin/GroundsList";

const useStyles = makeStyles((theme) => ({
  btn: {
    marginBottom: theme.spacing(2),
  },
}));

const GroundManagement = ({
  getGrounds,
  grounds,
  deleteGround,
  auth: { isAdmin },
}) => {
  const classes = useStyles();
  const [modelAdd, setModelAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modelEdit, setModelEdit] = useState(false);
  const [groundData, setGroundData] = useState();

  const onDelete = (groundId) => {
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
        deleteGround(setLoading, groundId);
      }
    });
  };

  useEffect(() => {
    getGrounds(setLoading);
  }, []);

  const onEdit = (groundId) => {
    setModelEdit(true);
    setGroundData(grounds[groundId]);
  };

  return (
    <PageLoader loading={loading}>
      {isAdmin ? null : (
        <Button
          onClick={() => setModelAdd(true)}
          className={classes.btn}
          variant="contained"
          color="primary"
        >
          <AddCircleIcon className="mr-2" /> Add Ground
        </Button>
      )}

      {isAdmin ? (
        <GroundsList onEdit={onEdit} />
      ) : (
        <GroundList onDelete={onDelete} onEdit={onEdit} />
      )}

      <AddGroundModal modal={modelAdd} setModal={setModelAdd} />
      <EditGroundModal
        modal={modelEdit}
        setModal={setModelEdit}
        ground={groundData}
      />
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  grounds: state.ground.grounds,
  auth: state.auth,
});
export default connect(mapStateToProps, { getGrounds, deleteGround })(
  GroundManagement
);
