<template>
  <div class="ilha-chart-summary-box p-0">
    <div v-if="$slots.title" class="ilha-summary-box__header columns">
      <div
        class="column has-text-weight-bold p-l-1 p-r-1">
        <slot name="title" />
      </div>
    </div>
    <ilha-donut-chart
      :data="chartData"
      style="width: 95%; min-width: 150px; height: 200px;">
    </ilha-donut-chart>
  </div>
</template>

<script>

export default {
  name: 'ilha-chart-summary-box',
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
