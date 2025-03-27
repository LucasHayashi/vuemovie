import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import UserView from "../views/UserView.vue";
import AppMovie from "../components/home/AppMovie.vue";
import AppTv from "../components/home/AppTv.vue";
import AppPerson from "../components/home/AppPerson.vue";
import AppAuthCallback from "../components/auth/AppAuthCallback.vue";

Vue.use(VueRouter);

if (!window.scrollPositions) {
  window.scrollPositions = {};
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: AuthView,
  },
  {
    path: "/auth_callback",
    name: "auth_callback",
    component: AppAuthCallback,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/movie/:movie_id",
    name: "movie",
    component: AppMovie,
    props: true,
  },
  {
    path: "/tv/:serie_id",
    name: "tv",
    component: AppTv,
    props: true,
  },
  {
    path: "/person/:person_id",
    name: "person",
    component: AppPerson,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from) {
    if (from.name === "home") {
      window.scrollPositions.home = { x: window.scrollX, y: window.scrollY };
    }

    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("tmdb_session_id");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
  next();
});

export default router;
