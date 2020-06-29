<template>
  <ValidationProvider
    :rules="field.rules"
    :name="field.property"
    :vid="field.property"
    :class="field.hasBtn || field.hasImg ? ['columns', 'm-0'] : []"
    v-slot="{ errors, valid }"
    tag="div">
    <b-field
      :label="field.label"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
      :class="field.hasBtn || field.hasImg ? ['column', 'is-four-fifths', 'p-0',
            !field.hasImg ? ' m-r-1' : ''] : []">
      <b-input
        v-if="field.type !== 'select'
                    && field.type !== 'autocomplete'
                    && field.type !== 'masked'
                    && field.type !== 'editor'
                    && field.type !== 'checkbox'"
        v-model="innerData[field.property]"
        :type="field.type ? field.type : 'text'"
        :placeholder="field.placeholder"
        :maxlength="field.maxlength"
        :autocomplete="field.autocomplete"
        :disabled="field.disabled"
        expanded
      >
      </b-input>
      <b-input
        v-if="field.type === 'masked'"
        v-cleave="field.mask"
        v-model="innerData[field.property + '_formated']"
        :placeholder="field.placeholder"
        :autocomplete="field.autocomplete"
        :disabled="field.disabled"
        @change.native="changed()"
        @input.native="updateMaskedField(field, $event)"
        expanded
      >
      </b-input>
      <b-select
        v-if="field.type === 'select'"
        v-model="innerData[field.property]"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
        expanded
      >
        <option
          v-for="(option, i) in field.options"
          :key="i"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </b-select>
      <b-autocomplete
        v-if="field.type === 'autocomplete'"
        v-model="innerData[field.property]"
        :data="field.data"
        :placeholder="field.placeholder"
        :field="field.dataField"
        :loading="field.loading"
        :disabled="field.disabled"
        @typing="field.searchData"
        icon="magnify"
        open-on-focus>

        <template slot-scope="props">
          {{ field.dataField ? props.option[field.dataField] : props.option }}
        </template>
      </b-autocomplete>
      <ckeditor
        v-if="field.type === 'editor'
        && editorConfig
        && innerData[field.property] !== undefined
        && innerData[field.property] !== null"
        v-model="innerData[field.property]"
        :editor="editor"
        :config="editorConfig">
      </ckeditor>

      <b-checkbox
        v-if="field.type === 'checkbox'"
        v-model="innerData[field.property]">
        {{ field.placeholder }}
      </b-checkbox>
    </b-field>
    <div
      v-if="field.hasImg"
      class="ilha-form__img column p-0"
      :class="errors[0] ? ['with-error'] : []">
      <img
        :src="field.imgUrl"
      />
    </div>
    <div
      v-if="field.hasBtn"
      :class="errors[0] ? ['with-error'] : []"
      class="ilha-form__open-modal-btn column p-0">
      <b-button
        class="is-primary"
        @click="field.btnClicked">
        {{ field.btnText }}
      </b-button>
    </div>
  </ValidationProvider>
</template>

<script>
import {
  ValidationProvider,
} from 'vee-validate';
import cleave from './cleave';

export default {
  name: 'ilha-field',
  components: {
    ValidationProvider,
  },
  directives: {
    cleave,
  },
  props: {
    changeable: {},
    field: {
      type: Object,
    },
    editor: {
      type: Function,
    },
    editorConfig: {
      type: Object,
    },
    innerData: {
      type: Object,
    },

  },
  methods: {
    updateMaskedField(field, $event) {
      // eslint-disable-next-line
      this.innerData[field.property + '_formated'] = $event.target._vCleave.getFormattedValue();
      // eslint-disable-next-line
      this.innerData[field.property] = $event.target._vCleave.getRawValue();
    },
    isDefined(value) {
      return value !== undefined && value !== null;
    },
    init() {
      if (this.field && this.field.type === 'autocomplete') {
        this.field.searchData('');
      }
      if (
        this.field
        && !this.isDefined(this.innerData[this.field.property])
        && this.isDefined(this.field.initValue)
      ) {
        this.innerData[this.field.property] = this.field.initValue;
      }
    },
  },
  watch: {
    field() {
      this.init();
    },
    innerData() {
      this.init();
    },
    changeable() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};

</script>
