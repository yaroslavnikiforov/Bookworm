import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";

const App = ({ location }) => (
  <div className="ui container">
    <Route location={location} exact path="/" component={HomePage} />

    <Route
      location={location}
      exact
      path="/confirmation/:token"
      component={ConfirmationPage}
    />

    <GuestRoute location={location} exact path="/login" component={LoginPage} />

    <GuestRoute
      location={location}
      exact
      path="/signup"
      component={SignupPage}
    />

    <GuestRoute
      location={location}
      exact
      path="/forgot_password"
      component={ForgotPasswordPage}
    />

    <GuestRoute
      location={location}
      exact
      path="/reset_password/:token"
      component={ResetPasswordPage}
    />

    <UserRoute
      location={location}
      exact
      path="/dashboard"
      component={DashboardPage}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
