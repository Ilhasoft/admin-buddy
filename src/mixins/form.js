export default {
  data() {
    return {
      resourceUrl: undefined,
      data: {},
      id: undefined,
      loading: false,
    };
  },
  computed: {
    getUrl() {
      return `${this.resourceUrl}/${this.id}`;
    },
    postUrl() {
      return `${this.resourceUrl}`;
    },
    putUrl() {
      return `${this.resourceUrl}/${this.id}`;
    },
  },
  methods: {
    initData() {
      if (this.resourceUrl && this.id) {
        this.fetchData();
      }
    },
    save(data) {
      this.data = data;
      if (!this.resourceUrl) {
        return;
      }
      if (this.id === undefined || this.id === null) {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    fetchData() {
      this.loading = true;
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
      this.loading = false;
    },
    fetchError(error) {
      this.data = {};
      console.error(error);
      this.loading = false;
      this.alertFetchError();
    },
    saveSuccess({ data }) {
      this.data = data;
      this.loading = false;
      this.alertSaveSuccess();
      this.$router.replace({ params: { id: data.id } });
    },
    saveError(error) {
      console.error(error);
      this.loading = false;
      this.alertSaveError();
    },
    updateId() {
      const id = +this.$route.params.id;
      this.id = undefined;
      this.data = {};
      if (!Number.isNaN(id)) {
        this.id = id;
        this.initData();
      }
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
  },
  mounted() {
    this.updateId();
  },
};
