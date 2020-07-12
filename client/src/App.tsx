import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { routes } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.Login}>
          <Login />
        </Route>
        <Route path={routes.Home}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
