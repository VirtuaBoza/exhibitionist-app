import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ClientCreate from "./components/ClientCreate";
import Home from "./components/Home";
import Login from "./components/Login";
import TopNav from "./components/TopNav";
import UnauthenticatedOnlyRoute from "./components/UnauthenticatedOnlyRoute";
import { routes } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route path={routes.ClientCreate}>
          <ClientCreate />
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
