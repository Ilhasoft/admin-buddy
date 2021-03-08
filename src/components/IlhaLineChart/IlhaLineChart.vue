<script>
import { Line } from 'vue-chartjs';
import './chart-js-plugin';

const makeDefaultOptions = (showDatapoint = false, legend = false, locale = 'en-US') => ({
  showDatapoint,
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
    display: legend,
  },
  tooltips: {
    callbacks: {
      label(tooltipItem) {
        // eslint-disable-next-line
        const value = this._data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        return value.toLocaleString(locale);
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
    showDatapoint: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    chartData() {
      if (this.data.length !== undefined && this.data.length > 0) {
        return {
          labels: this.data.map((d) => d.label),
          datasets: [
            {
              label: '',
              data: this.data.map((d) => d.value),
              backgroundColor: this.backgroundColor,
              fill: true,
            },
          ],
        };
      }
      let labels = [];
      const datasets = [];
      Object.keys(this.data).forEach((key) => {
        const d = this.data[key].data;
        labels = labels.concat(d.map((data) => data.label));
        datasets.push({
          label: key,
          data: d.map((data) => data.value),
          borderColor: this.data[key].color,
          fill: false,
        });
      });
      labels = Array.from(new Set(labels));
      labels.sort();
      return { labels, datasets };
    },
    values() {
      return this.data.map((d) => d.value);
    },
    labels() {
      return this.data.map((d) => d.label);
    },
    options() {
      return makeDefaultOptions(this.showDatapoint, this.data.length === undefined, this.locale);
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
