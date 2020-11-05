<template>
  <div class="ilha-chart-summary-box p-0">
    <b-loading
      :is-full-page="false"
      :active="loading"
    >
    </b-loading>
    <div v-if="$slots.title" class="ilha-summary-box__header columns">
      <div
        class="column has-text-weight-bold p-l-1 p-r-1">
        <slot name="title" />
      </div>
    </div>
    <ilha-donut-chart
      ref="donut"
      v-if="chartType === 'donut'"
      :data="chartData"
      :locale="locale"
      style="width: 95%; min-width: 150px; height: 200px;">
    </ilha-donut-chart>
    <ilha-bar-chart
      ref="bar"
      v-if="chartType === 'bar'"
      :data="chartData"
      :locale="locale"
      :background-color="backgroundColor"
      style="width: 95%; min-width: 150px; height: 200px;">
    </ilha-bar-chart>
    <ilha-line-chart
      ref="line"
      v-if="chartType === 'line'"
      :data="chartData"
      :locale="locale"
      :background-color="backgroundColor"
      :showDatapoint="showDatapoint"
      style="width: 95%; min-width: 150px; height: 200px;">
    </ilha-line-chart>
  </div>
</template>

<script>

export default {
  name: 'ilha-chart-summary-box',
  props: {
    chartType: {
      Type: String,
      default: 'donut',
    },
    chartData: {
      default: () => [],
    },
    backgroundColor: {
      type: String,
    },
    locale: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showDatapoint: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
