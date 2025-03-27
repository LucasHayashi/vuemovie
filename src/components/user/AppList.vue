<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn-toggle v-model="type" mandatory color="primary">
          <v-btn value="movies">
            <v-icon left>mdi-movie</v-icon>
            Filmes
          </v-btn>
          <v-btn value="tv">
            <v-icon left>mdi-television</v-icon>
            Series
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <template v-if="loading">
      <v-row justify="center">
        <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
          class="center"
        ></v-progress-circular>
      </v-row>
    </template>
    <template v-else-if="list">
      <v-row>
        <v-col
          cols="6"
          sm="4"
          md="4"
          lg="3"
          xl="2"
          v-for="item in list"
          :key="item.id"
        >
          <v-card height="100%" @click="navigateBy(type, item)">
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
    </template>
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
  name: "AppList",
  mixins: [util],
  props: {
    list_name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      total_pages: 1,
      total_visible: 7,
      list: null,
      loading: true,
      error: {
        show: false,
        message: null,
      },
      type: "movies",
    };
  },
  watch: {
    type() {
      this.updateCurrentPage(1);
      this.getList(this.page);
    },
  },
  methods: {
    async getList(page) {
      this.error.show = false;
      this.loading = true;

      page = page ? page : 1;

      try {
        const response = await http.get(
          `/user/${this.list_name}?page=${page}`,
          {
            params: { type: this.type },
          }
        );

        this.page = response.data.page;
        this.total_pages = this.formatTotalPages(response.data.total_pages);
        this.list = response.data.results;
      } catch (error) {
        this.error.show = true;
        this.error.message = error.message;
      } finally {
        this.loading = false;
      }
    },
    updateCurrentPage(page) {
      this.page = page;
      window.localStorage.setItem("user_page", page);
    },
    getCurrentPage() {
      return window.localStorage.getItem("user_page");
    },
    async nextPage(page) {
      await this.getList(page);
      this.updateCurrentPage(page);
      window.scrollPositions = {};
      window.scroll({
        top: 0,
      });
    },
  },
  created() {
    this.getList(this.getCurrentPage());
  },
};
</script>

<style></style>
