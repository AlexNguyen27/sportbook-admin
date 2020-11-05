import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    marginLeft: "12px",
    marginBottom: "5px",
  },
  item: {
    // border: "1px solid #e3e3e3",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
}));

const data = [
  { name: "Technology" },
  { name: "Fashion" },
  { name: "Experience" },
  { name: "Funny" },
  { name: "Photography" },
];
const CatergoryCard = ({
  categories,
  posts,
  onClickCategory,
  selectedCategoryId,
}) => {
  const classes = useStyles();

  let postCategories = {};
  // GET CATEGORY HAS ON POST
  if (posts && categories) {
    postCategories.news = {
      id: "news",
      name: "News Feed",
    };
    postCategories.all = {
      id: "all",
      name: "All Posts",
    };
    Object.keys(posts).map((key) => {
      if (categories[posts[key].categoryId]) {
        postCategories[posts[key].categoryId] =
          categories[posts[key].categoryId];
      }
    });
  }

  const categoryArr =
    postCategories &&
    Object.keys(postCategories).map((cateId) => postCategories[cateId]);

  return (
    <>
      <Typography variant="h5" gutterBottom className={classes.header}>
        Categories
      </Typography>
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        {categoryArr &&
          categoryArr.length &&
          categoryArr.map((item) => (
            <ListItem
              className={classes.item}
              style={{
                background: item.id === selectedCategoryId ? "#f4eeff" : "",
              }}
              button
              divider
              onClick={() => onClickCategory(item.id)}
            >
              <ListItemText>
                <span
                  style={{
                    fontWeight: item.id === selectedCategoryId ? "bold" : "",
                  }}
                >
                  {item.name}
                </span>
              </ListItemText>
            </ListItem>
          ))}
      </List>
    </>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  posts: state.post.posts,
});
export default connect(mapStateToProps, {})(CatergoryCard);
