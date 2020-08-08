<script>
import { Bar } from 'vue-chartjs';

const makeDefaultOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  plugins: {
    labels: {
      fontColor: '#fff',
    },
  },
  tooltips: {
    callbacks: {
      label(tooltipItem) {
        // eslint-disable-next-line
        return this._data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index][1];
      },
    },
  },
});

export default {
  name: 'ilha-bar-chart',
  extends: Bar,
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
            data: this.values.map((value) => ([0, value])),
            backgroundColor: this.backgroundColor,
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
      return makeDefaultOptions(this.locale);
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
