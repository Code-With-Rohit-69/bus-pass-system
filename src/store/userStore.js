import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API = process.env.NEXT_PUBLIC_API_URL || "";

export const useUserStore = create((set) => ({
  loading: false,
  user: null,
  error: null,

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API}/api/auth/register`, userData);
      console.log(res);

      set({ loading: false, user: res.data.user });
      return res.data;
    } catch (error) {
      console.log(`Error in Register store ${error}`);
      const errMsg = error?.response?.data?.message || "Something went Wrong";

      set({ loading: false, error: errMsg });

      return { success: false, message: errMsg };
    }
  },

  login: async (userData) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post(`${API}/api/auth/login`, userData);

      set({ loading: false, user: res?.data?.user });
      return res.data;
    } catch (error) {
      console.log(`Error in Login store ${error}`);
      const errMsg = error?.response?.data?.message || "Something went Wrong";

      set({ loading: false, error: errMsg });

      return { success: false, message: errMsg };
    }
  },
}));
