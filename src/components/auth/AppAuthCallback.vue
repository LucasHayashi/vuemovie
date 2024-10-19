<template>
  <v-container>
    <div v-if="loading" class="text-center"></div>

    <template v-if="loading">
      <v-row cols="12" justify="center">
        <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
          class="center"
        ></v-progress-circular>
      </v-row>
      <v-row cols="12" justify="center">
        <v-col cols="12">
          <h2>Autenticando...</h2>
        </v-col>
      </v-row>
    </template>

    <template v-if="error.show">
      <v-row cols="12" justify="center">
        <v-alert type="error"
          >{{ error.message }} Redirecionando para a tela de login em
          {{ redirectTime }} segundos</v-alert
        >
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AppAuthCallback",
  data() {
    return {
      loading: true,
      error: {
        show: false,
        message: null,
      },
      redirectTime: 5,
    };
  },
  computed: {
    ...mapState(["isAutenticated"]),
  },
  methods: {
    ...mapActions(["login"]),
    async autenticar() {
      if (this.isAutenticated) {
        this.$router.push({ name: "home" });
        return;
      }

      try {
        const requestToken = this.$route.query.request_token;

        await this.$store.dispatch("login", requestToken);
      } catch (error) {
        this.error.show = true;
        this.error.message = error.message;

        setTimeout(() => {
          this.$router.push({ name: "auth" });
        }, this.redirectTime * 1000);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.autenticar();
  },
};
</script>

<style></style>
