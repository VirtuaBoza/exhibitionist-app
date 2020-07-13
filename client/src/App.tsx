import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import RegisterOrg from "./components/RegisterOrg";
import RegisterUser from "./components/RegisterUser";
import TopNav from "./components/TopNav";
import UnauthenticatedOnlyRoute from "./components/UnauthenticatedOnlyRoute";
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
        <Route exact path={routes.Home}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
