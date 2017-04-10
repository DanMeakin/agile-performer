import RGB from './rgb';

const defaultColours = [
  new RGB(219, 70, 70),   // red
  new RGB(92, 153, 237),  // blue
  new RGB(244, 214, 33), // yellow
  new RGB(203, 120, 230),  // purple
  new RGB(80, 186, 104), // green
];

const opacity = 0.65;

/**
 * Generate chart data.
 *
 * This method creates a full set of chart data from the data and (optional)
 * colours passed to the constructor. This is ready for use within a Chart.js
 * chart.
 *
 * @returns {} A full set of chart data ready for use within a Chart.js chart.
 */
const chartData = (chartType, performanceData, colours = defaultColours) => {
  var makeDataset = function (data, i) {
    let type = data.type || chartType;
    let colour = colours[i];
    let basicData = {
      label: data.label,
      backgroundColor: colour.toRGBA(opacity),
      borderColor: colour.toRGBA(1),
      borderWidth: 1,
      pointBackgroundColor: colour.toRGBA(1),
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverStrokeColor: colour.toRGBA(1),
      data: data.values,
      type: data.type
    };

    switch (type) {
      case "line":
        let extraData = {
          fill: false,
          pointRadius: 0,
          lineTension: 0.1,
          borderWidth: 2
        };
        return Object.assign(basicData, extraData);
      case "radar":
        return Object.assign(basicData, { 
          borderWidth: 2,
          backgroundColor: colour.toRGBA(0.3)
         });
      case "bar":
      default:
        return basicData;
    }
  };
  return {
    labels: labels(performanceData),
    datasets: createValues(performanceData).map(makeDataset)
  };
};

/**
 * Generate a list of labels to use within a chart.
 *
 * @returns {} A list of labels for use within a chart.
 */
const labels = (performanceData) => {
  return performanceData.reduce((acc, { data }) => {
    let newLabels = Object.keys(data).filter((label) => (
      acc.indexOf(label) == -1
    ));
    return acc.concat(newLabels).sort();
  }, []);
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
const createValues = performanceData => (
  performanceData.map(createOneValue)
);

/**
 * Generate one value for use in chart data.
 *
 * @param {} description
 * @param {} data
 * @param {} chartType
 * @param {} _
 * @param {} performanceData
 */
const createOneValue = ({ description, data, chartType }, _, performanceData) => (
  {
    label: description,
    values: labels(performanceData).map(dataLabel => (
      data[dataLabel] || 0
    )),
    type: chartType
  }
);

export default chartData;

