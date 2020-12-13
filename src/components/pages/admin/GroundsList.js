import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { DATE_TIME, GROUND_STATUS_DISPLAY } from "../../../utils/common";
import { forwardRef } from "react";

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
import VisibilityIcon from "@material-ui/icons/Visibility";
import Colors from "../../../constants/Colors";
import PageLoader from "../../custom/PageLoader";
import { getAddress } from "../../../utils/commonFunction";
import { getGrounds } from "../../../store/actions/ground";
import { Tooltip } from "@material-ui/core";
import { truncateMultilineString } from "../../../utils/formatString";

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

const GroundsList = ({ grounds, getGrounds, onEdit }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const getDateTime = (date) => moment(date).format(DATE_TIME);
  const groundArr = Object.keys(grounds).map((groundId, index) => ({
    ...grounds[groundId],
    createdAt: getDateTime(grounds[groundId].createdAt),
    updatedAt: getDateTime(grounds[groundId].updatedAt),
    address: getAddress(grounds[groundId].address),
    category: grounds[groundId].category?.name,
    index: index,
  }));

  useEffect(() => {
    getGrounds(setLoading);
  }, []);

  const [state, setState] = useState({
    columns: [
      {
        title: "ID",
        field: "index",
        hidden: true,
        export: true,
      },
      {
        title: "Ground Name",
        field: "title",
      },
      {
        title: "Phone",
        field: "phone",
      },
      {
        title: "Address",
        field: "address",
        render: ({ address }) =>
          address.length <= 50 ? (
            <p style={{ margin: 0 }}>{address}</p>
          ) : (
            <Tooltip placement="top" title={address}>
              <p style={{ margin: 0 }}>
                {truncateMultilineString(address, 20)}
              </p>
            </Tooltip>
          ),
      },
      {
        title: "Category",
        field: "category",
      },
      {
        title: "Status",
        field: "status",
        lookup: GROUND_STATUS_DISPLAY, // SHOWED IS ENABLE
        initialEditValue: "public",
      },
      {
        title: "Updated at",
        field: "updatedAt",
        editable: "never",
      },
    ],
    data: [
      {
        subGroundName: "home",
        status: "new",
        startTime: "12:00",
        endTime: "13:00",
        paymentType: "online",
        price: "100000",
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
      {
        subGroundName: "home",
        status: "cancelled",
        startTime: "12:00",
        endTime: "13:00",
        paymentType: "online",
        price: "100000",
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
      {
        subGroundName: "home",
        status: "approved",
        startTime: "12:00",
        endTime: "13:00",
        paymentType: "online",
        price: "100000",
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
    ],
  });

  return (
    <PageLoader loading={loading}>
      <div style={{ maxWidth: `100%`, overflowX: "auto" }}>
        <MaterialTable
          icons={tableIcons}
          title="List Of Grounds"
          columns={state.columns}
          data={groundArr || []}
          options={{
            sorting: true,
            pageSize: 10,
            pageSizeOptions: [10, 20],
            headerStyle: {
              fontWeight: "bold",
            },
            rowStyle: {
              overflowX: "auto",
            },
            actionsColumnIndex: -1,
            exportButton: true,
            exportAllData: true,
          }}
          actions={[
            {
              icon: () => <Edit style={{ color: Colors.orange }} />,
              tooltip: "Edit ground",
              onClick: (event, rowData) => {
                onEdit(rowData.id);
              },
            },
            {
              icon: () => <VisibilityIcon style={{ color: Colors.view }} />,
              tooltip: "Sub gronnds and prices",
              onClick: (event, rowData) => {
                history.push(`/ground-management/${rowData.id}`);
              },
            },
          ]}
        />
      </div>
    </PageLoader>
  );
};
const mapStateToProps = (state) => ({
  grounds: state.ground.grounds,
  auth: state.auth,
});
export default connect(mapStateToProps, { getGrounds })(
  withRouter(GroundsList)
);
