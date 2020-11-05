import React from "react";
import { connect } from "react-redux";
import MultipleSummary from "../MultipleSummary";

const StatisticsPost = ({ users, userId, role, userProfile }) => {
  const postName =
    userProfile &&
    (role === "user" ? userProfile.posts : users[userId].posts).map(
      (post) => post.title
    );
  const postReactionLike =
    userProfile &&
    (role === "user" ? userProfile.posts : users[userId].posts).map(
      (post) => post.reactions.length
    );

  let postViews =
    userProfile &&
    (role === "user" ? userProfile.posts : users[userId].posts).map(
      (post) => post.view
    );

  return (
    <>
      <h4 className="mt-4">Statistics Likes</h4>
      <MultipleSummary name={postName} like={postReactionLike} />
      <h4 className="mt-4">Statistics Views</h4>
      <MultipleSummary
        name={postName}
        view={postViews.slice(0, postName.length)}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  role: state.auth.user.role,
  userProfile: state.user_profile.user_profile,
});
export default connect(mapStateToProps, null)(StatisticsPost);
