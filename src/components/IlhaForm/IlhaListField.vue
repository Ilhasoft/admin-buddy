<template>
  <div class="ilha-form__field__list">
    <div class="label">{{ !englishMode ? field.label : field.englishLabel }}</div>
    <div
      v-if="!entries || entries.length === 0"
      class="ilha-form__field__list__entry p-1">
      <a v-if="hasAction" @click="add(0)">{{ addLabel }}</a>
      <span v-if="!hasAction">{{ emptyLabel }}</span>
    </div>
    <div>
      <div
        v-for="(entry, j) in entries"
        :key="j"
        class="ilha-form__field__list__entry p-1">
        <ilha-field
          v-for="(entryField, k) in field.entryFields"
          :key="k"
          :inner-data="entry"
          :field="entryField"
          :editor="editor"
          :english-mode="englishMode"
          :editor-config="editorConfig">
        </ilha-field>
        <div
          v-if="hasAction"
          class="ilha-form__field__list__entry__actions">
          <b-icon
            v-if="canAdd"
            @click.native="add(j + 1)"
            icon="plus"
            size="is-medium">
          </b-icon>
          <b-icon
            @click.native="remove(j)"
            icon="minus"
            size="is-medium">
          </b-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ilha--list-field',
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
    addLabel: {
      type: String,
      default: 'Add',
    },
    emptyLabel: {
      type: String,
      default: 'Empty',
    },
    englishMode: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      entries: undefined,
    };
  },
  computed: {
    hasAction() {
      return this.field.hasActions === undefined || this.field.hasActions === true;
    },
    canAdd() {
      return this.field.maxSize === undefined || this.entries.length < this.field.maxSize;
    },
  },
  methods: {
    add(i) {
      this.entries.splice(i, 0, {});
      this.updateIndexes();
    },
    remove(i) {
      this.entries.splice(i, 1);
      this.updateIndexes();
    },
    updateIndexes() {
      if (!this.field || !this.field.indexAttribute) {
        return;
      }

      this.innerData[this.field.property] = this.innerData[this.field.property].map(
        (entry, i) => ({ ...entry, [this.field.indexAttribute]: i + 1 }),
      );

      this.initEntries();
    },
    initEntries() {
      if (!this.innerData[this.field.property]) {
        this.innerData[this.field.property] = [];
      }
      this.entries = this.innerData[this.field.property];
    },
  },
  watch: {
    innerData() {
      this.initEntries();
    },
    changeable() {
      this.initEntries();
    },
  },
  mounted() {
    this.initEntries();
  },
};

</script>
