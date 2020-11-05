import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  AUTHENTICATE,
  BASE_URL,
  GET_POSTS,
  GET_SELECTED_POST,
  DELETE_POST,
  EDIT_POST,
} from "./types";
import { useHistory } from "react-router-dom";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";
import Swal from "sweetalert2";

//LOGIN User
export const getPosts = (setLoading) => async (dispatch, getState) => {
  const { token } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
            query {
                getPosts {
                    id
                    title
                    description
                    status
                    view
                    imageUrl
                    createdAt
                    updatedAt
                    categoryId
                    comments{
                        id
                        comment
                        userId
                        parentId
                        createdAt
                        updatedAt
                    }
                    reactions {
                        userId
                        reactionTypeId
                        postId
                    }
                    user {
                      id 
                      username
                      firstName
                      lastName
                      imageUrl
                    }  
                    category {
                      id 
                      name
                    }
                }
            }
        `,
    variables: {},
  });
  if (!errors) {
    const posts = arrayToObject(data.getPosts);

    dispatch({
      type: GET_POSTS,
      posts,
    });
    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

//LOGIN User
export const getAllPublicPost = (setLoading) => async (dispatch, getState) => {
  const { token } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
            query {
                getPosts(all: true) {
                    id
                    title
                    description
                    status
                    imageUrl
                    view
                    createdAt
                    updatedAt
                    categoryId
                    userId
                    comments{
                        id
                        comment
                        userId
                        parentId
                        createdAt
                        updatedAt
                    }
                    reactions {
                        userId
                        reactionTypeId
                        postId
                    }
                    user {
                      id 
                      username
                      firstName
                      lastName
                      imageUrl
                    }  
                    category {
                      id 
                      name
                    }
                }
            }
        `,
    variables: {},
  });
  if (!errors) {
    const posts = arrayToObject(data.getPosts);

    dispatch({
      type: GET_POSTS,
      posts,
    });
    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const addNewPost = (
  bodyText,
  title,
  categoryId,
  status,
  history
) => async (dispatch, getState) => {
  const {
    token,
    user: { id: userId },
  } = getState().auth;
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
        mutation {
          createPost(title: $title,status: $status,description: $description,userId: $userId,categoryId: $categoryId) {
            id
            title
            description
            status
            imageUrl
            createdAt
            updatedAt
            categoryId
            comments{
                id
                comment
                userId
                parentId
                createdAt
                updatedAt
            }
            reactions {
                userId
                reactionTypeId
                postId
            }
            user {
              id 
              username
              firstName
              lastName
            }  
            category {
              id 
              name
            }
          }
        }
      `,
    variables: {
      title: title,
      status: status,
      description: bodyText,
      userId: userId,
      categoryId: categoryId,
    },
  });

  console.log(data);
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });
    Swal.fire({
      position: "center",
      type: "success",
      title: "Added successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    history.push(`/user-profile/${userId}`);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

//LOGIN User
export const getPostById = (setLoading, id) => async (dispatch, getState) => {
  const {
    token,
    user: { id: userId },
  } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
            query {
              getPostById(id: $id) {
                    id
                    title
                    description
                    status
                    view
                    imageUrl
                    createdAt
                    updatedAt
                    categoryId
                    user {
                      id 
                      username
                      firstName
                      lastName
                      email
                      phone
                      address 
                      imageUrl
                      githubUsername
                    }
                    comments{
                        id
                        comment
                        userId
                        user {
                          username
                          firstName
                          lastName
                          imageUrl
                        }
                        parentId
                        createdAt
                        updatedAt
                    }
                    reactions {
                        userId
                        reactionTypeId
                        postId
                    }
                    category {
                      id 
                      name
                    }
                }
            }
        `,
    variables: {
      id,
    },
  });
  if (!errors) {
    const { getPostById: currentPost } = data;
    dispatch({
      type: GET_SELECTED_POST,
      post: currentPost,
    });
    setLoading(false);

    // if (!isEdit) {
    //   if (
    //     currentPost.reactions.length &&
    //     !!currentPost.reactions.find((reaction) => reaction.userId === userId)
    //   ) {
    //     setCurrentLike(1);
    //     setIsLike(true);
    //   }
    // }
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const deletePost = (setLoading, id) => async (dispatch, getState) => {
  console.log("-deletePost----------");
  const { token } = getState().auth;
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
      mutation {
        deletePost(id: $id) {
          status,
          message
        }
      } 
    `,
    variables: {
      id,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: DELETE_POST,
      selectedId: id,
    });
    Swal.fire({
      position: "center",
      type: "success",
      title: "Deleted successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);
  } else {
    console.log(errors);
    logoutDispatch(dispatch, errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: errors[0].message,
      showConfirmButton: true,
    });
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const updatePost = (setLoading, postData) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;

  const { id, title, description, status, categoryId } = postData;
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
      mutation {
        updatePost(
          id: $id,
          title: $title,
          description: $description,
          status: $status,
          categoryId: $categoryId,
        ) {
          id
          title
          status
          description
          view
          category {
            id
            name
          }
        }
      } 
    `,
    variables: {
      id,
      title,
      description,
      status,
      categoryId,
    },
  });
  if (!errors) {
    dispatch({
      type: CLEAR_ERRORS,
    });

    dispatch({
      type: EDIT_POST,
      post: data.updatePost,
    });
    setLoading(false);
    Swal.fire({
      position: "center",
      type: "success",
      title: "Your work has been save!",
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);
  } else {
    console.log(errors);
    Swal.fire({
      position: "center",
      type: "Warning",
      title: "Please check the input!",
      showConfirmButton: false,
      timer: 1500,
    });
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
