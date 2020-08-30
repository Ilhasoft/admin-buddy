<script>
import { Line } from 'vue-chartjs';

const makeDefaultOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        padding: 10,
        maxTicksLimit: 8,
      },
    }],
  },
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      label(tooltipItem) {
        // eslint-disable-next-line
        return this._data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
      },
    },
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
});

export default {
  name: 'ilha-line-chart',
  extends: Line,
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    backgroundColor: {
      type: String,
      default: '',
    },
    locale: {
      type: String,
      default: 'en-US',
    },
  },
  data() {
    return {};
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: '',
            data: this.values.map((value) => (value)),
            backgroundColor: this.backgroundColor,
            fill: true,
          },
        ],
      };
    },
    values() {
      return this.data.map((d) => d.value);
    },
    labels() {
      return this.data.map((d) => d.label);
    },
    options() {
      return makeDefaultOptions();
    },
  },
  watch: {
    data() {
      this.renderChart(this.chartData, this.options);
    },
  },
  methods: {
    initChart() {
      this.renderChart(this.chartData, this.options);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
};

</script>
