<template>
  <section class="ilha-icon-chooser">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
      </header>
      <div>
        <div class="columns  p-1 p-b-0">
          <b-field
            class="column is-10">
            <b-input
              v-model="query"
              @keyup.native.enter="fetchIcons()"
              :placeholder="searchInputPlaceholder"
              expanded></b-input>
          </b-field>
          <b-field
            class="column">
            <b-upload
              accept="image/svg"
              @input="selectFile($event)"
              class="file-label"
            >
          <span class="file-cta">
            <b-icon class="file-icon" icon="upload"></b-icon>
          </span>
            </b-upload>
          </b-field>
        </div>
        <div class="ilha-icon-chooser__body p-1" style="">
          <b-loading
            :active="loading"
            :is-full-page="false">
          </b-loading>
          <div>
            <div class="ilha-icon-chooser__body__icon p-1 m-1" v-for="icon in icons" :key="icon.id">
              <img :src="icon.images.png['128']" @click="selectIcon(icon)"/>
            </div>
          </div>
          <div
            v-if="!loading && icons.length == 0"
            class="has-text-centered">
            {{ emptyMessage }}
          </div>
          <b-button v-if="!loading && hasNextPage" class="is-primary" @click="fetchIcons(nextPage)">
            {{ loadingButtonLabel }}
          </b-button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

export default {
  name: 'ilha-icon-choser',
  props: {
    title: {
      type: String,
      default: 'Choose a icon',
    },
    searchInputLabel: {
      type: String,
      default: 'Icon name',
    },
    searchInputPlaceholder: {
      type: String,
      default: 'Search...',
    },
    loadingButtonLabel: {
      type: String,
      default: 'Load more icons...',
    },
    emptyMessage: {
      type: String,
      default: 'Not found',
    },
    flatIconsUrl: {
      type: String,
      default: 'http://localhost:8000/flaticon/items/icons',
    },
  },
  data() {
    return {
      query: '',
      loading: true,
      icons: [],
      nextPage: 1,
      totalIconsLength: 100000000000,
    };
  },
  computed: {
    hasNextPage() {
      return this.totalIconsLength > this.icons.length;
    },
  },
  methods: {
    fetchIcons(page = 1) {
      if (page > 1 && !this.hasNextPage) {
        return;
      }
      if (page === 1) {
        this.icons = [];
      }
      this.loading = true;
      const params = [
        `page=${page}`,
      ];
      if (this.query) {
        params.push(`q=${this.query}`);
      }
      this.$http.get(`${this.flatIconsUrl}/?${params.join('&')}`).then(({ data }) => {
        this.nextPage = data.metadata.page + 1;
        this.totalIconsLength = data.metadata.total;
        if (this.nextPage === 2) {
          this.icons = data.data;
        } else {
          this.icons = this.icons.concat(data.data);
        }
        this.loading = false;
      }).catch((err) => {
        console.error(err);
        this.loading = false;
      });
    },
    selectIcon(icon) {
      this.$emit('onSelect', icon);
      this.$parent.close();
    },
    selectFile(file) {
      this.$emit('onFileSelect', file);
      this.$parent.close();
    },
  },
  watch: {
    flatIconsUrl() {
      this.fetchIcons(1);
    },
  },
  mounted() {
    this.fetchIcons(1);
  },
};
</script>
