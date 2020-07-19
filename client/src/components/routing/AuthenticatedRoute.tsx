import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { routes } from "../../constants";
import { useAuth } from "../../hooks";

const AuthenticatedRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    return <Redirect to={routes.Root} />;
  }
};

export default AuthenticatedRoute;
