const chartOptions = (opts) => (
  Object.assign(
    {},
    {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: 0,
            beginAtZero: true
          }
        }]
      }
    },
    opts
  )
);

export default chartOptions;
