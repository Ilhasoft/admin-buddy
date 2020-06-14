import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      loginLoading: false,
    };
  },
  computed: {
    ...mapGetters(['usersUrl']),
    ...mapState(['loginAfterRouteName']),
  },
  methods: {
    getCurrentUser() {
      return this.$http.get(`${this.usersUrl}/my_profile`).then(({ data }) => data);
    },
    list() {
      return this.$http.get(`${this.usersUrl}/`);
    },
    login(credentials) {
      return this.$http.post(`${this.$store.state.serverUrl}token/`, credentials).then(({ data }) => {
        localStorage.setItem(this.$store.state.authTokenKey, data.access);
        localStorage.setItem(this.$store.state.refreshTokenKey, data.refresh);
        return data;
      });
    },
    tryLogin({ username, password }) {
      this.loginLoading = true;
      this.login({ username, password }).then(() => {
        this.successLoginAlert();
        this.$router.push({ name: this.loginAfterRouteName });
      }).catch((error) => {
        this.loginLoading = false;
        this.errorLoginAlert();
        console.error(error);
      });
    },
  },
};
