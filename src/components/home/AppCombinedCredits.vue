<template>
  <v-container>
    <v-row justify="center">
      <v-slide-group show-arrows>
        <v-slide-item v-for="credit in combinedCredits" :key="credit.credit_id">
          <v-card
            class="ma-4"
            @click="navigateTo(credit.media_type, credit.id)"
            elevation="2"
            outlined
            width="185"
            centered
          >
            <v-img
              width="100%"
              height="250"
              :src="createAsset(credit.poster_path, 'w185')"
            >
            </v-img>
            <v-card-text>
              {{ credit.title || credit.name }}
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-row>
  </v-container>
</template>

<script>
import util from "@/mixins/util";
export default {
  name: "AppCombinedCredits",
  mixins: [util],
  props: ["combinedCredits"],
  methods: {
    navigateTo(media_type, media_id) {
      const routes = {
        movie: { name: "movie", params: { movie_id: media_id } },
        tv: { name: "tv", params: { serie_id: media_id } },
      };

      const routeConfig = routes[media_type] || routes.movie;
      this.$router.push(routeConfig);
    },
  },
};
</script>

<style></style>
