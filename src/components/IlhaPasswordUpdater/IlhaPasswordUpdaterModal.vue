<template>
  <section>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
      </header>
      <ilha-form
        :fields="fields"
        :has-spacing="false"
        :inputs-container-classes="['modal-card-body']"
        :actions-classes="['modal-card-foot']"
        :btn-save-text="resetButtonLabel"
        @onSaveRequest="changePassword">
        <template v-slot:button>
          <b-button type="button" @click="$parent.close()">{{ cancelLabel }}</b-button>
        </template>
      </ilha-form>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ilha-password-updater-modal',
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
  computed: {
    fields() {
      return [
        {
          property: 'oldPassword',
          type: 'password',
          label: this.oldPasswordLabel,
          placeholder: this.oldPasswordLabel,
          rules: 'required',
        },
        {
          property: 'newPassword',
          type: 'password',
          label: this.newPasswordLabel,
          placeholder: this.newPasswordLabel,
          rules: 'required',
        },
        {
          property: 'confirmationPassword',
          type: 'password',
          label: this.newPasswordConfirmationLabel,
          placeholder: this.newPasswordConfirmationLabel,
          rules: 'required|confirmed:newPassword',
        },
      ];
    },
  },
  methods: {
    changePassword(event) {
      this.$emit('onPasswordChangeRequest', event);
      setTimeout(() => {
        this.$parent.close();
      }, 0);
    },
  },
};
</script>
