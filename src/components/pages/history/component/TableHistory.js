import React from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import {
  getFullname,
  capitalizeFirstLetter,
} from "../../../../utils/commonFunction";
import _ from "lodash";
import { ORDER_STATUS, COLOR_ORDER_STATUS } from "../../../../utils/common";
import { Alert } from "reactstrap";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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
export default function TableHistory({ dataSource }) {
  const [state, setState] = React.useState({
    columns: [
      { title: "Created at", field: "createdAt" },
      { title: "Created by", field: "email" },
      // { title: "Play times", field: "playTimes", type: "numeric" },
      { title: "Full name", field: "fullName" },
      {
        title: "Phone",
        field: "phone",
        render: ({ phone }) => (
          <a href={`tel:${phone}`} alt="">
            {phone || "No phone"}
          </a>
        ),
      },
      {
        title: "Status",
        field: "orderStatus",
        lookup: ORDER_STATUS,
        render: (rowData) => {
          return (
            <Alert
              className="m-0 text-center"
              color={COLOR_ORDER_STATUS[rowData.orderStatus]}
            >
              {capitalizeFirstLetter(rowData.orderStatus)}
            </Alert>
          );
        },
      },
    ],
    data: [
      {
        name: "Thanh nguyen",
        phone: "09123123123",
        playTimes: 12,
        email: "test@.gmail.com",
        createdAt: "12/12/2020",
      },
      {
        name: "Thanh nguyen",
        phone: "09123123123",
        email: "test@.gmail.com",
        playTimes: 12,
        createdAt: "12/12/2020",
      },
    ],
  });

  const formatData = dataSource.map((item) => ({
    ...item,
    email: _.get(item, "order.user.email", ""),
    phone: _.get(item, "order.user.phone"),
    fullName: getFullname(
      _.get(item, "order.user.firstName", ""),
      _.get(item, "order.user.lastName", "")
    ),
  }));
  return (
    <MaterialTable
      icons={tableIcons}
      title="User information"
      columns={state.columns}
      data={formatData}
      options={{
        pageSize: 8,
        headerStyle: {
          fontWeight: "bold",
        },
      }}
    />
  );
}
