<template>
  <div class="container p-16">
    <div class="text-center text-white">
      <h1 class="text-4xl">Now Playing</h1>
      <p class="text-xl">Mr. Brightside - The Killers</p>
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
      nowPlaying: false
    };
  },
  components: {
    Logo
  },
  methods: {
    getCurrentPlaying() {
      const userToken = this.$store.getters.token;
      songstatsSdk.getCurrentPlaying(userToken).then(function(response) {
        console.log(response);
      });
    }
  },
  mounted() {
    this.getCurrentPlaying();
  }
};
</script>

<style>
</style>
