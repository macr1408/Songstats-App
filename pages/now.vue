<template>
  <div class="container p-16 min-h-screen">
    <div class="text-center text-white">
      <h1 class="text-4xl mb-6 italic">Now playing</h1>
      <div v-if="nowPlaying.isPlaying">
        <img :src="albumImg" class="mx-auto w-64 pb-4" />
        <p class="text-2xl">{{ this.nowPlaying.title }}</p>
        <p class="mb-4">{{ this.nowPlaying.artists }}</p>
        <div class="bg-gray-600 mx-auto rounded-md" style="width: 60%">
          <div
            class="bg-green-spotify h-1 rounded-md transition-all duration-500 ease-linear"
            :style="{width: this.nowPlaying.currentPercentage + '%'}"
          ></div>
        </div>
      </div>
      <div v-else>
        <p class="text-4xl text-green-200">Nothing is playing right now</p>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
const axios = require("axios");
const songstatsSdk = require("~/plugins/songstats-sdk");

export default {
  data() {
    return {
      loginError: false,
      nowPlaying: {}
    };
  },
  components: {
    Logo
  },
  methods: {
    getCurrentPlaying() {
      const userToken = this.$store.getters.token;
      songstatsSdk
        .getCurrentPlaying(userToken)
        .then(response => (this.nowPlaying = response.data))
        .catch(error => {
          if (error.response) {
            const response = error.response;
            console.log(response);
            if (
              (response.data.error &&
                response.data.error.message === "The access token expired") ||
              response.data === "Unauthorized."
            ) {
              this.$store.commit("updateAuthToken", "");
              this.$router.push("/");
            }
          }
        });
    }
  },
  computed: {
    albumImg: function() {
      return this.nowPlaying.images[1].url;
    }
  },
  mounted() {
    setInterval(this.getCurrentPlaying, 5000);
  }
};
</script>

<style>
</style>
