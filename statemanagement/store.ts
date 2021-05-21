import { atom, selector } from "recoil";

export const doFilteringState = atom<boolean>({
    key: "doFilteringState",
    default: false,
});
