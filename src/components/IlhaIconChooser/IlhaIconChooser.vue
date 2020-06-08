<template>
  <section class="ilha-icon-chooser">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
      </header>
      <div class="m-1">
        <b-field label="Icon name">
          <b-input
            v-model="query"
            placeholder="Icon name"
            expanded></b-input>
        </b-field>
        <div class="" style="min-height: 500px; max-height: 500px">
          sdsd
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
    flatIconApiKey: {
      type: String,
      default: process.env.VUE_APP_FLAT_ICON_API_KEY,
    },
  },
  data() {
    return {
      query: '',
      token: '',
    };
  },
  computed: {
  },
  methods: {
    loginFlatIcon() {
      if (!this.flatIconApiKey) {
        return;
      }
      // eslint-disable-next-line
      this.$http.post('https://api.flaticon.com/v2/app/authentication', { apiKey: this.flatIconApiKey }, httpConfig).then((data) => {
        console.log(data);
      }).catch((err) => {
        console.error(err);
      });
    },
    fetchIcons() {
      const httpConfig = {
        headers: {
          Authorization: 'Bearer 2940176baef285e46736b217b850003418a47b5e',
        },
      };
      this.$http.get('https://api.flaticon.com/v2/search/icons', httpConfig).then((data) => {
        console.log(data);
      }).catch((err) => {
        console.error(err);
      });
    },
  },
  watch: {
    flatIconApiKey() {
      this.loginFlatIcon();
    },
    token() {
      console.log(this.token);
    },
  },
  mounted() {
    this.loginFlatIcon();
  },
};
</script>
