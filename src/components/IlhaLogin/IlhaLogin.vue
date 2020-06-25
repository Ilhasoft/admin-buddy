<template>
  <section class="ilha-login">
    <div class="container">
      <div class="columns section">
        <div class="column is-half ilha-login__form">
          <div class="box">
            <h3 class="subtitle">{{ subtitle }}</h3>
            <ilha-form
              :loading="loading"
              :fields="fields"
              :btnSaveText="loginButtonLabel"
              @onSaveRequest="tryLogin">
            </ilha-form>
            <div class="has-text-centered">
              <router-link :to="passwordResetRoute" class="has-text-danger">
                {{ passwordResetPageLabel }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="column notification is-info box ilha-login__logo-container">
          <img :src="appLogo">
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'ilha-login',
  props: {
    appLogo: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: 'Login to Admin Management',
    },
    usernameLabel: {
      type: String,
      default: 'User',
    },
    usernamePlaceholder: {
      type: String,
      default: 'Enter a username or email',
    },
    passwordLabel: {
      type: String,
      default: 'Password',
    },
    passwordPlaceholder: {
      type: String,
      default: 'Enter your password',
    },
    loginButtonLabel: {
      type: String,
      default: 'Login',
    },
    passwordResetPageLabel: {
      type: String,
      default: 'Forgot your password?',
    },
    passwordResetRoute: {
      type: Object,
      default: () => ({ name: 'PasswordReset' }),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      username: undefined,
      password: undefined,
      htmlHeightLast: undefined,
    };
  },
  computed: {
    fields() {
      return [
        {
          property: 'username',
          type: 'text',
          label: this.usernameLabel,
          placeholder: this.usernamePlaceholder,
          rules: 'required',
        },
        {
          property: 'password',
          type: 'password',
          label: this.passwordLabel,
          placeholder: this.passwordPlaceholder,
          rules: 'required',
        },
      ];
    },
  },
  methods: {
    tryLogin(data) {
      this.$emit('onLogin', { username: data.username, password: data.password });
    },
    updateViewStyle(mounted) {
      const { body } = document;
      const html = body.parentNode;

      if (mounted) {
        body.classList.add('public-container');
        this.htmlHeightLast = html.style.height;
        html.style.height = '100%';
      } else {
        body.classList.remove('public-container');
        html.style.height = this.htmlHeightLast;
      }
    },
  },
  mounted() {
    this.updateViewStyle(true);
  },
  destroyed() {
    this.updateViewStyle(false);
  },
};
</script>
