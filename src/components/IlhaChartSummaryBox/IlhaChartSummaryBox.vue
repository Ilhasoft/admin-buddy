<template>
  <ilha-summary-box class="ilha-chart-summary-box">
    <template v-slot:title>
      <slot name="title" />
    </template>
    <template v-slot:details>
      <slot name="details" />
    </template>
    <template v-slot:chart>
      <ilha-donut-chart
        :data="chartData"
        style="width: 95%; min-width: 150px; height: 200px;">
      </ilha-donut-chart>
    </template>
  </ilha-summary-box>
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
