export default {
  methods: {
    createAsset(file_path, file_size = "original") {
      if (!file_path) {
        return require(`../assets/img/no_picture.jpg`);
      }
      return `${process.env.VUE_APP_API_ASSETS}/${file_size}${file_path}`;
    },
    getYear(strDate) {
      return new Date(strDate).getFullYear();
    },
    getProductionCountries(productionCountries) {
      return productionCountries.map((pc) => pc.iso_3166_1).join(",");
    },
    normalizedRating(voteAverage) {
      return Math.round(voteAverage * 10) / 10;
    },
    formatDate(dateStr) {
      if (!dateStr) return "Sem data";
      return new Date(dateStr).toLocaleDateString("pt-br");
    },
    formatTotalPages(totalPages) {
      return totalPages === 1000 ? 500 : totalPages;
    },
    createProfileAsset(profile_path, file_size, gender) {
      if (profile_path) {
        return this.createAsset(profile_path, file_size);
      } else {
        /* Gêneros Disponíveis
          0 - Not set / not specified
          1 - Female
          2	- Male
          3	- Non-binary */

        if (gender == 1) {
          return require(`../assets/img/female.jpg`);
        } else if (gender == 2) {
          return require(`../assets/img/male.jpg`);
        } else {
          return require(`../assets/img/not_specified.jpg`);
        }
      }
    },
    navigateBy(media_type, item) {
      if (!item || !media_type) return false;
      item.media_type = media_type === "movies" ? "movie" : "tv";
      this.navigate(item);
    },
    navigate(item) {
      if (!item) return false;
      let targetRoute = null;

      if (item.media_type === "movie") {
        targetRoute = {
          name: "movie",
          params: {
            movie_id: item.id,
          },
        };
      } else if (item.media_type === "tv") {
        targetRoute = {
          name: "tv",
          params: {
            serie_id: item.id,
          },
        };
      } else {
        targetRoute = {
          name: "person",
          params: {
            person_id: item.id,
          },
        };
      }

      if (
        JSON.stringify(this.$route.params) !==
        JSON.stringify(targetRoute.params)
      ) {
        this.$router.push(targetRoute);
      }
    },
  },
};
