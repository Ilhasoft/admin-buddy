<template>
  <ValidationProvider
    :rules="field.rules"
    :name="field.property"
    :vid="field.property"
    :class="field.hasBtn || field.hasImg ? ['columns', 'm-0'] : []"
    v-slot="{ errors, valid }"
    tag="div"
    class="ilha-form__field"
  >
    <b-field
      :label="finalLabel"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
      :class="field.hasBtn || field.hasImg ? ['column', 'is-four-fifths', 'p-0',
            !field.hasImg ? ' m-r-1' : ''] : []">
      <b-input
        v-if="field.type !== 'select'
                    && field.type !== 'autocomplete'
                    && field.type !== 'masked'
                    && field.type !== 'editor'
                    && field.type !== 'checkbox'
                    && field.type !== 'color'
                    && field.type !== 'upload'"
        v-model="innerData[field.property]"
        :type="field.type ? field.type : 'text'"
        :placeholder="finalPlaceholder"
        :maxlength="field.maxlength"
        :autocomplete="field.autocomplete"
        :disabled="field.disabled"
        @keydown.enter.native="$emit('keydownEnter')"
        @change.native="field.changedFunc ?
        field.changedFunc($event, innerData[field.property], field, innerData) : ''"
        expanded
      >
      </b-input>
      <b-input
        v-if="field.type === 'masked'"
        v-cleave="field.mask"
        v-model="innerData[field.property + '_formatted']"
        :placeholder="finalPlaceholder"
        :autocomplete="field.autocomplete"
        :disabled="field.disabled"
        @input.native="updateMaskedField(field, $event)"
        @keydown.enter.native="$emit('keydownEnter')"
        @change.native="field.changedFunc ?
        field.changedFunc($event, innerData[field.property], field, innerData) : ''"
        expanded
      >
      </b-input>
      <b-select
        v-if="field.type === 'select'"
        v-model="innerData[field.property]"
        :placeholder="finalPlaceholder"
        :disabled="field.disabled"
        @change.native="field.changedFunc ?
        field.changedFunc($event, innerData[field.property], field, innerData) : ''"
        expanded
      >
        <option
          v-for="(option, i) in field.options"
          :key="i"
          :value="option.value"
        >
          {{ !englishMode ? option.label : option.englishLabel }}
        </option>
      </b-select>
      <b-autocomplete
        v-if="field.type === 'autocomplete'"
        v-model="innerData[field.property]"
        :data="field.data"
        :placeholder="finalPlaceholder"
        :field="field.dataField"
        :loading="field.loading"
        :disabled="field.disabled"
        :check-infinite-scroll="field.infiniteScroll"
        @blur="onSelectBlur()"
        @typing="field.searchData($event); changedBySelect = false"
        @infinite-scroll="field.searchData($event, true)"
        @select="selectedBySelect($event);field.changedFunc ?
        field.changedFunc($event, innerData[field.property], field, innerData) : ''"
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
        {{ finalPlaceholder }}
      </b-checkbox>
      <ColourPicker
        v-if="field.type === 'color'"
        v-model="innerData[field.property]"
        :color="innerData[field.property]"
        picker="chrome"
      >
      </ColourPicker>
      <b-upload
        v-if="field.type === 'upload'"
        @input="innerData[field.property] = $event;field.changedFunc
        ? field.changedFunc($event, innerData[field.property], field, innerData) : ''"
        :accept="field.accept"
        class="file-label"
      >
        <span class="file-cta">
          <b-icon class="file-icon" icon="upload"></b-icon>
        </span>
        <span class="file-name" v-if="innerData[field.property] && innerData[field.property].name">
          {{ innerData[field.property].name }}
        </span>
      </b-upload>
    </b-field>
    <div
      v-if="field.hasImg"
      class="ilha-form__img column p-0"
      :class="errors[0] ? ['with-error'] : []">
      <img
        v-if="field.imgUrl"
        :src="field.imgUrl"
      />
      <img
        v-if="field.propertyImage"
        :src="field.serverUrl && innerData[field.property]
        && !innerData[field.property].includes('base64')
        ? field.serverUrl + innerData[field.property] : innerData[field.property]"
      />
      <span
        v-if="field.svg"
        v-html="field.svg"
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
import ColourPicker from 'vue-colour-picker';
import {
  ValidationProvider,
} from 'vee-validate';
import cleave from './cleave';

export default {
  name: 'ilha-field',
  components: {
    ValidationProvider,
    ColourPicker,
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
    englishMode: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      changedBySelect: false,
    };
  },
  computed: {
    finalLabel() {
      return !this.englishMode ? this.field.label : this.field.englishLabel;
    },
    finalPlaceholder() {
      return !this.englishMode ? this.field.placeholder : this.field.englishPlaceholder;
    },
  },
  methods: {
    updateMaskedField(field, $event) {
      // eslint-disable-next-line
      this.innerData[field.property + '_formatted'] = $event.target._vCleave.getFormattedValue();
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
    initColorField() {
      const input = this.$el.querySelector('.color-picker input');
      input.classList.remove('color-input');
      input.classList.add('input');
      input.classList.add('is-success');
    },
    selectedBySelect($event) {
      this.changedBySelect = !!$event;
    },
    onSelectBlur() {
      if (!this.changedBySelect) {
        const value = this.innerData[this.field.property];
        const matchs = this.field.data.filter(
          (d) => (this.field.dataField ? d[this.field.dataField] === value : d === value),
        );
        if (matchs.length === 0) {
          this.innerData[this.field.property] = undefined;
        }
        this.changedBySelect = false;
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
    if (this.field.type === 'color') {
      this.initColorField();
    }
  },
};

</script>
