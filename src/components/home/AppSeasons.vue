<template>
  <v-container>
    <v-row cols="12" justify="center" align="center">
      <v-slide-group show-arrows>
        <v-slide-item
          v-for="season in seasons"
          :key="season.season_id"
          outlined
        >
          <v-card class="ma-4" width="185px" elevation="2" outlined centered>
            <v-img
              width="100%"
              height="250"
              :src="createAsset(season.poster_path, 'w185')"
            >
            </v-img>
            <v-card-title>{{ season.name }}</v-card-title>
            <v-card-text>
              <div class="my-4 text-subtitle-1">
                <v-icon small>mdi-calendar</v-icon>
                {{ formatDate(season.air_date) }}
              </div>
              <div class="my-4 text-subtitle-1">
                <v-icon small>mdi-television-classic</v-icon>
                {{ season.episode_count }} Episódios
              </div>
              <div class="my-4 text-subtitle-1">
                <v-icon small
                  >mdi-numeric-{{
                    season.season_number
                  }}-box-multiple-outline</v-icon
                >
                {{ season.season_number }}ª Temporada
              </div>
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
  name: "AppSeasons",
  mixins: [util],
  props: ["seasons"],
};
</script>

<style></style>
