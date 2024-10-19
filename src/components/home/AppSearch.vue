<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :filter="customFilter"
    :loading="isLoading"
    :search-input.sync="searchInput"
    @input="nevigateTo"
    color="primary"
    hide-no-data
    hide-selected
    item-text="title"
    item-value="API"
    label="Buscar filmes, séries e atores"
    prepend-inner-icon="mdi-magnify"
    return-object
    outlined
    dense
    clearable
    hide-details
  >
    <template v-slot:item="{ item }">
      <v-list-item-avatar tile height="100" width="92">
        <img
          :src="createAsset(item.poster_path || item.profile_path, 'w92')"
          :alt="item.title"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import debounce from "lodash/debounce";
import http from "@/services/http";
import util from "@/mixins/util";

export default {
  name: "AppSearch",

  mixins: [util],

  data: () => ({
    titleLimit: 60,
    entries: [],
    isLoading: false,
    model: "",
    searchInput: "",
    debouncedSearch: null,
  }),

  created() {
    this.debouncedSearch = debounce(this.fetchResults, 300);
  },

  beforeDestroy() {
    this.debouncedSearch.cancel();
  },

  methods: {
    customFilter(item, queryText) {
      const searchKeys = ["title", "original_title", "name", "original_name"];
      return searchKeys.some((key) => {
        if (!item[key]) return false;
        const text = item[key].toLowerCase();
        return text.indexOf(queryText.toLowerCase()) > -1;
      });
    },
    nevigateTo(item) {
      this.$nextTick(() => {
        this.model = "";
        this.searchInput = "";
      });
      this.navigate(item);
    },
    async fetchResults(search) {
      if (!search) {
        this.entries = [];
        return;
      }

      this.isLoading = true;

      try {
        const res = await http.get(`/search?q=${search}`);
        this.entries = res.data.results;
      } catch (error) {
        this.entries = [];
      } finally {
        this.isLoading = false;
      }
    },
  },

  computed: {
    items() {
      return this.entries.map((entry) => {
        let title = entry.title || entry.name;

        if (entry.title && entry.name) {
          title = `${entry.title} - ${entry.name}`;
        }

        if (title.length > this.titleLimit) {
          title = `${title.slice(0, this.titleLimit)}...`;
        }

        return {
          ...entry,
          title,
        };
      });
    },
  },

  watch: {
    searchInput(newValue) {
      this.debouncedSearch(newValue);
    },
  },
};
</script>
