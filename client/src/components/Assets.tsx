import * as React from "react";
import { selector } from "recoil";
import fetchAssets from "../graphql/queries/fetchAssets";
import orgState from "../state/orgState";

export const assetsQuery = selector({
  key: "assetsQuery",
  get: ({ get }) => {
    const org = get(orgState);
    return org.id ? fetchAssets(org.id) : [];
  },
});

const Assets: React.FC<{}> = (props) => {
  return <div>Assets</div>;
};

export default Assets;
