import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("jwt") || null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("jwt", token);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem("jwt");
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
});