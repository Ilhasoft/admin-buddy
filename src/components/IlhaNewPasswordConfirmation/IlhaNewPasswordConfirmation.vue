<template>
  <section class="ilha-new-password-confirmation">
    <div class="container">
      <div class="columns section">
        <div class="column is-half ilha-login__form">
          <div class="box">
            <h3 class="subtitle">{{ subtitle }}</h3>
            <b-field :label="passwordLabel">
              <b-input type="password"
                       v-model="password"
                       @keyup.native.enter="resetPassword"
                       :placeholder="passwordPlaceholder"
                       maxlength="30"
                       required
                       password-reveal>
              </b-input>
            </b-field>
            <b-field :label="passwordConfirmationLabel">
              <b-input type="password"
                       v-model="passwordConfirmation"
                       @keyup.native.enter="resetPassword"
                       :placeholder="passwordConfirmationPlaceholder"
                       maxlength="30"
                       required
                       password-reveal>
              </b-input>
            </b-field>
            <div class="buttons">
              <b-button
                type="is-info"
                :disabled="!canResetPassword"
                @click="resetPassword"
                :loading="loading"
                expanded>{{ resetButtonLabel }}</b-button>
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
  name: 'ilha-new-password-confirmation',
  props: {
    appLogo: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: 'Reset your password',
    },
    passwordLabel: {
      type: String,
      default: 'Password',
    },
    passwordPlaceholder: {
      type: String,
      default: 'Enter your password',
    },
    passwordConfirmationLabel: {
      type: String,
      default: 'Confirm password',
    },
    passwordConfirmationPlaceholder: {
      type: String,
      default: 'Confirm your password',
    },
    resetButtonLabel: {
      type: String,
      default: 'Reset',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      password: undefined,
      passwordConfirmation: undefined,
      htmlHeightLast: undefined,
    };
  },
  computed: {
    canResetPassword() {
      return this.password
        && this.passwordConfirmation
        && this.password === this.passwordConfirmation;
    },
  },
  methods: {
    resetPassword() {
      this.$emit('onPasswordReset', { password: this.password });
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
