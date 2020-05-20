<template>
  <i class="ilha-icon" :class="[type]">
  </i>
</template>

<script>

export default {
  name: 'ilha-icon',
  props: {
    type: String,
    fill: String,
    size: {
      type: Number,
      default: 50,
    },
  },
};

</script>
