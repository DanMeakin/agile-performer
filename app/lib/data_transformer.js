import RGB from './rgb';

const defaultColours = [
  new RGB(179, 181, 198),
  new RGB(255, 99, 132),
  new RGB(205, 99, 255),
  new RGB(99, 126, 255),
  new RGB(99, 255, 215)
];

/**
 * Generate chart data.
 *
 * This method creates a full set of chart data from the data and (optional)
 * colours passed to the constructor. This is ready for use within a Chart.js
 * chart.
 *
 * @returns {} A full set of chart data ready for use within a Chart.js chart.
 */
const chartData = (performanceData, colours = defaultColours) => {
  var makeDataset = function(data, i) {
    let colour = colours[i];
    return {
      label: data.label,
      fillColor: colour.toRGBA(0.2),
      strokeColor: colour.toRGBA(1),
      pointColor: colour.toRGBA(1),
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: colour.toRGBA(1),
      data: data.values
    };
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
}

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
const createValues = (performanceData) => {
  return performanceData.map(({ description, data }) => (
    { label: description,
      values: labels(performanceData).map((dataLabel) => (
        data[dataLabel] || 0
      ))
    }
  ));
}

export default chartData;
