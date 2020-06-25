<template>
  <section class="ilha-password-reset">
    <div class="container">
      <div class="columns section">
        <div class="column is-half ilha-login__form">
          <div class="box">
            <h3 class="subtitle">{{ subtitle }}</h3>
            <ilha-form
              :loading="loading"
              :fields="fields"
              :btnSaveText="resetButtonLabel"
              @onSaveRequest="resetPassword">
            </ilha-form>
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
    emailLabel: {
      type: String,
      default: 'Email',
    },
    emailPlaceholder: {
      type: String,
      default: 'Enter a email',
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
      htmlHeightLast: undefined,
    };
  },
  computed: {
    fields() {
      return [
        {
          property: 'email',
          type: 'email',
          label: this.emailLabel,
          placeholder: this.emailPlaceholder,
          rules: 'required|email',
        },
      ];
    },
  },
  methods: {
    resetPassword(data) {
      this.$emit('onPasswordReset', { email: data.email });
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
