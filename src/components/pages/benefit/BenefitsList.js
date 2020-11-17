import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
// import { SAVE_CURRENT_USER } from "../../../store/actions/types";
import { DATE_TIME } from "../../../utils/common";
// import {
//   getCategories,
//   addCategory,
//   deleteCatgory,
//   updateCategory,
// } from "../../../store/actions/category";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Visibility from "@material-ui/icons/Visibility";

import PageLoader from "../../custom/PageLoader";
import Swal from "sweetalert2";
import Colors from "../../../constants/Colors";
import AddBenefitModal from "./component/AddBenefitModal";

import { getBenefits, addBenefit, updateBenefit } from "../../../store/actions/benefit";
import EditBenefitModal from "./component/EditBenefitModal";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit {...props} ref={ref} style={{ color: Colors.orange }} />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const BenefitsList = ({
  benefits,
  getBenefits,
  addBenefit,
  updateBenefit,
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    columns: [
      {
        title: "Title",
        field: "title",
      },
      {
        title: "Description",
        field: "description",
      },
      { title: "Created At", field: "createdAt", editable: "never" },
    ],
    data: [
      {
        name: "home",
        status: "public",
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [modelAdd, setModelAdd] = useState(false);
  const [modelEdit, setModelEdit] = useState(false);
  const [benefit, setBenefit] = useState();

  useEffect(() => {
    // getCategories(setLoading);
    getBenefits(setLoading);
  }, [getBenefits, loading]);

  const getDateTime = (date) => moment(date).format(DATE_TIME);
  const benefitArr = Object.keys(benefits).map((benefitId) => ({
    ...benefits[benefitId],
    createdAt: getDateTime(benefits[benefitId].createdAt),
  }));

  const onEditBenefit = (benefit) => {
    setModelEdit(true);
    setBenefit(benefit);
  };

  return (
    <PageLoader loading={loading}>
      <div style={{ maxWidth: `100%`, overflowX: "auto" }}>
        <MaterialTable
          icons={tableIcons}
          title="List Of Benefits"
          columns={state.columns}
          data={benefitArr || []}
          options={{
            pageSize: 8,
            headerStyle: {
              fontWeight: "bold",
            },
            rowStyle: {
              overflowX: "auto",
            },
            actionsColumnIndex: -1
          }}
          actions={[
            {
              icon: () => <Visibility style={{ color: Colors.view }} />,
              tooltip: "View benefit",
              onClick: (event, rowData) => {
                console.log(rowData);
              },
            },
            {
              icon: () => <AddBox style={{ color: Colors.primary }} />,
              tooltip: 'Add benefit',
              isFreeAction: true,
              onClick: (event) => {
                setModelAdd(true);
              }
            },
            {
              icon: () => <Edit style={{ color: Colors.orange }}/>,
              tooltip: "Edit benefit",
              onClick: (event, rowData) => {
                onEditBenefit(rowData);
              },
            },
          ]}
        />
      </div>
      <AddBenefitModal modal={modelAdd} setModal={setModelAdd} />
      <EditBenefitModal modal={modelEdit} setModal={setModelEdit} editedData={benefit} />
    </PageLoader>
  );
};
const mapStateToProps = (state) => ({
  benefits: state?.benefit?.benefits,
});
export default connect(mapStateToProps, {
  getBenefits,
  addBenefit,
  updateBenefit,
})(withRouter(BenefitsList));
