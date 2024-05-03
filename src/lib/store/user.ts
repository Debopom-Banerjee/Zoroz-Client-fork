import { create } from "zustand";
import { IUser } from "../types/user";

interface UserState {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
}

export const useUser = create<UserState>()((set) => ({
  user: undefined,
  setUser: (user) => set(() => ({ user })),
}));
