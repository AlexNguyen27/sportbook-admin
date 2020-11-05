import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    fontStyle: "italic",
    marginLeft: "12px",
  }
}));

const date = [
  { name: "December", year: 2020, posts: 100 },
  { name: "August", year: 2020, posts: 100 },
  { name: "July", year: 2020, posts: 100 },
  { name: "June", year: 2020, posts: 100 },
  { name: "May", year: 2020, posts: 100 },
];
const Archives = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" gutterBottom className={classes.header}>
        Archives
      </Typography>
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        {date.map((item) => (
          <ListItem button divider>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <ListItemText>
                  {item.name} {item.year}
                </ListItemText>
              </Grid>
              <Grid item xs={6}>
                <ListItemText>({item.posts})</ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Archives;
