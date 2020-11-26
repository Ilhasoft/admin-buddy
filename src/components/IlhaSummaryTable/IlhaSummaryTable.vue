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
    :edit-route-name="editRouteName"
    :can-edit="canEdit"
    :can-delete="canDelete"
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
    defaultSortField: {
      type: String,
      default: 'id',
    },
    defaultIgnoreSortParams: {
      type: Boolean,
      default: false,
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
    editRouteNameProp: {
      type: String,
      default: '',
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    initEditRouteName() {
      if (this.editRouteNameProp) {
        this.editRouteName = this.editRouteNameProp;
      }
    },
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
    initDefaultSorterOrder() {
      if (this.defaultSortField) {
        this.sortField = this.defaultSortField;
      }
    },
    initDefaultIgnoreSortParams() {
      this.ignoreSortParams = this.defaultIgnoreSortParams;
    },
  },
  watch: {
    url() {
      this.resourceUrl = this.url;
    },
    editRouteNameProp() {
      this.initEditRouteName();
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
    defaultSortField() {
      this.initDefaultSorterOrder();
    },
    defaultIgnoreSortParams() {
      this.initDefaultIgnoreSortParams();
    },
  },
  mounted() {
    this.resourceUrl = this.url;
    this.initEditRouteName();
    this.initFormatDataFunc();
    this.initFormatResultFunc();
    this.initAdditionalQueryParams();
    this.initDefaultSorterOrder();
    this.initDefaultIgnoreSortParams();
  },
};
</script>

<style scoped lang="scss">
</style>
