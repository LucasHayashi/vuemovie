import Vue from "vue";
import Vuex from "vuex";
import http from "@/services/http";
import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sessionId: localStorage.getItem("tmdb_session_id") || null,
    user: JSON.parse(localStorage.getItem("tmdb_user")) || null,
    isAuthenticated: !!localStorage.getItem("tmdb_session_id"),
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    username: state => state.user.username,
  },
  mutations: {
    SET_SESSION(state, sessionId) {
      state.sessionId = sessionId;
      state.isAuthenticated = true;
      localStorage.setItem("tmdb_session_id", sessionId);
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("tmdb_user", JSON.stringify(user));
    },
    CLEAR_SESSION(state) {
      state.sessionId = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("tmdb_session_id");
      localStorage.removeItem("tmdb_user");
    },
  },
  actions: {
    async login({ dispatch, commit }, requestToken) {
      const { data: { session_id } } = await http.get(`auth/session?request_token=${requestToken}`);

      await dispatch("getUser", session_id).then(() => {
        commit("SET_SESSION", session_id);
        router.push({ name: "user" });
      });
    },
    async getUser({ commit }, payload) {
      const { data } = await http.get(`/user?session_id=${payload}`);
      commit("SET_USER", data);
    },
    async logout({ commit }) {
      const data = await http.delete('auth/session');
      if (data) {
        commit("CLEAR_SESSION");
        if (router.currentRoute.name !== "home") {
          router.push({ name: "home" });
        }
      }
    }
  },
});

export default store;