import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUsers,
  editUserInfo,
  deleteUser,
} from "../../../store/actions/user";
import { SAVE_CURRENT_USER } from "../../../store/actions/types";
import { ROLE } from "../../../utils/common";
import { getFullname, getDateTime } from "../../../utils/commonFunction";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import EqualizerTwoToneIcon from "@material-ui/icons/EqualizerTwoTone";
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

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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

const UsersList = ({
  getUsers,
  history,
  editUserInfo,
  deleteUser,
  user: { users }
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    columns: [
      { title: "Email", field: "email", type: "email" },
      { title: "Full name", field: "fullname" },
      {
        title: "Role",
        field: "role",
      },
      // {
      //   title: "Total Posts",
      //   field: "totalPosts",
      //   editable: "never",
      // },
      {
        title: "Created at",
        field: "createdAt",
        editable: "never",
      },
      {
        title: "Updated at",
        field: "updatedAt",
        editable: "never",
      },
    ],
    data: [
      {
        fullname: "Nguyen le Ngocj thanh ",
        email: "thanh@gmail.com",
        createdDate: moment("2020-05-29T14:49:05.661Z").format("MMM DD h:mm A"),
        role: 'user',
        totalPosts: 10,
        createdAt: '12/12/2020',
        updatedAt: '12/12/2020'
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUsers({role: ROLE.user}, setLoading);
  }, []);

  const usersArray = Object.keys(users).map((userId) => ({
    ...users[userId],
    createdAt: getDateTime(users[userId].createdAt),
    updatedAt: getDateTime(users[userId].updatedAt),
    fullname: getFullname(users[userId].firstName, users[userId].lastName),
  }));


  console.log(usersArray);

  return (
    <PageLoader loading={loading}>
      <div style={{ maxWidth: `100%`, overflowX: "auto" }}>
        <MaterialTable
          icons={tableIcons}
          title="List Of Users"
          columns={state.columns}
          data={usersArray || []}
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
              icon: () => <Edit style={{ color: Colors.orange }}/>,
              tooltip: "Edit User",
              onClick: (event, rowData) => {
                // console.log("edit---", rowData);
                dispatch({
                  type: SAVE_CURRENT_USER,
                  currentUser: rowData,
                });
                history.push(`/users/${rowData.id}`);
                // Do save operation
              },
            },
            // {
            //   icon: () => <Delete style={{ color: Colors.red }}/>,
            //   tooltip: "Delete User",
            //   onClick: (event, rowData) => {
            //     Swal.fire({
            //       title: `Are you sure to delete ?`,
            //       text: "You won't be able to revert this!",
            //       type: "warning",
            //       showCancelButton: true,
            //       confirmButtonColor: "#3085d6",
            //       cancelButtonColor: "#d33",
            //       confirmButtonText: "Yes, delete it!",
            //     }).then((result) => {
            //       if (result.value) {
            //         setLoading(true);
            //         deleteUser(setLoading, rowData.id);
            //       }
            //     });
            //   },
            // },
            // rowData => ({
            //   icon: (props) => <EqualizerTwoToneIcon  />,
            //   tooltip: "Statictis",
            //   onClick: (event, rowData) => {
            //     history.push(`statistics/${rowData.id}`);
            //   },
            //   // disabled: !rowData.posts.length
            // }),
            
          ]}
        />
      </div>
    </PageLoader>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  getUsers,
  editUserInfo,
  deleteUser,
})(withRouter(UsersList));
