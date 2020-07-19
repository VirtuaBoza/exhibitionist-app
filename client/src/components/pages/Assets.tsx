import React from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../../constants";
import TopNav from "../layout/TopNav";
import AddAsset from "./AddAsset";
import BrowseAssets from "./BrowseAssets";

const Assets: React.FC<{}> = () => {
  return (
    <>
      <TopNav />
      <Switch>
        <Route exact path={routes.Assets}>
          <BrowseAssets />
        </Route>
        <Route path={routes.AddAsset}>
          <AddAsset />
        </Route>
      </Switch>
    </>
  );
};

export default Assets;
