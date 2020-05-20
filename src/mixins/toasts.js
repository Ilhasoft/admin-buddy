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
