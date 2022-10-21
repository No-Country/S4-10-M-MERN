import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "centralState",
  storage: localStorage,
});

export const userState = atom({
  key: "userState",
  default: {
    token: "",
    username: ""
  },
  effects_UNSTABLE: [persistAtom],
});
