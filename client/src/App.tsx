import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Assets,
  LandingPage,
  // Login,
  // RegisterOrg,
  // RegisterUser,
  NotFound,
} from "./components/pages";
// import {
//   AuthenticatedRoute,
//   UnauthenticatedOnlyRoute,
// } from "./components/routing";
import { routes } from "./constants";
import { useAuth } from "./hooks";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.Root}>
          {isAuthenticated ? <Assets /> : <LandingPage />}
        </Route>
        {/* <Route path={routes.RegisterOrg}>
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
        </AuthenticatedRoute> */}
        <Route path="*">
          {isAuthenticated ? <NotFound /> : <LandingPage />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
