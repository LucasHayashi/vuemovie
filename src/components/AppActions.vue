<template>
  <v-col cols="12">
    <v-tooltip bottom v-for="action in actions" :key="action.type">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :class="buttonClass(action.type)"
          fab
          dark
          small
          v-bind="attrs"
          v-on="on"
          @click="toggleAction(action.type)"
        >
          <v-icon dark>{{ action.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ tooltipText(action.type) }}</span>
    </v-tooltip>
  </v-col>
</template>

<script>
import http from "@/services/http";

export default {
  name: "AppActions",
  props: {
    media: {
      type: Object,
      required: true,
    },
    media_type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      favorite: false,
      watchlist: false,
      actions: [
        {
          icon: "mdi-star-plus",
          type: "favorite",
        },
        {
          icon: "mdi-movie-plus",
          type: "watchlist",
        },
      ],
    };
  },
  computed: {
    buttonClass() {
      return (type) => [
        { "yellow darken-2": type === "favorite" && this.favorite },
        { "blue darken-2": type === "watchlist" && this.watchlist },
        "mx-2",
      ];
    },
  },
  methods: {
    async toggleAction(type) {
      this[type] = !this[type];

      const config = {
        media_type: this.media_type,
        media_id: this.media.id,
        type,
        [type]: this[type],
      };

      await http.post("/user/add_to", config);
    },
    tooltipText(type) {
      return type === "favorite"
        ? this.favorite
          ? "Remover dos Favoritos"
          : "Adicionar aos Favoritos"
        : this.watchlist
        ? "Remover da Watchlist"
        : "Adicionar na Watchlist";
    },
  },
  created() {
    if (this.media.account_states) {
      this.favorite = this.media.account_states.favorite;
      this.watchlist = this.media.account_states.watchlist;
    }
  },
};
</script>
