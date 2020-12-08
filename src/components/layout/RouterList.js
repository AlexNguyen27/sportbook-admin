import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";

// Route
import NotFound from "../layout/NotFound";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
// import Courses from '../pages/courses/Courses';
import DashBoard from "../pages/DashBoard";
import ProtectedRoute from "../custom/ProtectedRoute";
import ResetPassword from "../pages/auth/ResetPassword";

const RouterList = (props) => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/reset-password" component={ResetPassword} />
        {/* Manager */}
        <ProtectedRoute
          exact
          path="/dashboard"
          component={DashBoard}
        />
        <ProtectedRoute exact path="/ground-management" component={DashBoard} />
        <ProtectedRoute exact path="/order-management" component={DashBoard} />
        <ProtectedRoute exact path="/order-management/:orderId" component={DashBoard} />
        <ProtectedRoute exact path="/sub-ground-management" component={DashBoard} />
        <ProtectedRoute exact path="/loyal-customer" component={DashBoard} />
        <ProtectedRoute exact path="/my-account" component={DashBoard} />
        <ProtectedRoute exact path="/users/:userId" component={DashBoard} />
        <ProtectedRoute exact path="/statistics" component={DashBoard} />
        <ProtectedRoute exact path="/loyal-customer/:userId" component={DashBoard} />


        {/* Admin */}
        <ProtectedRoute exact path="/orders-list" component={DashBoard} />
        <ProtectedRoute exact path="/orders-list/:orderId" component={DashBoard} />
        <ProtectedRoute exact path="/users-list" component={DashBoard} />
        <ProtectedRoute exact path="/managers-list" component={DashBoard} />
        <ProtectedRoute exact path="/categories-list" component={DashBoard} />
        <ProtectedRoute exact path="/benefits-list" component={DashBoard} />

        {/* <ProtectedRoute exact path="/edit-user/:userId" component={DashBoard} />
        <ProtectedRoute
          exact
          path="/user-profile/:userId"
          component={DashBoard}
        />
        <ProtectedRoute exact path="/posts-list" component={DashBoard} />
        <ProtectedRoute exact path="/users-list" component={DashBoard} />
        <ProtectedRoute exact path="/reports-list" component={DashBoard} />
        <ProtectedRoute exact path="/categories-list" component={DashBoard} /> */}

        {/* common */}
        {/* <ProtectedRoute exact path="/user-info" component={DashBoard} />
        <ProtectedRoute exact path="/add-new-post" component={DashBoard} />
        <ProtectedRoute exact path="/view-post/:postId" component={DashBoard} />
        <ProtectedRoute exact path="/edit-post/:postId" component={DashBoard} /> */}

        {/* <ProtectedRoute
          exact
          path="/statistics/:userId"
          component={DashBoard}
        />*/}
        <ProtectedRoute exact path="/help" component={DashBoard} />
        <ProtectedRoute exact path="/notifications" component={DashBoard} />
        <ProtectedRoute exact path="/mails" component={DashBoard} /> 
        <ProtectedRoute component={() => <NotFound center />} />
      </Switch>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(RouterList);
