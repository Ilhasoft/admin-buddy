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
    :per-page="perPage"
    :mobile-cards="mobileCards"
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
    formatDataFunc: {
      type: Function,
      default: (data) => data,
    },
    formatResultFunc: {
      type: Function,
      default: (data) => data,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    additionalQueryParams: {
      type: String,
    },
    mobileCards: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    initFormatDataFunc() {
      if (this.formatDataFunc) {
        this.formatData = this.formatDataFunc;
      }
    },
    initFormatResultFunc() {
      if (this.formatResultFunc) {
        this.formatResult = this.formatResultFunc;
      }
    },
    initAdditionalQueryParams() {
      if (this.additionalQueryParams) {
        this.otherQueryParams = this.additionalQueryParams;
      }
    },
  },
  watch: {
    url() {
      this.resourceUrl = this.url;
    },
    formatDataFunc() {
      this.initFormatDataFunc();
    },
    formatResultFunc() {
      this.initFormatResultFunc();
    },
    additionalQueryParams() {
      this.initAdditionalQueryParams();
    },
  },
  mounted() {
    this.resourceUrl = this.url;
    this.initFormatDataFunc();
    this.initFormatResultFunc();
    this.initAdditionalQueryParams();
  },
};
</script>

<style scoped lang="scss">
</style>
