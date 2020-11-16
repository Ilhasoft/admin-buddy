export default {
  data() {
    return {
      resourceUrl: undefined,
      editRouteName: undefined,
      data: [],
      currentPage: 1,
      totalRows: 0,
      sortField: 'id',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
      loading: true,
      query: '',
      otherQueryParams: undefined,
      deleteTitle: 'Deleting entity',
      deleteMessage: 'Are you sure you want to <b>delete</b>? This action cannot be undone.',
      deleteConfirmText: 'Delete entity',
      deleteCancelText: 'Cancel',
      formatResult: (data) => data,
      formatData: (data) => data,
    };
  },
  computed: {
    order() {
      return this.sortOrder === 'desc' ? '-' : '';
    },
  },
  methods: {
    initTable() {
      this.currentPage = 1;
      this.totalRows = 0;
      this.loadAsyncData();
    },
    changePage(page) {
      this.currentPage = page;
      this.loadAsyncData();
    },
    sort({ field, order }) {
      this.sortField = field;
      this.sortOrder = order;
      this.loadAsyncData();
    },
    loadAsyncData() {
      if (!this.resourceUrl) {
        return;
      }
      const params = [
        `page=${this.currentPage}`,
        `ordering=${this.order}${this.sortField}`,
      ];

      if (this.otherQueryParams) {
        params.push(this.otherQueryParams);
      }

      if (this.query) {
        params.push(`search=${encodeURIComponent(this.query)}`);
      }

      this.loading = true;
      this.$http.get(`${this.resourceUrl}?${params.join('&')}`)
        .then((result) => this.formatResult(result))
        .then(({ data }) => {
          this.data = this.formatData(data.results);
          this.totalRows = data.count;
          this.loading = false;
        })
        .catch((error) => {
          this.data = [];
          this.totalRows = 0;
          this.loading = false;
          throw error;
        });
    },
    requestDelete(data) {
      this.$buefy.dialog.confirm({
        title: this.deleteTitle,
        message: this.deleteMessage,
        confirmText: this.deleteConfirmText,
        cancelText: this.deleteCancelText,
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteData(data);
        },
      });
    },
    deleteData(data) {
      this.$http.delete(`${this.resourceUrl}/${data.id}`).then(() => {
        this.alertDeleteSuccess();
        this.$router.go();
      }).catch((error) => {
        console.error(error);
        const d = ((error.response || {}).data || {});
        this.alertDeleteError(d.detail || d.message);
      });
    },
  },
  watch: {
    resourceUrl() {
      this.initTable();
    },
    query() {
      if (this.query === undefined) {
        return;
      }
      this.initTable();
    },
    otherQueryParams() {
      this.initTable();
    },
  },
  mounted() {
    this.initTable();
  },
};
