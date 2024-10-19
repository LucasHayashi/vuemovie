<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h2>Faça o login na sua conta do The Movie Database (TMDB)</h2>
      </v-col>
      <v-col cols="12">
        <p>
          Após o login você poderá favoritar e visualizar seus filmes, séries e
          atores favoritos.
        </p>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" large @click="login">
          <v-icon>mdi-login</v-icon>
          Login
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import http from "@/services/http";
export default {
  name: "AppAuth",
  methods: {
    async login() {
      const res = await http.get("/auth/start");
      const AuthUrl = res.data.auth_url;
      window.location.href = AuthUrl;
    },
  },
};
</script>

<style></style>
