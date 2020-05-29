<template>
  <div class="ilha-summary-box p-0">
    <div class="ilha-summary-box__body p-t-1 p-b-1" v-if="$slots.metric || $slots.amount">
      <div class="columns is-mobile m-0 is-vcentered is-centered">
        <div
          v-if="$slots.icon"
          class="column is-one-fifth has-text-centered p-0 m-0 ">
          <slot name="icon" />
        </div>
        <div class="column" :class="$slots.icon ? ['is-four-fifths'] : []">
          <div class="ilha-summary-box__body__metric has-text-weight-bold">
            <slot name="metric" />
          </div>
          <div class="is-size-3 has-text-weight-bold">
            <slot name="amount" />
          </div>
        </div>
      </div>

      <div class="ilha-summary-box__body__period has-text-right is-size-6">
        //<slot name="period" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ilha-summary-box',
};
</script>
