<template>
  <section class="ilha-content-list m-2 m-t-1 m-b-1 p-2">
    <b-table
      :data="innerData"
      :loading="loading"

      :striped="true"
      :narrowed="false"
      :hoverable="true"
      :focusable="false"
      :mobile-cards="mobileCards"

      paginated
      backend-pagination
      :per-page="perPage"
      :current-page="currentPage"
      :total="totalRows"
      @page-change="onPageChange"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"

      backend-sorting
      :default-sort-direction="defaultSortOrder"
      :default-sort="[sortField, sortOrder]"
      @sort="onSort"

      class="table-container">

      <template v-slot="props">

        <b-table-column
          v-for="(field, index) in header"
          :key="index"
          :field="field.property"
          :label="field.label"
          :sortable="field.sortable"
          :centered="field.centered"
          :width="cellWidth">
          <span v-if="!field.img && !field.svg">{{ props.row[field.property] }}</span>
          <img
            v-if="field.img"
            :src="props.row[field.property]"
            class="ilha-content-list__img"/>
          <span
            v-if="field.svg"
            v-html="props.row[field.property]"
            class="ilha-content-list__svg"/>
        </b-table-column>

        <b-table-column v-if="hasCustomActions" label="" centered>
          <span class="ilha-content-list__actions">
            <router-link
              v-for="(action, i) in customActions"
              :key="i"
              :to="{ name: action.routeName, params: {id: props.row[idField]}}">
              <ilha-icon
                v-if="action.icon"
                :type="action.icon"
                class="icon is-medium"/>
              <span
                v-if="action.label && !action.icon">
                {{ action.label }}
              </span>
            </router-link>
          </span>
        </b-table-column>

        <b-table-column v-if="hasActions" label="" centered>
          <span class="ilha-content-list__actions">
            <router-link
              v-if="canEdit"
              :to="{ name: editRouteName, params: {id: props.row[idField]}}">
              <ilha-icon type="edit" class="icon is-medium"/>
            </router-link>
            <ilha-icon
              v-if="canDelete"
              @click.native="requestDelete(props.row)"
              type="trash"
              class="icon is-medium"/>
          </span>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="emoticon-sad"
                size="is-large">
              </b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>

export default {
  name: 'ilha-table',
  props: {
    editRouteName: {
      type: String,
      default: '',
    },
    header: {
      type: Array,
      default: () => [],
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
    },
    customActions: {
      type: Array,
      default: () => [],
    },
    perPage: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    totalRows: {
      type: Number,
      default: 0,
    },
    sortField: {
      type: String,
      default: 'id',
    },
    sortOrder: {
      type: String,
      default: 'desc',
    },
    defaultSortOrder: {
      type: String,
      default: 'desc',
    },
    idField: {
      type: String,
      default: 'id',
    },
    mobileCards: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      innerData: [],
    };
  },
  computed: {
    hasActions() {
      return this.canEdit || this.canDelete;
    },
    hasCustomActions() {
      return this.customActions && this.customActions.length > 0;
    },
    cellWidth() {
      if (!this.header || this.header.length === 0) {
        return undefined;
      }
      const headerLength = this.header.length + (this.hasActions ? 1 : 0)
        + (this.hasCustomActions ? 1 : 0);
      return `${(1 / (headerLength)) * 100}%`;
    },
  },
  methods: {
    initTable() {
      this.innerData = this.data;
    },
    onPageChange(page) {
      this.$emit('onPageChange', page);
    },
    onSort(field, order) {
      this.$emit('onSort', { field, order });
    },
    requestDelete(data) {
      this.$emit('onDelete', data);
    },
  },
  watch: {
    data() {
      this.initTable();
    },
  },
  mounted() {
    this.initTable();
  },
};
</script>
