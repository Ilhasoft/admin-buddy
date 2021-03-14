<template>
  <div class="ilha-form__field__list">
    <div class="label">{{ !englishMode ? field.label : field.englishLabel }}</div>
    <div>
      <div class="ilha-form__field__list__entry p-1">
        <ilha-field
          v-for="(entryField, k) in field.fields"
          :key="k"
          :inner-data="innerData"
          :field="entryField"
          :editor="editor"
          :english-mode="englishMode"
          :editor-config="editorConfig">
        </ilha-field>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ilha--section-field',
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
  watch: {
    innerData() {
    },
    changeable() {
    },
  },
};

</script>
