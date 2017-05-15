import RGB from './rgb';

const defaultColours = [
  new RGB(0, 84, 139),  // Blue
  new RGB(38, 166, 91), // Green
  new RGB(17, 216, 194), // Cyan
  new RGB(247, 202, 24), // Yellow
  new RGB(237, 136, 20), //Orange
  new RGB(192, 96, 64), //Redish oranga
  new RGB(237, 209, 112), //Bone
  new RGB(65, 36, 15), // Brown
  new RGB(137, 12, 198),  // Purple
  new RGB(207, 30, 15),   // Red
];

const opacity = 1;

/**
 * Generate chart data.
 *
 * This method creates a full set of chart data from the data and (optional)
 * colours passed to the constructor. This is ready for use within a Chart.js
 * chart.
 *
 * @returns {} A full set of chart data ready for use within a Chart.js chart.
 */
const chartData = (chartType, performanceData, colours = defaultColours, sortLabels = false) => {
  var makeDataset = function (data, i) {
    let type = data.type || chartType,
        borderDash = data.borderDash || [],
        colour = data.borderColor || data.backgroundColor || colours[i],
        basicData = {
      label: data.label,
      backgroundColor: colour.toRGBA(opacity),
      borderColor: colour.toRGBA(1),
      borderWidth: 1,
      borderDash,
      pointBackgroundColor: colour.toRGBA(1),
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverStrokeColor: colour.toRGBA(1),
      data: data.values,
      type: data.type,
      yAxisID: data.yAxisID
    };

    switch (type) {
      case "line":
        let extraData = {
          fill: false,
          backgroundColor: (new RGB(255, 255, 255)).toRGBA(0),
          pointRadius: 0,
          lineTension: 0.1,
          borderWidth: 2
        };
        return Object.assign(basicData, extraData);
      case "filledLine":
        let filledLineData = {
          fill: true,
          backgroundColor: colour.toRGBA(opacity),
          pointRadius: 0,
          lineTension: 0.1,
          borderWidth: 2
        }
        return Object.assign(basicData, filledLineData);
      case "radar":
        return Object.assign(basicData, {
          borderWidth: 2,
          backgroundColor: colour.toRGBA(0.3)
         });
    case "pie":
        return Object.assign(basicData, {
          backgroundColor: colours.map(colour => (colour.toRGBA(0.5))),
          borderColor: []
        });
    case "bar":
      default:
        return basicData;
    }
  };
  return {
    labels: labels(performanceData, sortLabels),
    datasets: createValues(performanceData, sortLabels).map(makeDataset)
  };
};

/**
 * Generate a list of labels to use within a chart.
 *
 * @returns {} A list of labels for use within a chart.
 */
const labels = (performanceData, sortLabels = true) => {
  let labels = performanceData.reduce((acc, { data }) => {
    let newLabels = Object.keys(data).filter((label) => (
      acc.indexOf(label) == -1
    ));
    return acc.concat(newLabels);
  }, []);
  if (sortLabels) {
    labels.sort();
  }
  return labels;
};

/**
 * Generate a set of bare values for use in chart data.
 *
 * Bare values data are a properly formatted set of data ready to be finalised
 * using the chartData function.
 *
 * Chart data requires a label value and a values value, the former being a
 * string and the latter a list of numbers. This method generates this from
 * the instance's data value.
 *
 * @returns {} A set of team values data.
 */
const createValues = (performanceData, sortLabels) => {
  let createOneValue = (dataset, _, performanceData) => (
    Object.assign(
      {},
      {
        label: dataset.description,
        values: labels(performanceData, sortLabels).map(dataLabel => (
          dataset.data[dataLabel]
        )),
        type: dataset.chartType
      },
      dataset
    )
  );
  return performanceData.map(createOneValue);
};

export default chartData;

