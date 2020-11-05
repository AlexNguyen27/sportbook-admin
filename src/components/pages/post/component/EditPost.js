import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PageTitle from "../../../custom/PageTitle";
import TextEditor from "../../../custom/TextEditor";
import Button from "@material-ui/core/Button";
import { Row } from "reactstrap";
import { Grid } from "@material-ui/core";
import DropdownV2 from "../../../custom/DropdownV2";
import { getPostById, updatePost } from "../../../../store/actions/post";
import { POST_STATUS_ARRAY } from "../../../../utils/common";
import PageLoader from "../../../custom/PageLoader";

const status = [
  { id: 0, name: "Private", value: "private" },
  { id: 1, name: "Public", value: "public" },
];

const EditPost = ({
  selectedPost,
  postId,
  categories,
  getPostById,
  updatePost,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPostById(setLoading, postId);
    setBlogData(
      { title: selectedPost.title, description: selectedPost.description } || {}
    );
  }, [selectedPost.id]);

  // IF THERE IS PRE-DEFINED PAGE CONTENTS, INITIALIZE BLOG DATA WITH IT
  const [blogData, setBlogData] = useState(
    { title: selectedPost.title, description: selectedPost.description } || {}
  );
  // DESTRUCTURE BLOG DATA
  const { description, title } = blogData || {};

  const categoryArr = Object.keys(categories).map((key) => categories[key]);

  // status: 0: private, 1: public
  const [selectedDropdownData, setSelectedDropdownData] = useState({
    selectedCategoryIndex: (selectedPost && selectedPost.categoryId) || "",
    selectedStatusValue: (selectedPost && selectedPost.status) || "",
  });

  const { selectedCategoryIndex, selectedStatusValue } = selectedDropdownData;

  // HANDLE CHANGE IN TEXT EDITOR
  const onChangeEditor = (textBody) => {
    setBlogData({
      ...blogData,
      description: textBody,
    });
    // updateBlog(pageId, textBody);
  };

  // HANDLE PAGE TITLE INPUT
  const onEntertitle = (e) => {
    setBlogData({
      ...blogData,
      title: e.target.value,
    });
  };

  const onSelectCategory = (selectedCategoryIndex) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedCategoryIndex,
    });
  };

  const onSelectStatus = (selectedStatusValue) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedStatusValue,
    });
  };

  const handleOnSubmit = () => {
    const postData = {
      id: selectedPost.id,
      title: blogData.title,
      description: blogData.description,
      status: selectedStatusValue,
      categoryId: selectedCategoryIndex,
    };
    updatePost(setLoading, postData);
  };

  return (
    <Fragment>
      <PageLoader loading={loading}>
        <PageTitle
          title={title}
          onChange={onEntertitle}
          center="true"
          editMode="true"
        />
        <Grid container justify="flex-end">
          <Grid item xs={4}>
            <DropdownV2
              fullWidth
              label="Category"
              value={selectedCategoryIndex.toString()}
              options={categoryArr || []}
              valueBasedOnProperty="id"
              displayProperty="name"
              onChange={(categoryIndex) => onSelectCategory(categoryIndex)}
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item xs={2} className="mt-2">
            <DropdownV2
              fullWidth
              label="Status"
              value={selectedStatusValue.toString()}
              options={POST_STATUS_ARRAY || []}
              valueBasedOnProperty="name"
              displayProperty="value"
              onChange={(statusIndex) => onSelectStatus(statusIndex)}
            />
          </Grid>
        </Grid>

        <hr className="mb-0" />
        <TextEditor
          className="blog editMode"
          value={description}
          onChange={onChangeEditor}
          placeholder="Enter body blog here"
        />
        <Grid container justify="center" className="mt-4">
          <Button
            variant="contained"
            color="primary"
            style={{}}
            onClick={() => handleOnSubmit()}
          >
            Submit
          </Button>
        </Grid>
      </PageLoader>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  selectedPost: state.post.selected_post,
  //   preDefinedPageContents: state.edit_view_page.page_contents[0]
});
export default connect(mapStateToProps, { getPostById, updatePost })(EditPost);
