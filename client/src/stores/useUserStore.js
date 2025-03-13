import { create } from "zustand";
import axios from "../config/axois.js"
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do NOT match")
        }

        try {
            const res = await axios.post("/auth/signup", { name, email, password });
            set({ user: res.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(`Client Signup Axios Error: ${error.response.data.message || "Client Signup Axios Error: Unknown Error. Try again later."}`);
        }

    },
    login: async ({ email, password }) => {
        set({ loading: true });

        try {
            const res = await axios.post("/auth/login", { email, password });
            set({ user: res.data, loading: false });
            localStorage.setItem("user", JSON.stringify(res.data));
            // console.log(`From useUserStore.js: ${res.data}`)
        } catch (error) {
            set({ loading: false });
            toast.error(`Client Signup Axios Error: ${error.response.data.message || "Client Signup Axios Error: Unknown Error. Try again later."}`);
        }

    },

    logout: async () => {
        try {
            await axios.post("/auth/logout");
            set({ user: null });
            localStorage.removeItem("user");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occured during logout!")
        }
    },

    checkAuth: async () => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) set({ user: savedUser });

        set({ checkingAuth: true });
        try {
            const response = await axios.get("/auth/profile");
            set({ user: response.data, checkingAuth: false });
            localStorage.setItem("user", JSON.stringify(response.data)); // update stored user data
        } catch (error) {
            set({ checkingAuth: false, user: null });
            localStorage.removeItem("user");
        }
    }
}));

// TODO: axios interceptors -> refreshing access token (making sure the user doesnt have to login in every 15 mins)