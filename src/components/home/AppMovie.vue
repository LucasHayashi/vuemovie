<template>
  <v-container>
    <div v-if="loading" class="text-center">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-else-if="movie">
      <v-row>
        <v-col cols="12" sm="12" md="4" lg="4" xl="4">
          <v-img
            :lazy-src="createAsset(movie.poster_path, 'w92')"
            height="500"
            :src="createAsset(movie.poster_path, 'w342')"
            contain
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="secondary"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8" xl="8">
          <h1>{{ movie.title }}</h1>

          <h3 class="grey--text">{{ movie.original_title }}</h3>

          <div class="d-flex mb-2">
            <v-rating
              :value="normalizedRating(movie.vote_average)"
              length="10"
              color="amber"
              dense
              half-increments
              readonly
              size="20"
            ></v-rating>
            <div class="grey--text ms-4 align-end">
              {{ normalizedRating(movie.vote_average) }} ({{
                movie.vote_count
              }})
            </div>
          </div>

          <v-chip-group>
            <v-chip label small class="mr-2 mb-2">
              {{ getYear(movie.release_date) }}
            </v-chip>

            <v-chip label small class="mr-2 mb-2">
              {{ getProductionCountries(movie.production_countries) }}
            </v-chip>

            <v-chip
              v-for="genre in movie.genres"
              :key="genre.id"
              label
              small
              class="mr-2 mb-2"
            >
              {{ genre.name }}
            </v-chip>
          </v-chip-group>

          <template v-if="isAuthenticated">
            <AppActions :media="movie" media_type="movie" />
          </template>
          <template v-else>
            <v-spacer></v-spacer>
          </template>

          <h2>Sinopse</h2>
          <p>{{ movie.overview }}</p>
          <v-divider></v-divider>
          <template v-if="movie.credits.cast.length">
            <h2>Elenco Principal</h2>
            <AppCredits :credits="movie.credits.cast" />
          </template>
        </v-col>
        <template v-if="movie.recommendations.length">
          <v-col cols="12">
            <h2 class="text-center">Recomendações</h2>
            <AppCombinedCredits :combinedCredits="movie.recommendations" />
          </v-col>
        </template>
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
import { mapGetters } from "vuex";
import http from "@/services/http";
import util from "@/mixins/util";
import AppCredits from "@/components/home/AppCredits.vue";
import AppCombinedCredits from "@/components/home/AppCombinedCredits.vue";
import AppActions from "@/components/AppActions.vue";

export default {
  name: "AppMovie",
  mixins: [util],
  components: {
    AppCredits,
    AppCombinedCredits,
    AppActions,
  },
  props: {
    movie_id: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  data() {
    return {
      movie: null,
      loading: true,
      error: {
        show: false,
        message: null,
      },
    };
  },
  created() {
    this.getMovie();
  },
  watch: {
    movie_id() {
      this.movie = null;
      this.loading = true;
      this.getMovie();
    },
  },
  methods: {
    async getMovie() {
      this.error.show = false;
      this.movie = null;
      this.loading = true;
      try {
        const response = await http.get(`/movie/${this.movie_id}`);
        this.movie = response.data;
      } catch (error) {
        this.error.show = true;
        this.error.message = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
