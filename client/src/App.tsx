import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopNav from "./components/layout/TopNav";
import {
  Assets,
  Home,
  Login,
  RegisterOrg,
  RegisterUser,
} from "./components/pages";
import {
  AuthenticatedRoute,
  UnauthenticatedOnlyRoute,
} from "./components/routing";
import { routes } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route path={routes.RegisterOrg}>
          <RegisterOrg />
        </Route>
        <Route path={routes.RegisterUser}>
          <RegisterUser />
        </Route>
        <UnauthenticatedOnlyRoute path={routes.Login}>
          <Login />
        </UnauthenticatedOnlyRoute>
        <AuthenticatedRoute path={routes.Assets}>
          <Assets />
        </AuthenticatedRoute>
        <Route exact path={routes.Home}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
