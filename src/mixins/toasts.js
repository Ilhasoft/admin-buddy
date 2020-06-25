export default {
  methods: {
    successLoginAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'User logged',
        position: 'is-bottom',
        type: 'is-success',
      });
    },
    errorLoginAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'Incorrect username or password',
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    passwordResetRequestSuccessAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'Password reset email sent',
        position: 'is-bottom',
        type: 'is-success',
      });
    },
    passwordResetRequestErrorAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'There is no active user associated with this e-mail address or the password can not be changed',
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    passwordResetSuccessAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'Password changed successfully!',
        position: 'is-bottom',
        type: 'is-success',
      });
    },
    passwordResetErrorAlert() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'Failed to change password',
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    alertSaveSuccess() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'Success save',
        position: 'is-bottom',
        type: 'is-success',
      });
    },
    alertSaveError() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'Save error',
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    alertFetchError() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'Entity not found',
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
    alertDeleteSuccess() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'Deleted',
        position: 'is-bottom',
        type: 'is-success',
      });
    },
    alertDeleteError() {
      this.$buefy.toast.open({
        duration: 2000,
        message: 'Error on delete',
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
  },
};
