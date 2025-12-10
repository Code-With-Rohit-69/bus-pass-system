import { create } from "zustand";
import axios from "axios";
import { useRouter } from "next/navigation";

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

  fetchUser: async () => {
    set({ loading: true });

    try {
      const res = await axios.get(`${API}/api/auth/me`);

      console.log("Fetch User Response:", res.data);

      if (res?.data?.success) {
        set({ loading: false, user: res.data.user, error: null });
        return res.data.user;
      } else {
        set({ loading: false, user: null });
      }
    } catch (error) {
      console.log("Error fetching user:", error);
      set({ loading: false, user: null });
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      const res = await axios.post(
        `${API}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Logout: ", res.data);

      set({ loading: false, user: null, error: null });
    } catch (error) {
      console.log("Error in Logout user:", error);
      set({ loading: false });
    }
  },
}));
