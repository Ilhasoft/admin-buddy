<template>
  <div :class="inputsContainerClasses">
    <div v-for="(field, i) in fields"
         :key="i">
      <ilha-field
        v-if="field.type !== 'list' && field.type !== 'section'"
        :inner-data="innerData"
        :field="field"
        :editor="editor"
        :editor-config="editorConfig"
        :changeable="fields"
        :english-mode="englishMode"
        @keydownEnter="$emit('requestSave', $event)"
      >
      </ilha-field>

      <ilha--list-field
        v-if="field.type === 'list'"
        :inner-data="innerData"
        :field="field"
        :editor="editor"
        :editor-config="editorConfig"
        :add-label="addLabel"
        :empty-label="emptyLabel"
        :changeable="fields"
        :english-mode="englishMode"
      >
      </ilha--list-field>
      <ilha--section-field
        v-if="field.type === 'section'"
        :inner-data="innerData"
        :field="field"
        :editor="editor"
        :editor-config="editorConfig"
        :changeable="fields"
        :english-mode="englishMode"
      >
      </ilha--section-field>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ilha-fields-container',
  props: {
    innerData: {
      type: Object,
    },
    fields: {
      type: Array,
    },
    addLabel: {
      type: String,
      default: 'Add',
    },
    emptyLabel: {
      type: String,
      default: 'Empty',
    },
    editor: {
      type: Function,
    },
    editorConfig: {
      type: Object,
    },
    inputsContainerClasses: {
      type: Array,
      default: () => [],
    },
    englishMode: {
      type: Boolean,
      default: () => false,
    },
  },
};

</script>
