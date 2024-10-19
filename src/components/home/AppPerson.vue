<template>
  <v-container>
    <div v-if="loading" class="text-center">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-else-if="person">
      <v-row>
        <v-col cols="12" sm="4" md="3" lg="3" xl="3">
          <v-img
            :lazy-src="
              createProfileAsset(person.profile_path, 'w92', person.gender)
            "
            height="500"
            :src="
              createProfileAsset(person.profile_path, 'h632', person.gender)
            "
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
        <v-col cols="12" sm="8" md="9" lg="9" xl="9">
          <v-row>
            <v-col cols="12">
              <h1>{{ person.name }}</h1>
              <v-chip-group>
                <v-chip label small class="mr-2 mb-2" v-if="person.birthday">
                  {{ personDate }}
                </v-chip>
                <v-chip
                  label
                  small
                  class="mr-2 mb-2"
                  v-if="person.place_of_birth"
                >
                  {{ person.place_of_birth }}
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-col cols="12">
              <div v-if="person.biography">
                <h2>Biografia</h2>
                <p>{{ person.biography }}</p>
              </div>
              <div v-else>
                <p>
                  Não temos uma biografia disponível para este(a) ator/atriz.
                </p>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" v-if="person.combined_credits.cast.length">
          <h2 :class="{ 'text-center': $vuetify.breakpoint.mdAndUp }">
            Atuações
          </h2>
          <AppCombinedCredits :combinedCredits="person.combined_credits.cast" />
        </v-col>
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
import http from "@/services/http";
import util from "@/mixins/util";
import moment from "moment";
import AppCombinedCredits from "@/components/home/AppCombinedCredits.vue";

export default {
  name: "AppPerson",
  components: {
    AppCombinedCredits,
  },
  mixins: [util],
  props: {
    person_id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      person: null,
      loading: true,
      imageLoaded: false,
      error: {
        show: false,
        message: null,
      },
    };
  },
  computed: {
    personDate() {
      if (!this.person) return "";

      const { birthday, deathday } = this.person;
      const birthMoment = moment(birthday);
      let years, formattedBirthday, formattedDeathday;

      if (deathday) {
        const deathMoment = moment(deathday);
        years = deathMoment.diff(birthMoment, "years");
        formattedBirthday = birthMoment.format("MM/YYYY");
        formattedDeathday = deathMoment.format("MM/YYYY");
        return `${formattedBirthday} ~ ${formattedDeathday} - ${years} Anos`;
      } else {
        years = moment().diff(birthMoment, "years");
        formattedBirthday = birthMoment.format("MM/YYYY");
        return `${formattedBirthday} - ${years} Anos`;
      }
    },
  },
  watch: {
    person_id: {
      immediate: true,
      handler: "getPerson",
    },
  },
  methods: {
    async getPerson() {
      this.error.show = false;
      this.loading = true;

      try {
        const response = await http.get(`/person/${this.person_id}`);
        this.person = response.data;
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
