<template>
  <span class="ilha-password-updater-btn">
    <b-button
      type="is-info"
      class="save-button m-t-1"
      @click="isComponentModalActive = true"
    >
      {{ title }}
    </b-button>
      <b-modal :active.sync="isComponentModalActive"
               has-modal-card
               trap-focus
               :destroy-on-hide="false"
               aria-role="dialog"
               aria-modal>
              <ilha-password-updater-modal
                :title="title"
                :oldPasswordLabel="oldPasswordLabel"
                :newPasswordLabel="newPasswordLabel"
                :newPasswordConfirmationLabel="newPasswordConfirmationLabel"
                :resetButtonLabel="resetButtonLabel"
                :cancelLabel="cancelLabel"
                @onPasswordChangeRequest="changePassword">
              </ilha-password-updater-modal>
          </b-modal>
  </span>
</template>

<script>

export default {
  name: 'ilha-password-updater-btn',
  props: {
    title: {
      type: String,
      default: 'Change password',
    },
    oldPasswordLabel: {
      type: String,
      default: 'Old Password',
    },
    newPasswordLabel: {
      type: String,
      default: 'New Password',
    },
    newPasswordConfirmationLabel: {
      type: String,
      default: 'Confirm New Password',
    },
    resetButtonLabel: {
      type: String,
      default: 'Reset',
    },
    cancelLabel: {
      type: String,
      default: 'Cancel',
    },
  },
  data() {
    return {
      isComponentModalActive: false,
      formProps: {},
    };
  },
  methods: {
    changePassword($event) {
      this.$emit('onPasswordChangeRequest', $event);
    },
  },
};
</script>
