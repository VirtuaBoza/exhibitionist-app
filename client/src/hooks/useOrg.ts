import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import Org from "../models/org.model";

const key = "orgState";

const persistedState = localStorage.getItem(key);

const orgState = atom<Org>({
  key,
  default: (persistedState && JSON.parse(persistedState)) || {
    id: null,
    name: null,
  },
});

interface OrgHookValue {
  org: Org;
  setOrg: (org: Org) => void;
}

export default function useOrg(): OrgHookValue {
  const [org, setOrgState] = useRecoilState(orgState);

  const setOrg = useCallback(
    (newOrg: Org) => {
      setOrgState(newOrg);
      localStorage.setItem(key, JSON.stringify(newOrg));
    },
    [setOrgState]
  );

  return {
    org,
    setOrg,
  };
}
