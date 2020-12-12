import React, { useEffect, useState } from "react";
import { forwardRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import PageLoader from "../../custom/PageLoader";
import Colors from "../../../constants/Colors";
import { DATE_TIME } from "../../../utils/common";
import {
  getBenefits,
  addBenefit,
  updateBenefit,
} from "../../../store/actions/benefit";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
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

const BenefitsList = ({ benefits, getBenefits, updateBenefit, addBenefit }) => {
  const [state, setState] = useState({
    columns: [
      {
        title: "Title",
        field: "title",
      },
      {
        title: "Status",
        field: "status",
        lookup: { enabled: "Enable", disabled: "Disabled" }, // SHOWED IS ENABLE
        initialEditValue: "enabled",
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBenefits(setLoading);
  }, [getBenefits, loading]);

  const getDateTime = (date) => moment(date).format(DATE_TIME);
  const benefitArr = Object.keys(benefits).map((benefitId) => ({
    ...benefits[benefitId],
    createdAt: getDateTime(benefits[benefitId].createdAt),
  }));

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
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setLoading(true);
                  addBenefit(setLoading, newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                  setLoading(true);
                  updateBenefit(setLoading, newData);
                }, 100);
              }),
          }}
        />
      </div>
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
