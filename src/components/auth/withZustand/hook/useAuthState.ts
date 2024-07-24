import { create } from "zustand";
import { persist } from "zustand/middleware";
interface I_Auth {
  email: string;
  token: string;
}
const useAuthStore = create(persist());
