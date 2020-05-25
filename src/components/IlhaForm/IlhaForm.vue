<template>
  <ValidationObserver
    v-slot="{ passes }"
    :class="hasSpacing ? ['m-2', 'm-t-1', 'm-b-1', 'p-2'] : []"
    ref="observer"
    tag="section"
    class="ilha-form">
    <div :class="inputsContainerClasses">
      <ValidationProvider
        v-for="(field, i) in fields"
        :key="i"
        :rules="field.rules"
        :name="field.property"
        :vid="field.property"
        v-slot="{ errors, valid }"
        tag="div">
        <b-field
          :label="field.label"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors">
          <b-input
            v-if="field.type !== 'select'
                  && field.type !== 'autocomplete'
                  && field.type !== 'masked'"
            v-model="innerData[field.property]"
            :type="field.type ? field.type : 'text'"
            :placeholder="field.placeholder"
            :maxlength="field.maxlength"
            :autocomplete="field.autocomplete"
            @change.native="changed()"
            expanded
          >
          </b-input>
          <b-input
            v-if="field.type === 'masked'"
            v-cleave="field.mask"
            v-model="innerData[field.property + '_formated']"
            :placeholder="field.placeholder"
            :autocomplete="field.autocomplete"
            @change.native="changed()"
            @input.native="updateMaskedField(field, $event)"
            expanded
          >
          </b-input>
          <b-select
            v-if="field.type === 'select'"
            v-model="innerData[field.property]"
            :placeholder="field.placeholder"
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
            :field="field.field"
            :loading="field.loading"
            @typing="field.searchData"
            icon="magnify"
            open-on-focus>

            <template slot-scope="props">
              {{ field.field ? props.option[field.field] : props.option }}
            </template>
          </b-autocomplete>
        </b-field>
      </ValidationProvider>
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
        tabindex="0"
      >
        Save
      </b-button>
    </div>
    </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import cleave from './cleave';


export default {
  name: 'ilha-form',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  directives: {
    cleave,
  },
  props: {
    data: {
      type: Object,
    },
    fields: {
      type: Array,
      default: () => [],
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
  },
  data() {
    return {
      loading: false,
      canSave: true,
      innerData: {},
    };
  },
  computed: {
    autocompleteFields() {
      return this.fields.filter((field) => field.type === 'autocomplete');
    },
  },
  methods: {
    initData() {
      this.innerData = {};
      if (this.data) {
        this.innerData = { ...this.data };
      }
    },
    requestSave() {
      this.$emit('onSaveRequest', this.innerData);
    },
    changed() {
      // this.canSave = false;
      // this.$refs.observer.validate().then((valid) => {
      // this.canSave = true;
      // });
    },
    updateMaskedField(field, $event) {
      // eslint-disable-next-line
      this.innerData[field.property + '_formated'] = $event.target._vCleave.getFormattedValue();
      // eslint-disable-next-line
      this.innerData[field.property] = $event.target._vCleave.getRawValue();
    },
  },
  watch: {
    data() {
      this.initData();
    },
    fields() {
      this.initData();
      this.autocompleteFields.forEach((field) => {
        field.searchData('');
      });
    },
  },
  mounted() {
    this.initData();
  },
};

</script>
