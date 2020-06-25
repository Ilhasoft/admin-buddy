<template>
  <section class="ilha-password-reset">
    <div class="container">
      <div class="columns section">
        <div class="column is-half ilha-login__form">
          <div class="box">
            <h3 class="subtitle">{{ subtitle }}</h3>
            <b-field :label="usernameLabel">
              <b-input v-model="username"
                       @keyup.native.enter="resetPassword"
                       :placeholder="usernamePlaceholder"
                       maxlength="30"
                       required></b-input>
            </b-field>
            <div class="buttons">
              <b-button
                type="is-info"
                :disabled="!canResetPassword"
                @click="resetPassword"
                :loading="loading"
                expanded>{{ resetButtonLabel }}</b-button>
            </div>
            <div class="has-text-centered">
              <router-link :to="loginRoute" class="has-text-success">
                {{ loginPageLabel }}
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
  name: 'ilha-password-reset',
  props: {
    appLogo: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: 'Reset your password',
    },
    usernameLabel: {
      type: String,
      default: 'User',
    },
    usernamePlaceholder: {
      type: String,
      default: 'Enter a username or email',
    },
    resetButtonLabel: {
      type: String,
      default: 'Reset',
    },
    loginPageLabel: {
      type: String,
      default: 'Login',
    },
    loginRoute: {
      type: Object,
      default: () => ({ name: 'Login' }),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      username: undefined,
      htmlHeightLast: undefined,
    };
  },
  computed: {
    canResetPassword() {
      return this.username;
    },
  },
  methods: {
    resetPassword() {
      this.$emit('onPasswordReset', { username: this.username });
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
