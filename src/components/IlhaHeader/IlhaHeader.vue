<template>
  <section class="manager-panel">
    <div class="manager-panel__query-container p-l-2 p-r-2">
      <b-field class="search-field">
        <b-input
          :value="query"
          @input="$emit('update:query', $event)"
          @keyup.native.enter="$emit('search', $event.target.value)"
          :placeholder="inputSearchPlaceholder"
          type="search"
          icon="magnify"
          icon-clickable
          @icon-click="searchIconClick">
        </b-input>
      </b-field>
      <div class="actions has-text-right p-l-2">
        <b-button
          outlined
          @click="logout()"
          type="is-info"
          class="">
          {{ logoutLabel }}
        </b-button>
      </div>
    </div>
    <div class="m-2 m-t-1 m-b-1 manager-panel__header" v-if="$slots.title || creationRoute">
      <ilha-title v-if="$slots.title">
        <slot name="title"/>
      </ilha-title>
      <div>
        <slot name="otherButton"/>
        <b-button
          v-if="creationRoute"
          :to="creationRoute"
          tag="router-link"
          type="is-info"
          class="btn-add p-1"
        >
          <slot name="creationBtnLabel"/>
          <span v-if="!$slots.creationBtnLabel">
            New
          </span>
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'ilha-header',
  props: {
    creationRoute: {
      type: Object,
    },
    query: {
      type: String,
    },
    inputSearchPlaceholder: {
      type: String,
      default: 'Search...',
    },
    logoutLabel: {
      type: String,
      default: 'Log out',
    },
  },
  methods: {
    searchIconClick() {
    },
    logout() {
      localStorage.clear();
      this.$router.go();
    },
  },
};
</script>
