import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() => {
        return user.token && user.isAdmin ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: "/dashboard" } }}
          ></Redirect>
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
