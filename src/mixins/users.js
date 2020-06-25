import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      loginLoading: false,
      passwordResetLoading: false,
    };
  },
  computed: {
    ...mapGetters(['usersUrl', 'passwordResetRequestUrl', 'passwordResetConfirmationUrl']),
    ...mapState([
      'serverUrl',
      'authTokenKey',
      'refreshTokenKey',
      'loginAfterRouteName',
      'passwordResetRequestAfterRouteName',
      'passwordResetConfirmationAfterRouteName',
    ]),
  },
  methods: {
    getCurrentUser() {
      return this.$http.get(`${this.usersUrl}/my_profile`).then(({ data }) => data);
    },
    list() {
      return this.$http.get(`${this.usersUrl}/`);
    },
    login(credentials) {
      return this.$http.post(`${this.serverUrl}token/`, credentials).then(({ data }) => {
        localStorage.setItem(this.authTokenKey, data.access);
        localStorage.setItem(this.refreshTokenKey, data.refresh);
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
    requestPasswordReset({ email }) {
      this.passwordResetLoading = true;
      return this.$http.post(this.passwordResetRequestUrl, { email }).then(({ data }) => {
        this.passwordResetRequestSuccessAlert();
        this.$router.push({ name: this.passwordResetRequestAfterRouteName });
        return data;
      }).catch((error) => {
        this.passwordResetLoading = false;
        this.passwordResetRequestErrorAlert();
        console.error(error);
      });
    },
    resetPassword({ token, password }) {
      this.passwordResetLoading = true;
      const body = { token, password };
      return this.$http.post(this.passwordResetConfirmationUrl, body).then(({ data }) => {
        this.passwordResetSuccessAlert();
        this.$router.push({ name: this.passwordResetConfirmationAfterRouteName });
        return data;
      }).catch((error) => {
        this.passwordResetLoading = false;
        this.passwordResetErrorAlert();
        console.error(error);
      });
    },
  },
};
