<template>
  <ilha-table
    :header="header"
    :loading="loading"
    :data="data"
    :current-page="currentPage"
    :total-rows="totalRows"
    :sort-field="sortField"
    :sort-order="sortOrder"
    :default-sorter-order="defaultSortOrder"
    @onPageChange="changePage"
    @onSort="sort"
    @onDelete="requestDelete"
    class="ilha-summary-table"
  ></ilha-table>
</template>

<script>

import {
  tableMixin,
  toastsMixin,
  usersMixin,
} from '../../mixins';

export default {
  name: 'ilha-summary-table',
  mixins: [
    toastsMixin,
    tableMixin,
    usersMixin,
  ],
  props: {
    url: {
      type: String,
    },
    header: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    url() {
      this.resourceUrl = this.url;
    },
  },
  mounted() {
    this.resourceUrl = this.url;
  },
};
</script>

<style scoped lang="scss">
</style>
