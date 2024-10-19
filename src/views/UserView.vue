<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-tabs icons-and-text v-model="tabs">
          <v-tab href="#watchlist"
            >Watchlist

            <v-icon>mdi-movie-plus</v-icon>
          </v-tab>
          <v-tab href="#favoritos"
            >Favoritos

            <v-icon>mdi-star-plus</v-icon>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs-items v-model="tabs">
          <v-tab-item value="watchlist">
            <AppList list_name="watchlist" />
          </v-tab-item>
          <v-tab-item value="favoritos">
            <AppList list_name="favorite" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AppList from "@/components/user/AppList.vue";

export default {
  name: "User",
  components: {
    AppList,
  },
  data() {
    return {
      tabs: null,
    };
  },
};
</script>
