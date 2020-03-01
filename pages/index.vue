<template>
  <div class="container">
    <div class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <Logo class="block"></Logo>
        <a
          class="bg-green-spotify text-white font-bold mt-6 px-8 py-2 rounded-full inline-block"
          href="http://localhost:8000/login"
        >Iniciar sesión</a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style>
</style>
