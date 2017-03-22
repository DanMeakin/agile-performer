const chartOptions = (opts) => (
  Object.assign(
    {},
    {
      scale: {
        ticks: {
          suggestedMin: 0,
          beginAtZero: true
        }
      },
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
