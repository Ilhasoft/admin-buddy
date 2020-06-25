<template>
  <section class="ilha-new-password-confirmation">
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
    tokenLabel: {
      type: String,
      default: 'Confirmation code',
    },
    tokenPlaceholder: {
      type: String,
      default: 'Enter the code sent to your email',
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
      htmlHeightLast: undefined,
    };
  },
  computed: {
    fields() {
      return [
        {
          property: 'token',
          type: 'text',
          label: this.tokenLabel,
          placeholder: this.tokenPlaceholder,
          rules: 'required',
        },
        {
          property: 'password',
          type: 'password',
          label: this.passwordLabel,
          placeholder: this.passwordPlaceholder,
          rules: 'required|min:8',
          autocomplete: 'new-password',
        },
        {
          property: 'confirmationPassword',
          type: 'password',
          label: this.passwordConfirmationLabel,
          placeholder: this.passwordConfirmationPlaceholder,
          rules: 'required|min:8|confirmed:password',
          autocomplete: 'off',
        },
      ];
    },
  },
  methods: {
    resetPassword(data) {
      const args = {
        token: data.token,
        password: data.password,
      };
      this.$emit('onPasswordReset', args);
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
