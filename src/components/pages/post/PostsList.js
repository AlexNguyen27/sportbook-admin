import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { DATE_TIME, POST_STATUS_OBJECT } from "../../../utils/common";

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
import { getPosts, deletePost } from "../../../store/actions/post";
import { Button } from "@material-ui/core";
import { getCategories } from "../../../store/actions/category";
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

const PostsList = ({
  getPosts,
  posts,
  deletePost,
  categories,
  getCategories,
}) => {
  const history = useHistory();
  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "title" },
      { title: "Category", field: "categoryName" },
      { title: "Status", field: "status", lookup: POST_STATUS_OBJECT },
      { title: "Author", field: "username" },
      { title: "Like", field: "totalLike" },
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
        title: "Weather",
        category: "Home",
        status: "public",
        author: "Thanh Nguyen",
        totalLike: 100,
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
        updatedAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPosts(setLoading);
    if (!categories) {
      setLoading(false);
      getCategories(setLoading);
    }
  }, [loading]);

  const getDateTime = (date) => moment(date).format(DATE_TIME);

  const postsArray = Object.keys(posts).map((postId) => {
    const post = posts[postId];
    return {
      ...post,
      createdAt: getDateTime(post.createdAt),
      updatedAt: getDateTime(post.updatedAt),
      categoryName: post.category ? post.category.name : "",
      username: post.user ? post.user.username : "",
      totalLike: post.reactions ? post.reactions.length : 0,
    };
  });

  return (
    <PageLoader loading={loading}>
      <div style={{ maxWidth: `100%`, overflowX: "auto" }}>
        <MaterialTable
          icons={tableIcons}
          title="List Of Posts"
          columns={state.columns}
          data={postsArray || []}
          options={{
            pageSize: 8,
            headerStyle: {
              fontWeight: "bold",
            },
            rowStyle: {
              overflowX: "auto",
            },
          }}
          actions={[
            {
              icon: () => <Visibility style={{ color: Colors.view }} />,
              tooltip: "View Post",
              onClick: (event, rowData) => {
                // window.open(`view-post/${rowData.id}`, "_blank");
                history.push(`/view-post/${rowData.id}`);
              },
            },
            {
              icon: () => <Edit style={{ color: Colors.orange }} />,
              tooltip: "Edit Post",
              onClick: (event, rowData) => {
                // window.open(`edit-post/${rowData.id}`, "_blank");
                history.push(`/edit-post/${rowData.id}`);
              },
            },
            {
              icon: () => <Delete style={{ color: Colors.red }} />,
              tooltip: "Delete Post",
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
                    deletePost(setLoading, rowData.id);
                  }
                });
              },
            },
            {
              icon: () => <AddBox />,
              onClick: (event, rowData) => {
                history.push("/add-new-post");
              },
              isFreeAction: true,
              tooltip: "Add Post",
            },
          ]}
        />
      </div>
    </PageLoader>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.post.posts,
  categories: state.category.categories,
});
export default connect(mapStateToProps, {
  getPosts,
  deletePost,
  getCategories,
})(withRouter(PostsList));
