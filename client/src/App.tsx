import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ClientCreate from "./components/ClientCreate";
import Home from "./components/Home";
import Login from "./components/Login";
import TopNav from "./components/TopNav";
import { routes } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route path={routes.ClientCreate}>
          <ClientCreate />
        </Route>
        <Route path={routes.Login}>
          <Login />
        </Route>
        <Route exact path={routes.Home}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
