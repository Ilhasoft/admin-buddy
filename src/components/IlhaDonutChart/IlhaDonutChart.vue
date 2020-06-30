<script>
import { Doughnut } from 'vue-chartjs';
// import 'chartjs-plugin-labels'; // https://github.com/emn178/chartjs-plugin-labels
import './chart-js-plugin';

const makeDefaultOptions = (locale = 'en-US') => ({
  cutoutPercentage: 90,
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'right',
  },
  plugins: {
    labels: {
      fontColor: '#fff',
    },
  },
  elements: {
    center: {
      text: '11%',
      color: '#000',
      fontStyle: '\'Oxygen\', sans-serif',
      sidePadding: 20,
      minFontSize: 10,
      lineHeight: 25,
      locale,
    },
  },
  tooltips: {
    callbacks: {
      label(tooltipItem, data) {
        const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        return value.toLocaleString(locale);
      },
    },
  },
});

export default {
  name: 'ilha-donut-chart',
  extends: Doughnut,
  props: {
    data: {
      type: Array,
      default: () => [],
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
            backgroundColor: this.backgroundColors,
            data: this.values,
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
    backgroundColors() {
      return this.data.map((d) => d.backgroundColor);
    },
    sum() {
      return this.values.reduce((previous, current) => previous + current, 0);
    },
    maxValue() {
      return Math.max(...this.values);
    },
    options() {
      const options = makeDefaultOptions(this.locale);
      options.elements.center.text = `${this.maxValue.toLocaleString(this.locale)}`;
      options.legend.position = this.getLegendPosition();
      return options;
    },
  },
  methods: {
    initChart() {
      this.renderChart(this.chartData, this.options);
    },
    getLegendPosition() {
      return this.$el.offsetWidth < 220 ? 'bottom' : 'right';
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener('resize', () => {
        const legendCurrentPosition = this.options.legend.position;
        const legendCorrectPosition = this.getLegendPosition();
        if (legendCurrentPosition !== legendCorrectPosition) {
          this.options.legend.position = legendCorrectPosition;
          setTimeout(() => this.initChart(), 0);
        }
      });
    });
  },
};

</script>
