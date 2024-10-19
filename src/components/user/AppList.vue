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
    <v-row>
      <v-col
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        v-for="item in list"
        :key="item.id"
      >
        <v-card height="100%" @click="navigateBy(type, item)">
          <v-img
            height="400"
            :src="createAsset(item.poster_path || item.profile_path, 'w500')"
            class="white--text align-start justify-end"
            :alt="item.title || item.name"
            contain
          >
            <template v-if="item.media_type !== 'person'">
              <v-card-text>
                <v-row class="justify-end">
                  <div class="d-flex flex-column align-center">
                    <v-icon large color="yellow darken-2" tag="div">
                      mdi-star
                    </v-icon>
                    <div class="font-weight-bold">
                      {{ normalizedRating(item.vote_average) }}
                    </div>
                  </div>
                </v-row>
              </v-card-text>
            </template>
            <template v-else>
              <h2 class="pa-2">{{ item.name }}</h2>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
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
      list: null,
      type: "movies",
    };
  },
  watch: {
    type() {
      this.getList();
    },
  },
  methods: {
    async getList() {
      const response = await http.get(`/user/${this.list_name}`, {
        params: { type: this.type },
      });

      this.list = response.data.results;
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style></style>
