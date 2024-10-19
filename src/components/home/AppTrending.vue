<template>
  <v-container>
    <div v-if="loading" class="text-center">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-row>
        <v-col
          cols="6"
          sm="4"
          md="4"
          lg="3"
          xl="2"
          v-for="item in trendingItems"
          :key="item.id"
        >
          <v-card height="100%" @click="navigate(item)">
            <v-img
              width="100%"
              :src="createAsset(item.poster_path, 'w342')"
              class="white--text align-start justify-end"
              :alt="item.title || item.name"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="secondary"
                  ></v-progress-circular>
                </v-row>
              </template>
              <v-card-text>
                <v-row justify="end">
                  <div class="d-flex flex-column align-center">
                    <v-icon small color="yellow darken-2" tag="div">
                      mdi-star
                    </v-icon>
                    <div class="font-weight-bold">
                      {{ normalizedRating(item.vote_average) }}
                    </div>
                  </div>
                </v-row>
              </v-card-text>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-container>
            <v-pagination
              v-model="page"
              class="my-4"
              :length="total_pages"
              :total-visible="total_visible"
              @input="nextPage"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </div>
    <template v-if="error.show">
      <v-row justify="center">
        <v-alert type="error">{{ error.message }}</v-alert>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import http from "@/services/http";
import util from "@/mixins/util";

export default {
  props: ["timeWindow", "trendingType"],
  mixins: [util],
  data() {
    return {
      trendingItems: null,
      loading: true,
      page: 1,
      total_pages: 1,
      total_visible: 7,
      error: {
        show: false,
        message: null,
      },
    };
  },
  methods: {
    updateCurrentPage(page) {
      window.localStorage.setItem("page", page);
    },
    getCurrentPage() {
      return window.localStorage.getItem("page");
    },
    async getTrending(page) {
      page = page ? page : 1;

      this.error.show = false;
      this.trendingItems = null;
      this.loading = true;
      try {
        const response = await http.get(
          `/trending/${this.trendingType}/${this.timeWindow}?page=${page}`
        );
        this.trendingItems = response.data.results;
        this.page = response.data.page;
        this.total_pages = this.formatTotalPages(response.data.total_pages);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error.show = true;
        this.error.message = error.message;
      }
    },
    async nextPage(page) {
      await this.getTrending(page);
      this.updateCurrentPage(page);
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  watch: {
    $props: {
      handler() {
        this.getTrending(this.getCurrentPage());
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style></style>
