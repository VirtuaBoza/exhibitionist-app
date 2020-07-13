import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Assets from "./components/Assets";
import Home from "./components/Home";
import TopNav from "./components/layout/TopNav";
import Login from "./components/Login";
import RegisterOrg from "./components/RegisterOrg";
import RegisterUser from "./components/RegisterUser";
import AuthenticatedRoute from "./components/routing/AuthenticatedRoute";
import UnauthenticatedOnlyRoute from "./components/routing/UnauthenticatedOnlyRoute";
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
