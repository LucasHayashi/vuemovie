<template>
  <v-app>
    <v-app-bar app fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="40"
        @click="goHome"
        style="cursor: pointer"
      />

      <v-toolbar-title
        v-if="$vuetify.breakpoint.smAndUp"
        @click="goHome"
        dark
        style="cursor: pointer"
        >Vue Movie</v-toolbar-title
      >

      <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>

      <AppSearch />
      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-spacer></v-spacer>
        <v-switch
          class="mr-2"
          v-model="$vuetify.theme.dark"
          @change="darkMode"
          append-icon="mdi-moon-waning-crescent"
          prepend-icon="mdi-white-balance-sunny"
          hide-details
          color="yellow"
        >
        </v-switch>
        <template v-if="isAuthenticated">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="primary">{{
                username
              }}</v-btn>
            </template>
            <v-list>
              <v-list-item @click="logout">
                <v-list-item-title>Sair</v-list-item-title>
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item :to="{ name: 'user' }">
                <v-list-item-title>Minhas listas</v-list-item-title>
                <v-list-item-icon>
                  <v-icon>mdi-movie-star</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-btn :to="{ name: 'login' }" color="primary">
            <span class="mr-2">Entrar</span>
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </template>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary height="100%">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Vue Movie </v-list-item-title>
          <v-list-item-subtitle v-if="isAuthenticated">
            Olá, {{ username }}
          </v-list-item-subtitle>
          <v-switch
            v-model="$vuetify.theme.dark"
            @change="darkMode"
            append-icon="mdi-moon-waning-crescent"
            prepend-icon="mdi-white-balance-sunny"
            hide-details
            color="yellow"
          ></v-switch>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item-group v-model="selectedItem" color="primary">
          <template v-for="item in items">
            <v-list-item
              :key="item.id"
              :to="{ name: item.route }"
              v-if="item.auth === isAuthenticated || !item.auth"
              exact
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2" v-if="isAuthenticated">
          <v-btn @click="logout" block color="primary">
            <span class="mr-2">Sair</span>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
        <div class="pa-2" v-else>
          <v-btn :to="{ name: 'login' }" block color="primary">
            <span class="mr-2">Entrar</span>
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-theme-provider root>
      <v-main>
        <v-container fluid style="min-height: 110vh">
          <v-scroll-x-transition mode="out-in">
            <router-view />
          </v-scroll-x-transition>
        </v-container>
      </v-main>
    </v-theme-provider>

    <v-footer>
      <v-col class="text-center" cols="12">
        <p>{{ new Date().getFullYear() }} — <strong>Vue Movie</strong></p>
        <p>
          Desenvolvido com ❤️ por
          <a
            href="https://linkedin.com/in/lucas-hayashi-dev"
            target="_blank"
            class="text-decoration-none primary--text"
          >
            Lucas Hayashi
          </a>
        </p>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppSearch from "@/components/home/AppSearch.vue";

export default {
  name: "App",
  computed: {
    ...mapGetters(["isAuthenticated", "username"]),
  },
  components: {
    AppSearch,
  },
  data() {
    return {
      drawer: false,
      group: null,
      selectedItem: null,
      items: [
        {
          id: 1,
          title: "Início",
          icon: "mdi-home",
          route: "home",
          auth: false,
        },
        {
          id: 2,
          title: "Minhas listas",
          icon: "mdi-movie-star",
          route: "user",
          auth: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions(["logout"]),
    goHome() {
      window.localStorage.removeItem("page");
      if (this.$router.currentRoute.name !== "home") {
        this.$router.push({ name: "home" });
      }
    },
    darkMode() {
      window.localStorage.setItem("dark", this.$vuetify.theme.dark);
    },
  },
  created() {
    this.$vuetify.theme.dark = JSON.parse(window.localStorage.getItem("dark"));
  },
};
</script>

<style scoped>
.d-flex {
  cursor: pointer;
}
</style>
