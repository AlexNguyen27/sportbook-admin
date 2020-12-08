import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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
import Delete from "@material-ui/icons/Delete";
import Colors from "../../../constants/Colors";
import {
  getPrices,
  addPrice,
  updatePrice,
  deletePrice,
} from "../../../store/actions/price";
import PageLoader from "../../custom/PageLoader";
import { DATE_TIME } from "../../../utils/common";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { formatThousandVND } from "../../../utils/commonFunction";

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

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const PriceList = ({
  subGround,
  errors,
  onDelete,
  onEdit,
  getPrices,
  addPrice,
  prices,
  updatePrice,
  deletePrice,
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      {
        title: "From time",
        field: "startTime",

        render: (rowData) => (
          <span>
            {moment(rowData.startTime, "HH:mm:ss A").format("hh:mm A")}
          </span>
        ),
        validate: (rowData) => {
          const startTime = moment(rowData.startTime, "HH:mm:ss");
          const endTime = moment(rowData.endTime, "HH:mm:ss");
          return startTime.isBefore(endTime)
            ? true
            : {
                isValid: false,
                helperText: "Start time should be after end time!",
              };
        },
        initialEditValue: moment().format("HH:mm:00"),
        editComponent: (props) => {
          return (
            <>
              <TextField
                id="startTime"
                type="time"
                size="small"
                // defaultValue={moment().format("HH:mm:ss")}
                defaultValue={props.value}
                className={classes.textField}
                onChange={(e) => props.onChange(e.target.value)}
                error={props.helperText}
                helperText={props.helperText}
              />
            </>
          );
        },
      },
      {
        title: "To time",
        field: "endTime",
        validate: (rowData) => {
          const startTime = moment(rowData.startTime, "HH:mm:ss");
          const endTime = moment(rowData.endTime, "HH:mm:ss");
          return startTime.isBefore(endTime)
            ? true
            : {
                isValid: false,
                helperText: "End time should be after start time!",
              };
        },
        render: (rowData) => (
          <span>{moment(rowData.endTime, "HH:mm:ss A").format("hh:mm A")}</span>
        ),
        initialEditValue: moment().add(1, "hours").format("HH:mm:00"),
        editComponent: (props) => {
          return (
            <>
              <TextField
                id="endTime"
                type="time"
                format=""
                size="small"
                defaultValue={props.value}
                // defaultValue={moment().add(1, "hours").format("HH:mm:ss")}
                className={classes.textField}
                onChange={(e) => props.onChange(e.target.value)}
                // InputProps={{ inputProps: { min: "", max: 10 } }}
                error={props.helperText}
                helperText={props.helperText}
              />
            </>
          );
        },
      },
      {
        title: "Price/hours",
        field: "price",
        type: "numeric",
        initialEditValue: 0,
        render: (rowData) => (
          <span>{formatThousandVND(rowData.price, " VND", 1)}</span>
        ),
      },

      {
        title: "Discount",
        field: "discount",
        type: "numeric",
        initialEditValue: 0,
        validate: (rowData) => rowData.discount > -1 && rowData.discount < 101,
        render: (rowData) => (
          <span>{formatThousandVND(rowData.discount, " %", 1)}</span>
        ),
      },
      // {
      //   title: "Status",
      //   field: "status",
      //   lookup: {
      //     ready: "Ready",
      //     reserved: "Reserved",
      //   },
      //   initialEditValue: "ready",
      //   editable: "never",
      // },
    ],
    data: [
      {
        startTime: "12:00",
        endTime: "12:00",
        price: "10000",
        discount: "0",
        status: "ready",
      },
      {
        startTime: "12:00",
        endTime: "12:00",
        price: "10000",
        discount: "0",
        status: "ready",
      },
    ],
  });

  const getDateTime = (date) => moment(date).format(DATE_TIME);
  const priceArr = Object.keys(prices).map((priceId) => ({
    ...prices[priceId],
    createdAt: getDateTime(prices[priceId].createdAt),
  }));

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPrices(setLoading, subGround.id);
  }, [subGround]);

  return (
    <PageLoader loading={loading}>
      <MaterialTable
        icons={tableIcons}
        title={subGround.name}
        columns={state.columns}
        data={priceArr}
        options={{
          actionsColumnIndex: -1,
          search: false,
          headerStyle: {
            // backgroundColor: "#01579b",
            fontWeight: "bold",
            color: "#393e46",
          },
          cellStyle: {
            fontSize: "14px",
          },
          pageSize: 7,
        }}
        actions={[
          // {
          //   icon: () => <AddBox style={{ color: Colors.primary }} />,
          //   tooltip: "Add price",
          //   isFreeAction: true,
          //   onClick: (event, newData) => {
          //     new Promise((resolve) => {
          //       setTimeout(() => {
          //         resolve();
          //         setState((prevState) => {
          //           const data = [...prevState.data];
          //           data.push(newData);
          //           return { ...prevState, data };
          //         });
          //       }, 600);
          //     });
          //   },
          // },
          {
            icon: () => <Edit style={{ color: Colors.orange }} />,
            tooltip: "Edit sub ground",
            onClick: (event, rowData) => {
              console.log("d00000000000 eidt", subGround);
              onEdit(subGround);
            },
            isFreeAction: true,
          },
          {
            icon: () => <Delete style={{ color: Colors.red }} />,
            tooltip: "Delete sub ground",
            onClick: (event, rowData) => {
              console.log("d00000000000", subGround.id);
              onDelete(subGround.id);
            },
            isFreeAction: true,
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              resolve();
              setLoading(false);
              const priceData = {
                price: newData.price,
                discount: newData.discount,
                startTime: newData.startTime,
                endTime: newData.endTime,
                subGroundId: subGround.id,
              };
              addPrice(setLoading, priceData);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              console.log("new data--------------------", newData);
              resolve();
              setLoading(true);
              const priceData = {
                id: oldData.id,
                price: newData.price,
                discount: newData.discount,
                startTime: newData.startTime,
                endTime: newData.endTime,
                subGroundId: subGround.id,
              };
              updatePrice(setLoading, priceData);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              resolve();
              setLoading(true);
              deletePrice(setLoading, oldData.id);
            }),
        }}
      />
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  prices: state.price.prices,
});
export default connect(mapStateToProps, {
  getPrices,
  addPrice,
  updatePrice,
  deletePrice,
})(PriceList);
