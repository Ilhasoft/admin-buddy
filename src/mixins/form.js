export default {
  data() {
    return {
      resourceUrl: undefined,
      data: {},
      id: undefined,
      loading: false,
      fetchLoading: false,
      withoutId: false,
      getId: (data) => data.id,
    };
  },
  computed: {
    getUrl() {
      return this.withoutId ? `${this.resourceUrl}` : `${this.resourceUrl}/${this.id}`;
    },
    postUrl() {
      return `${this.resourceUrl}`;
    },
    putUrl() {
      return this.getUrl;
    },
  },
  methods: {
    initData() {
      if (this.resourceUrl && (this.id || this.withoutId)) {
        this.fetchData();
      }
    },
    save(data) {
      this.data = data;
      if (!this.resourceUrl) {
        return;
      }
      if ((this.id === undefined || this.id === null) && !this.withoutId) {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    fetchData() {
      this.fetchLoading = true;
      this.$http.get(this.getUrl)
        .then(this.fetchSuccess.bind(this))
        .catch(this.fetchError.bind(this));
    },
    saveData() {
      this.loading = true;
      this.$http.post(this.postUrl, this.data)
        .then(this.saveSuccess.bind(this))
        .catch(this.saveError.bind(this));
    },
    updateData() {
      this.loading = true;
      this.$http.put(this.putUrl, this.data)
        .then(this.saveSuccess.bind(this))
        .catch(this.saveError.bind(this));
    },
    fetchSuccess({ data }) {
      this.data = data;
      this.fetchLoading = false;
    },
    fetchError(error) {
      this.data = {};
      console.error(error);
      this.fetchLoading = false;
      this.alertFetchError();
    },
    saveSuccess({ data }) {
      this.data = data;
      this.loading = false;
      this.alertSaveSuccess();
      this.$router.replace({ params: { id: this.getId(data) } });
    },
    saveError(error) {
      this.loading = false;
      const data = ((error.response || {}).data || {});
      this.alertSaveError(data.detail || data.message);
    },
    updateId() {
      const { id } = this.$route.params;
      if (id === 'new' || id === 'novo') {
        return;
      }
      this.id = id;
      this.data = {};
      this.initData();
      if (this.updatedId) {
        this.updatedId();
      }
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.id'() {
      this.updateId();
    },
    resourceUrl() {
      this.initData();
    },
  },
  mounted() {
    this.updateId();
  },
};
