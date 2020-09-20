<template>
  <div class="ilha-form__field__list">
    <div class="label">{{ field.label }}</div>
    <div
      v-if="!entries || entries.length === 0"
      class="ilha-form__field__list__entry p-1">
      <a @click="add(0)">{{ addLabel }}</a>
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
          :editor-config="editorConfig">
        </ilha-field>
        <div
          v-if="field.hasActions === undefined || field.hasActions === true"
          class="ilha-form__field__list__entry__actions">
          <b-icon
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
  },
  data() {
    return {
      entries: undefined,
    };
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
