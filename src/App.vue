<template>
  <div id="app">
    <ilha-header  :creation-route="{}">
      <template v-slot:title>
        Título
      </template>
    </ilha-header>
    <div class="columns is-desktop m-2">
      <div class="column">
        <ilha-summary-box class="has-background-info has-text-white">
          <template v-slot:icon>
            <ilha-icon type="tag-white" class="icon is-large"/>
          </template>
          <template v-slot:period>
            today
          </template>
          <template v-slot:metric>
            Interact with Bot
          </template>
          <template v-slot:amount>
            1231
          </template>
        </ilha-summary-box>
      </div>
      <div class="column">
        <ilha-summary-box class="has-background-warning has-text-white">
          <template v-slot:icon>
            <ilha-icon type="users-white" class="icon is-large"/>
          </template>
          <template v-slot:period>
            today
          </template>
          <template v-slot:metric>
            Interact with Bot
          </template>
          <template v-slot:amount>
            1231
          </template>
        </ilha-summary-box>
      </div>
      <div class="column">
        <ilha-summary-box class="has-background-success has-text-white">
          <template v-slot:icon>
            <ilha-icon type="trend-white" class="icon is-large"/>
          </template>
          <template v-slot:period>
            today
          </template>
          <template v-slot:metric>
            Interact with Bot
          </template>
          <template v-slot:amount>
            1231
          </template>
        </ilha-summary-box>
      </div>
      <div class="column">
        <ilha-summary-box class="has-background-danger has-text-white">
          <template v-slot:icon>
            <ilha-icon type="tag-white" class="icon is-large"/>
          </template>
          <template v-slot:period>
            today
          </template>
          <template v-slot:metric>
            Interact with Bot
          </template>
          <template v-slot:amount>
            1231
          </template>
        </ilha-summary-box>
      </div>
    </div>
    <div class="columns m-2">
      <div class="column is-half">
        <ilha-chart-summary-box
          :chart-data="chartData"
          class="has-background-white">
          <template v-slot:title>
            Message Metrics
          </template>
        </ilha-chart-summary-box>
      </div>
      <div class="column is-half">
        <ilha-chart-summary-box
          :chart-data="chartData"
          class="has-background-white">
          <template v-slot:title>
            New Reports Registered
          </template>
        </ilha-chart-summary-box>
      </div>
    </div>
    <ilha-form :fields="fields"></ilha-form>
    aqui
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      chartData: [
        {
          label: 'Visitors',
          value: 90,
          backgroundColor: '#2FA2F4',
        },
        {
          label: 'Users',
          value: 10,
          backgroundColor: '#F8C239',
        },
      ],
      fields: [
        {
          property: 'cpf',
          type: 'masked',
          label: 'CPF',
          placeholder: 'CPF',
          autocomplete: 'off',
          mask: {
            delimiters: ['.', '.', '-'],
            blocks: [3, 3, 3, 2],
            numericOnly: true,
          },
          rules: 'required',
        },
      ],
    };
  },
};

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
@import "assets/styles/summary-box";

html {
  background-color: $light;
}

</style>
