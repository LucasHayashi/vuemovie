<template>
  <v-container>
    <div v-if="loading" class="text-center">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-else-if="tv">
      <v-row cols="12">
        <v-col cols="12" sm="12" md="4" lg="4" xl="4">
          <v-img
            :lazy-src="createAsset(tv.poster_path, 'w92')"
            height="500"
            :src="createAsset(tv.poster_path, 'w342')"
            contain
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8" xl="8">
          <h1>{{ tv.name }}</h1>
          <h2 class="grey--text">{{ tv.original_name }}</h2>
          <div class="d-flex mb-2">
            <v-rating
              :value="normalizedRating(tv.vote_average)"
              length="10"
              color="amber"
              dense
              half-increments
              readonly
              size="20"
            ></v-rating>
            <div class="grey--text ms-4 align-end">
              {{ normalizedRating(tv.vote_average) }} ({{ tv.vote_count }})
            </div>
          </div>
          <v-chip-group>
            <v-chip label small class="mr-2 mb-2">
              {{ getYear(tv.first_air_date) }}
            </v-chip>

            <v-chip label small class="mr-2 mb-2">
              {{ getProductionCountries(tv.production_countries) }}
            </v-chip>

            <v-chip label small class="mr-2 mb-2">
              {{ tv.number_of_seasons }} Temporadas
            </v-chip>

            <v-chip label small class="mr-2 mb-2">
              {{ tv.number_of_episodes }} Episódios
            </v-chip>

            <v-chip
              v-for="genre in tv.genres"
              :key="genre.id"
              label
              small
              class="mr-2 mb-2"
            >
              {{ genre.name }}
            </v-chip>
          </v-chip-group>

          <template v-if="isAuthenticated">
            <AppActions :media="tv" media_type="tv" />
          </template>
          <template v-else>
            <v-spacer></v-spacer>
          </template>

          <h2>Sinopse</h2>
          <p>{{ tv.overview }}</p>
        </v-col>
        <v-col cols="12" v-if="tv.credits.cast.length">
          <h2 class="text-center">Elenco Principal</h2>
          <AppCredits :credits="tv.credits.cast" />
        </v-col>
        <v-col cols="12" v-if="tv.seasons.length">
          <h2 class="text-center">Temporadas</h2>
          <AppSeasons :seasons="tv.seasons" />
        </v-col>
        <template v-if="tv.recommendations.length">
          <v-col cols="12">
            <h2 class="text-center">Recomendações</h2>
            <AppCombinedCredits :combinedCredits="tv.recommendations" />
          </v-col>
        </template>
      </v-row>
    </div>

    <template v-if="error.show">
      <v-row cols="12" justify="center">
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
import AppSeasons from "@/components/home/AppSeasons.vue";
import AppCombinedCredits from "@/components/home/AppCombinedCredits.vue";
import AppActions from "../AppActions.vue";

export default {
  name: "AppTv",
  mixins: [util],
  components: {
    AppCredits,
    AppSeasons,
    AppCombinedCredits,
    AppActions,
  },
  props: {
    serie_id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      tv: null,
      loading: true,
      error: {
        show: false,
        message: null,
      },
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  created() {
    this.getTv();
  },
  watch: {
    serie_id() {
      this.tv = null;
      this.loading = true;
      this.getTv();
    },
  },
  methods: {
    async getTv() {
      this.error.show = false;
      this.tv = null;
      this.loading = true;
      try {
        const response = await http.get(`/tv/${this.serie_id}`);
        this.tv = response.data;
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
