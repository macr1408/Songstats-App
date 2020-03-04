<template>
  <div class="container">
    <div class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <Logo class="block"></Logo>
        <a
          class="bg-green-spotify text-white font-bold mt-6 px-8 py-2 rounded-full inline-block"
          :class="this.isLoading ? 'spinner' : ''"
          href="http://localhost:8000/login"
        >Iniciar sesión</a>
        <h2
          class="text-red-500 mt-2"
          v-if="this.loginError"
        >Hubo un error, por favor intenta nuevamente</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
const axios = require("axios");

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
      axios
        .post("http://localhost:8000/api/v1/auth", { code })
        .then(response => {
          this.loginError = false;
          this.isLoading = false;
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
