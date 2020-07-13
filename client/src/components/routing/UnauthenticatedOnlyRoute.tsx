import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { routes } from "../../constants";
import { useAuth } from "../../hooks";

const UnauthenticatedOnlyRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Redirect to={routes.Home} />;
  } else {
    return <Route {...props} />;
  }
};

export default UnauthenticatedOnlyRoute;
