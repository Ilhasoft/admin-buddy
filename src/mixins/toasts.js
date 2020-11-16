export default {
  data() {
    return {
      successLoginMessage: 'User logged',
      errorLoginMessage: 'Incorrect username or password',
      passwordResetRequestSuccessMessage: 'Password reset email sent',
      passwordResetErrorRequestMessage: 'There is no active user associated with this e-mail address or the password can not be changed',
      passwordResetSuccessMessage: 'Password changed successfully!',
      saveSuccessMessage: 'Success save',
      saveErrorMessage: 'Save error',
      fetchErrorMessage: 'Entity not found',
      deleteSuccessMessage: 'Deleted',
      deleteErrorMessage: 'Error on delete',
    };
  },
  methods: {
    successLoginAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: this.successLoginMessage,
        position: 'is-bottom',
        type: 'is-success',
      });
    },
    errorLoginAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: this.errorLoginMessage,
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    passwordResetRequestSuccessAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: this.passwordResetRequestSuccessMessage,
        position: 'is-bottom',
        type: 'is-success',
      });
    },
    passwordResetRequestErrorAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: this.passwordResetErrorRequestMessage,
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    passwordResetSuccessAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: this.passwordResetSuccessMessage,
        position: 'is-bottom',
        type: 'is-success',
      });
    },
    passwordResetErrorAlert(msg = 'Invalid code') {
      this.$buefy.toast.open({
        duration: 2000,
        message: msg,
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    alertSaveSuccess() {
      this.$buefy.toast.open({
        duration: 2000,
        message: this.saveSuccessMessage,
        position: 'is-bottom',
        type: 'is-success',
      });
    },
    alertSaveError(message = '') {
      this.$buefy.toast.open({
        duration: 2000,
        message: message ? `${this.saveErrorMessage}: ${message}` : this.saveErrorMessage,
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    alertFetchError() {
      this.$buefy.toast.open({
        duration: 2000,
        message: this.fetchErrorMessage,
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    alertDeleteSuccess() {
      this.$buefy.toast.open({
        duration: 2000,
        message: this.deleteSuccessMessage,
        position: 'is-bottom',
        type: 'is-success',
      });
    },
    alertDeleteError(message = '') {
      this.$buefy.toast.open({
        duration: 2000,
        message: this.deleteErrorMessage ? `${this.deleteErrorMessage}: ${message}` : this.this.deleteErrorMessage,
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
  },
};
