import React from "react";
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
import Colors from "../../constants/Colors";

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

const TableSubGround = ({ subGround, errors, onDelete, onEdit }) => {
  const [state, setState] = React.useState({
    columns: [
      { title: "From", field: "fromTime" },
      { title: "To", field: "toTime" },
      { title: "Price/hours", field: "price", type: "numeric" },
      { title: "Discount", field: "discount", type: "numeric" },
      {
        title: "Status",
        field: "status",
        lookup: {
          ready: "Ready",
          reserved: "Reserved",
        },
        initialEditValue: "public",
        editable: "never",
      },
    ],
    data: [
      {
        fromTime: "12:00",
        toTime: "12:00",
        price: "10000",
        discount: "0",
        status: "ready",
      },
      {
        fromTime: "12:00",
        toTime: "12:00",
        price: "10000",
        discount: "0",
        status: "ready",
      },
    ],
  });

  return (
    <MaterialTable
      icons={tableIcons}
      title={subGround.name}
      columns={state.columns}
      data={state.data}
      options={{
        actionsColumnIndex: -1,
        search: false,
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
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, null)(TableSubGround);
