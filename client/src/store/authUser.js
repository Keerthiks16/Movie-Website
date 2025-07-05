import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  Loading: false,
  AuthLoading: true,

  signup: async (formData) => {
    set({ Loading: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", formData, {
        withCredentials: true,
      });
      set({ user: response.data.user, Loading: false });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      set({ Loading: false });
    }
  },

  login: async (formData) => {
    try {
      set({ Loading: true });
      const response = await axios.post("/api/v1/auth/login", formData, {
        withCredentials: true,
      });
      set({ user: response.data.user, Loading: false });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ Loading: false });
    }
  },

  logout: async () => {
    try {
      set({ Loading: true });
      await axios.post(
        "/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      set({ user: null, Loading: false });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      set({ Loading: false });
    }
  },

  authCheck: async () => {
    try {
      set({ AuthLoading: true });
      const response = await axios.get("/api/v1/auth/authcheck", {
        withCredentials: true,
      });
      set({ user: response.data.user, AuthLoading: false });
    } catch (error) {
      set({ user: null, AuthLoading: false });
    }
  },
}));
