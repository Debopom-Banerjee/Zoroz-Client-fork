import { create } from "zustand";


interface UserTypeState {
    userType: string | undefined;
    setUserType: (user: string | undefined) => void;
  }
  
  export const useUserType = create<UserTypeState>()((set) => ({
    userType: undefined,
    setUserType: (userType) => set(() => ({ userType })),
  }));
  