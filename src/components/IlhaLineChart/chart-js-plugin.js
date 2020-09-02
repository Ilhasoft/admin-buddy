// https://stackoverflow.com/questions/41198356/show-label-for-every-data-point-in-line-chart
// Show label for every data point in line chart

import Chart from 'chart.js';

Chart.pluginService.register({
  afterDraw(chartInstance) {
    if (chartInstance.config.options.showDatapoint) {
      const { helpers } = Chart;
      const { ctx } = chartInstance.chart;
      const fontColor = helpers.getValueOrDefault(
        chartInstance.config.options.showDatapoint.fontColor,
        chartInstance.config.options.defaultFontColor,
      );

      ctx.font = Chart.helpers.fontString(
        Chart.defaults.global.defaultFontSize, 'normal',
        Chart.defaults.global.defaultFontFamily,
      );
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = fontColor;

      chartInstance.data.datasets.forEach((dataset) => {
        for (let i = 0; i < dataset.data.length; i += 1) {
          // eslint-disable-next-line
          const model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
          // eslint-disable-next-line
          const scaleMax = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
          const yPos = (scaleMax - model.y) / scaleMax >= 0.93 ? model.y + 20 : model.y - 5;
          ctx.fillText(dataset.data[i], model.x, yPos);
        }
      });
    }
  },
});
