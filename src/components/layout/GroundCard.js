import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { connect } from 'react-redux';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PlaceRoundedIcon from "@material-ui/icons/PlaceRounded";
import Colors from "../../constants/Colors";
import EditGroundModal from "../pages/ground/component/EditGroundModal";
import { deleteGround } from "../../store/actions/ground";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: Colors.primary,
  },
}));

const GroundCard = ({ ground, onDelete, onEdit }) => {
  const classes = useStyles();

  const {
    title,
    description,
    createdAt,
    category: { name },
  } = ground;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="icon" className={classes.avatar}>
            <PlaceRoundedIcon />
          </Avatar>
        }
        title={title}
        subheader={`Category: ${name}`}
      />
      <CardMedia
        className={classes.media}
        image={`https://daily.jstor.org/wp-content/uploads/2018/06/soccer_europe_1050x700.jpg`}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          Created at: {moment(createdAt).format("DD/MM/YYYY HH:MM:ss")}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          className={classes.expand}
          onClick={() => onEdit(ground.id)}
          aria-label="Edit this ground"
        >
          <EditIcon /> <span style={{ fontSize: "16px" }}> Edit</span>
        </IconButton>
        <IconButton
          onClick={() => onDelete(ground.id)}
          className="ml-0"
          aria-label="Edit this ground"
          style={{ color: Colors.red }}
        >
          <DeleteIcon /> <span style={{ fontSize: "16px" }}> Delete</span>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default connect(null, { deleteGround })(GroundCard);
