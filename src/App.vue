<template>
  <div id="app">
    <ilha-header  :creation-route="{}">
      <template v-slot:title>
        Título
      </template>
    </ilha-header>
    <ilha-table></ilha-table>
    aqui
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
@import "assets/styles/variables";


// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "twitter": ($twitter, $twitter-inverter),
  "text": ($text, $text-invert),
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
@import "assets/styles/header";
@import "assets/styles/table";
@import "assets/styles/icon";
@import "assets/styles/login";
@import "assets/styles/form";
@import "assets/styles/sidebar";
@import "assets/styles/common";

html {
  background-color: $light;
}

</style>
