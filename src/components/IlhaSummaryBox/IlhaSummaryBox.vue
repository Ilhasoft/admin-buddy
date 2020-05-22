<template>
  <div class="ilha-summary-box p-0">
    <div class="ilha-summary-box__header columns">
      <div
        :class="$slots.details ? ['is-two-thirds '] : ['is-four-fifths']"
        class="column p-l-2 has-text-weight-bold">
        <slot name="title" />
      </div>
      <div
        v-if="$slots.details"
        class="column is-size-7">
        <slot name="details" />
      </div>
      <div
        v-if="$slots.rightBtn"
        class="column right-btn">
        <slot name="rightBtn" />
      </div>
    </div>
    <div
      v-if="$slots.period || $slots.metric || $slots.amount"
      class="ilha-summary-box__body p-l-2 p-b-1 p-t-1">
      <div class="is-size-7">//<slot name="period" /></div>
      <div class="has-text-weight-bold"><slot name="metric" /></div>
      <div class="is-size-3 has-text-weight-bold"><slot name="amount" /></div>
    </div>
    <div
      v-if="$slots.chart && !($slots.period && $slots.title && $slots.amount)"
      class="ilha-summary-box__chart p-l-2">
      <div class=""><slot name="chart" /></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ilha-summary-box',
};
</script>
