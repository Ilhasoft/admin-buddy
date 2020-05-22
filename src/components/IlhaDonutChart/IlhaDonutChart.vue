<script>
import { Doughnut } from 'vue-chartjs';
// import 'chartjs-plugin-labels'; // https://github.com/emn178/chartjs-plugin-labels
import './chart-js-plugin';

const makeDefaultOptions = () => ({
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
    maxValue() {
      return Math.max(...this.values);
    },
    options() {
      const options = makeDefaultOptions();
      options.elements.center.text = `${this.maxValue}%`;
      return options;
    },
  },
  methods: {
    initChart() {
      this.renderChart(this.chartData, this.options);
    },
  },
  mounted() {
    console.log(this.options, makeDefaultOptions());
    this.renderChart(this.chartData, this.options);
  },
};

</script>
