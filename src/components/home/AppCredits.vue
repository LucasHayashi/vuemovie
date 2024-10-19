<template>
  <v-container>
    <v-row justify="center">
      <v-slide-group show-arrows>
        <v-slide-item v-for="credit in credits" :key="credit.credit_id">
          <v-card
            class="ma-4"
            @click="navigateToPerson(credit)"
            elevation="2"
            outlined
            width="185"
            centered
          >
            <v-img
              width="100%"
              height="250"
              :src="
                createProfileAsset(credit.profile_path, 'w185', credit.gender)
              "
            >
            </v-img>
            <v-card-title>{{ credit.name }}</v-card-title>
            <v-card-text>
              {{ credit.character }}
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
  name: "AppCredits",
  mixins: [util],
  props: ["credits"],
  data() {
    return {
      movieCredits: null,
      loading: true,
      error: {
        show: false,
        message: null,
      },
    };
  },
  methods: {
    navigateToPerson(person) {
      this.$router.push({
        name: "person",
        params: {
          person_id: person.id,
        },
      });
    },
  },
};
</script>

<style></style>
