<template>
  <ValidationObserver
    v-slot="{ passes }"
    :class="hasSpacing ? ['m-2', 'm-t-1', 'm-b-1', 'p-2'] : []"
    ref="observer"
    tag="section"
    class="ilha-form">
    <b-loading
      v-if="fetchLoading"
      :active="fetchLoading"
      :is-full-page="false">
    </b-loading>
    <ilha-fields-container
      v-if="!steps"
      :inner-data="innerData"
      :add-label="addLabel"
      :empty-label="emptyLabel"
      :editor="editor"
      :editor-config="editorConfig"
      :inputs-container-classes="inputsContainerClasses"
      :fields="fields"
      :english-mode="englishMode"
      @requestSave="requestSave(passes)"
    />
    <b-steps
      v-if="steps"
      v-model="activeStep"
    >
      <template v-for="(step, index) in steps">
        <b-step-item
          :key="index"
          clickable
          :label="!englishMode ? step.label : step.englishLabel">
          <ilha-fields-container
            :inner-data="innerData"
            :add-label="addLabel"
            :empty-label="emptyLabel"
            :editor="editor"
            :editor-config="editorConfig"
            :inputs-container-classes="inputsContainerClasses"
            :fields="step.fields"
            :english-mode="englishMode"
            @requestSave="requestSave(passes)"
          />
        </b-step-item>
      </template>
    </b-steps>
    <div
      v-if="canSave"
      :class="actionsClasses"
      class="actions has-text-right">
      <slot name="button" />

      <b-button
        type="is-info"
        :class="hasSpacing ? ['m-l-1', 'm-t-1'] : []"
        :loading="loading"
        @click="requestSave(passes)"
        class="save-button"
        tabindex="0"
      >
        {{ btnSaveText }}
      </b-button>
    </div>
    </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
} from 'vee-validate';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import SimpleUploadAdapter from './simpleuploadadapter';

export default {
  name: 'ilha-form',
  components: {
    ValidationObserver,
  },
  props: {
    data: {
      type: Object,
    },
    fields: {
      type: Array,
    },
    steps: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    fetchLoading: {
      type: Boolean,
      default: false,
    },
    hasSpacing: {
      type: Boolean,
      default: true,
    },
    inputsContainerClasses: {
      type: Array,
      default: () => [],
    },
    actionsClasses: {
      type: Array,
      default: () => [],
    },
    uploadUrl: {
      type: String,
    },
    uploadHeadersReq: {
      type: Object,
      default: () => {},
    },
    uploadBodyLabel: {
      type: String,
      default: 'image',
    },
    btnSaveText: {
      type: String,
      default: 'Save',
    },
    addLabel: {
      type: String,
      default: 'Add',
    },
    emptyLabel: {
      type: String,
      default: 'Empty',
    },
    saveOnErrors: {
      type: Boolean,
      default: false,
    },
    canSave: {
      type: Boolean,
      default: true,
    },
    englishMode: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      innerData: {},
      editor: DecoupledEditor,
      activeStep: 0,
    };
  },
  computed: {
    editorConfig() {
      return this.uploadUrl
        ? {
          extraPlugins: [(editor) => this.uploader(editor)],
        } : undefined;
    },
  },
  methods: {
    uploader(editor) {
      const options = {
        uploadUrl: this.uploadUrl,
        headers: this.uploadHeadersReq,
        bodyLabel: this.uploadBodyLabel,
      };
      // eslint-disable-next-line
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new SimpleUploadAdapter(loader, options);
    },
    initData() {
      if (this.data) {
        this.innerData = this.data;
      } else {
        this.innerData = {};
      }
    },
    requestSave(passes) {
      if (!this.saveOnErrors) {
        passes(() => {
          this.$emit('onSaveRequest', this.innerData);
        });
      } else {
        passes(() => {});
        this.$emit('onSaveRequest', this.innerData);
      }
    },
  },
  watch: {
    data() {
      this.initData();
    },
    fields() {
      this.initData();
    },
  },
  mounted() {
    this.initData();
  },
};

</script>
