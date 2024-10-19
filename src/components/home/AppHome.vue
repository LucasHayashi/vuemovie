<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-slide-x-transition mode="out-in">
          <h1 :key="selectedTrending">{{ selectedTrending }} em Tendência</h1>
        </v-slide-x-transition>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-radio-group v-model="trendingType" row @change="resetPage">
          <v-radio
            v-for="(radio, index) in trendingTypeItems"
            :label="radio.text"
            :value="radio.value"
            :key="'radio_' + index"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <AppTrending :timeWindow="timeWindow" :trendingType="trendingType" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppTrending from "@/components/home/AppTrending.vue";

export default {
  name: "AppHome",
  components: {
    AppTrending,
  },
  computed: {
    selectedTrending() {
      return this.trendingTypeItems.find((v) => v.value === this.trendingType)
        .text;
    },
  },
  data() {
    return {
      tab: null,
      trendingType: "movie",
      timeWindow: "week",
      trendingTypeItems: [
        { text: "Filmes", value: "movie" },
        { text: "Séries", value: "tv" },
      ],
    };
  },
  methods: {
    resetPage() {
      window.localStorage.removeItem("page");
    },
  },
};
</script>
