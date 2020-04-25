<template>
  <div class="container">
    <div class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <Logo class="block"></Logo>
        <a
          class="bg-green-spotify text-white font-bold mt-6 px-8 py-2 rounded-full inline-block cursor-pointer"
          :class="this.isLoading ? 'spinner' : ''"
          href="http://localhost:8000/login"
        >Login</a>
        <h2 class="text-red-500 mt-2" v-if="this.loginError">There was an error, please try again</h2>
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
      isLoading: false
    };
  },
  components: {
    Logo
  },
  methods: {
    login: function(code) {
      this.isLoading = true;
      songstatsSdk
        .login(code)
        .then(response => {
          this.loginError = false;
          this.isLoading = false;
          this.$store.commit("updateAuthToken", response.data);
          this.$router.push("now");
        })
        .catch(error => {
          this.loginError = true;
          this.isLoading = false;
        });
    }
  },
  mounted() {
    const spotifyCode = this.$router.currentRoute.query.code;
    if (spotifyCode) {
      this.login(spotifyCode);
    }
  }
};
</script>

<style>
</style>
