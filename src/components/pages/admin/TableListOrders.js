import React, { useState } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import {
  DATE_TIME,
  ORDER_STATUS,
  PAYMENT_TYPE,
  COLOR_ORDER_STATUS,
  ORDER_STATUS_OPTION,
} from "../../../utils/common";
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
import { Alert } from "reactstrap";
import Colors from "../../../constants/Colors";
import {
  capitalizeFirstLetter,
  formatThousandVND,
  getFullname,
  getDateTime,
} from "../../../utils/commonFunction";
import { getOrders, updateOrderStatus } from "../../../store/actions/order";
import DropdownV2 from "../../custom/DropdownV2";

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

const TableListOrders = ({ orders, auth: { isAdmin }, setLoading }) => {
  const [state, setState] = useState({
    columns: [
      {
        title: "ID",
        field: "index",
        hidden: true,
        export: true,
      },
      {
        title: "Full Name",
        field: "fullName",
        hidden: true,
        export: true,
      },
      {
        title: "Phone",
        field: "phone",
        hidden: true,
        export: true,
      },
      {
        title: "Email",
        field: "email",
        hidden: true,
        export: true,
      },
      {
        title: "Ground Name",
        field: "groundName",
        export: true,
        editable: "never",
      },
      {
        title: "Sub ground name",
        field: "subGroundName",
        hidden: true,
        export: true,
      },
      { title: "Start day", field: "startDay", editable: "never" },
      {
        title: "Start time",
        field: "startTime",
        editable: "never",
        render: (rowData) => {
          return (
            <span>
              {moment(rowData.startTime, "HH:mm:ss").format("hh:mm A")}
            </span>
          );
        },
      },
      {
        title: "End time",
        field: "endTime",
        editable: "never",
        render: (rowData) => {
          return (
            <span>{moment(rowData.endTime, "HH:mm:ss").format("hh:mm A")}</span>
          );
        },
      },
      {
        title: "Amount(VND)",
        field: "amount",
        editable: "never",
        render: (rowData) => {
          return (
            <span>{formatThousandVND(Number(rowData.amount) || 0, "đ")}</span>
          );
        },
      },
      {
        title: "Payment",
        field: "paymentType",
        headerStyle: { minWidth: 40 },
        cellStyle: { minWidth: 40 },
        lookup: PAYMENT_TYPE,
        render: (rowData) => {
          return <span>{capitalizeFirstLetter(rowData.paymentType)}</span>;
        },
        editable: "never",
      },
      {
        title: "Status",
        field: "status",
        customSort: (a, b) => a.status.length - b.status.length,
        headerStyle: { minWidth: 200 },
        cellStyle: { minWidth: 200 },
        editComponent: (props) => {
          const oldRowStatus = props.rowData?.defaultStatus;
          const statusArr = Object.keys(
            ORDER_STATUS_OPTION[oldRowStatus] || {}
          ).map((key) => ({
            key: key,
            value: ORDER_STATUS_OPTION[oldRowStatus][key],
          }));
          return (
            <DropdownV2
              fullWidth
              size="small"
              value={props.rowData.status || ""}
              options={statusArr || []}
              valueBasedOnProperty="key"
              displayProperty="value"
              onChange={(key) => props.onChange(key)}
            />
          );
        },
        render: (rowData) => {
          return (
            <Alert
              className="m-0 text-center"
              color={COLOR_ORDER_STATUS[rowData.status]}
            >
              {ORDER_STATUS[rowData.status]}
            </Alert>
          );
        },
        initialEditValue: "waiting_for_approve",
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
  const orderArr = Object.keys(orders).map((orderId, index) => ({
    ...orders[orderId],
    subGroundName: orders[orderId]?.subGround?.name || "",
    amount: (
      (orders[orderId].price * (100 - orders[orderId].discount)) /
      100
    ).toString(),
    discount: orders[orderId].discount.toString(),
    createdAt: getDateTime(orders[orderId].createdAt),
    index,
    fullName: getFullname(
      orders[orderId]?.user?.firstName,
      orders[orderId]?.user?.lastName
    ),
    phone: orders[orderId]?.user?.phone,
    email: orders[orderId]?.user?.email,
    groundName: orders[orderId]?.subGround?.ground?.title,
    defaultStatus: orders[orderId].status,
  }));
  const history = useHistory();

  return (
    <MaterialTable
      icons={tableIcons}
      title="List Of Orders"
      columns={state.columns}
      data={orderArr || []}
      options={{
        sorting: true,
        pageSize: 6,
        pageSizeOptions: [5, 6, 10, 20],
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
          icon: () => <VisibilityIcon style={{ color: Colors.view }} />,
          tooltip: "Order Detai",
          onClick: (event, rowData) => {
            history.push(`order-detail/${rowData.id}`);
          },
        },
      ]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            resolve();
            const { status, id } = newData;
            if (newData.status !== oldData.status) {
              setLoading(true);
              updateOrderStatus(setLoading, { id, status });
            }
          }),
        isEditHidden: (rowData) =>
          ["cancelled", "finished", "paid"].includes(rowData.status) || isAdmin,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  auth: state.auth,
});
export default connect(mapStateToProps, { getOrders, updateOrderStatus })(
  withRouter(TableListOrders)
);
