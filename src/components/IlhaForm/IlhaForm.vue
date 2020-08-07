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
    <div :class="inputsContainerClasses">
      <div v-for="(field, i) in fields"
           :key="i">
        <ilha-field
          v-if="field.type !== 'list'"
          :inner-data="innerData"
          :field="field"
          :editor="editor"
          :editor-config="editorConfig"
          :changeable="fields"
          @keydownEnter="requestSave"
        >
        </ilha-field>

        <ilha--list-field
          v-if="field.type === 'list'"
          :inner-data="innerData"
          :field="field"
          :editor="editor"
          :editor-config="editorConfig"
          :add-label="addLabel"
          :changeable="fields"
        >
        </ilha--list-field>
      </div>
    </div>

    <div
      :class="actionsClasses"
      class="actions has-text-right">
      <slot name="button" />

      <b-button
        type="is-info"
        :class="hasSpacing ? ['m-l-1', 'm-t-1'] : []"
        :loading="loading"
        @click="passes(requestSave.bind(this))"
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
      default: () => [],
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
  },
  data() {
    return {
      canSave: true,
      innerData: {},
      editor: ClassicEditor,
    };
  },
  computed: {
    editorConfig() {
      return this.uploadUrl ? { extraPlugins: [(editor) => this.uploader(editor)] } : undefined;
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
    requestSave() {
      this.$emit('onSaveRequest', this.innerData);
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
