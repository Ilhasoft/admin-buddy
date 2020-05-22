<template>
  <div class="ilha-summary-box has-background-primary has-text-white m-1 p-0">
    <div class="ilha-summary-box__header columns">
      <div class="column is-two-thirds">
        <slot name="icon" />
      </div>
      <div class="column is-size-7">
        <slot name="details" />
      </div>
    </div>
    <div class="ilha-summary-box__body m-2">
      <div class="is-size-7">//<slot name="period" /></div>
      <div class="has-text-weight-bold"><slot name="title" /></div>
      <div class="is-size-3 has-text-weight-bold"><slot name="amount" /></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ilha-summary-box',
};
</script>
