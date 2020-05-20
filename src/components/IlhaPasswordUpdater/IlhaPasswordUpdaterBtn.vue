<template>
  <span class="ilha-password-updater-btn">
    <b-button
      type="is-info"
      class="m-t-1"
      @click="isComponentModalActive = true"
      outlined>Change password</b-button>
      <b-modal :active.sync="isComponentModalActive"
               has-modal-card
               trap-focus
               :destroy-on-hide="false"
               aria-role="dialog"
               aria-modal>
              <ilha-password-updater-modal
                @onPasswordChangeRequest="changePassword">
              </ilha-password-updater-modal>
          </b-modal>
  </span>
</template>

<script>

export default {
  name: 'ilha-password-updater-btn',
  props: {
      url: {
          type: String,
          required: true,
      },
  },
  data() {
    return {
      isComponentModalActive: false,
      formProps: {
      },
    };
  },
  methods: {
    changePassword($event) {
      this.$emit('onPasswordChangeRequest', $event);
    },
  },
};
</script>
