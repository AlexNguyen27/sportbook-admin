import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { DATE_TIME } from "../../../utils/common";
import {
  getCategories,
  addCategory,
  deleteCatgory,
  updateCategory,
} from "../../../store/actions/category";

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

import PageLoader from "../../custom/PageLoader";
import Swal from "sweetalert2";
import Colors from "../../../constants/Colors";

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

const CategoriesList = ({
  categories,
  getCategories,
  addCategory,
  updateCategory,
  deleteCatgory,
}) => {
  const [state, setState] = useState({
    columns: [
      {
        title: "Name",
        field: "name",

        validate: (rowData) =>
          rowData.name === ""
            ? { isValid: false, helperText: "Name cannot be empty" }
            : true,
      },
      // {
      //   title: "Status",
      //   field: "status",
      //   lookup: { public: "Public", private: "Private" },
      //   initialEditValue: "public",
      // },
      { title: "Created At", field: "createdAt", editable: "never" },
    ],
    data: [
      {
        name: "home",
        // status: "public",
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCategories(setLoading);
  }, [getCategories, loading]);

  const getDateTime = (date) => moment(date).format(DATE_TIME);

  const categoryArr = Object.keys(categories).map((cateId) => ({
    ...categories[cateId],
    createdAt: getDateTime(categories[cateId].createdAt),
  }));

  return (
    <PageLoader loading={loading}>
      <div style={{ maxWidth: `100%`, overflowX: "auto" }}>
        <MaterialTable
          icons={tableIcons}
          title="List Of Categories"
          columns={state.columns}
          data={categoryArr || []}
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
              icon: () => <Delete style={{ color: Colors.red }} />,
              tooltip: "Delete Category",
              onClick: (event, rowData) => {
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
                    deleteCatgory(setLoading, rowData.id);
                    // deleteUser(setLoading, rowData.id);
                  }
                });
              },
            },
          ]}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const { name } = newData;
                  setLoading(true);
                  addCategory(setLoading, name);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                  // edit categories
                  setLoading(true);
                  const { name, id } = newData;
                  updateCategory(setLoading, name, id);
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 100);
              }),
          }}
        />
      </div>
    </PageLoader>
  );
};
const mapStateToProps = (state) => ({
  categories: state?.category?.categories,
});
export default connect(mapStateToProps, {
  getCategories,
  addCategory,
  deleteCatgory,
  updateCategory,
})(withRouter(CategoriesList));
