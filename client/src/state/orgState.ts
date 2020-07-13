import { atom } from "recoil";
import Org from "../models/org.model";

const orgState = atom<Org>({
  key: "orgState",
  default: {
    id: null,
    name: null,
  },
});

export default orgState;
