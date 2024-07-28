import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface I_Auth {
  email: string | null;
  token: string | null;
  isLogin: boolean;
}

const initialValue = {
  email: null,
  token: null,
  isLogin: false,
};
const useAuthStore = create<I_Auth>()(
  persist(
    (_) => ({
      email: null,
      token: null,
      isLogin: false,
    }),
    {
      name: "token",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const setAuthInSession = (auth: I_Auth) =>
  useAuthStore.setState((state) => ({
    ...state,
    ...auth,
  }));
export const resetAuthValue = () =>
  useAuthStore.setState((state) => ({
    ...initialValue,
  }));
export const getAuthValue = <T extends keyof I_Auth>(value: T) =>
  useAuthStore.getState()[value];
export default useAuthStore;

export const getAllAuthValue = () => useAuthStore.getState();
