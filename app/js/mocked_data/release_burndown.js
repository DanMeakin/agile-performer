import RGB from '../lib/rgb';

let burndownData = {
    "Start": { remaining: 220, added: 0 },
    "Sprint 1": { remaining: 200, added: 0 },
    "Sprint 2": { remaining: 170, added: 10 },
    "Sprint 3": { remaining: 130, added: 20 },
    "Sprint 4": { remaining: 80, added: 35 }
  },
    storyPoints = Object.keys(burndownData).reduce((acc, k) => {
      acc[k] = burndownData[k].remaining;
      return acc;
    }, {}),
    addedPoints = Object.keys(burndownData).reduce((acc, k) => {
      acc[k] = burndownData[k].added * (-1);
      return acc;
    }, {}),
    releaseTrendDelta = (() => {
      let pointNames = Object.keys(burndownData),
          delta = (burndownData[pointNames[0]].remaining - burndownData[pointNames[pointNames.length - 1]].remaining) / (pointNames.length - 1);
      return delta;
    })(),
    addedTrendDelta = (() => {
      let pointNames = Object.keys(burndownData),
          delta = (-1) * (burndownData[pointNames[0]].added - burndownData[pointNames[pointNames.length - 1]].added) / (pointNames.length - 1);
      return delta;
    })(),
    makeReleaseTrend = () => {
      // If added trend delta is lower than release trend delta, then the lines
      // don't converge and so we should not do a full projection. If they do
      // converge, then draw to the convergence point.
      let startPoint = burndownData["Start"].remaining,
          reducer = (acc, idx) => {
            let key = idx == 0 ? "Start" : "Sprint " + idx,
                value = startPoint - idx * releaseTrendDelta;
            acc[key] = value;
            return acc;
          },
          numPoints = 0,
          burndownDataLength = Object.keys(burndownData).length;
      if (addedTrendDelta > releaseTrendDelta) {
        numPoints = burndownDataLength + 3;
      } else {
        numPoints = Math.max(
          Math.ceil(startPoint / (releaseTrendDelta - addedTrendDelta)) + 1,
          burndownDataLength + 3
        );
      }
      return [...Array(numPoints).keys()].reduce(reducer, {});
    },
    makeAddedTrend = () => {
      let startPoint = -1,
          reducer = (acc, idx) => {
            let key = idx == 0 ? "Start" : "Sprint " + idx,
                value = startPoint - idx * addedTrendDelta;
            acc[key] = value;
            return acc;
          },
          numPoints = 0,
          burndownDataLength = Object.keys(burndownData).length;
      if (addedTrendDelta > releaseTrendDelta) {
        numPoints = burndownDataLength + 3;
      } else {
        numPoints = Math.max(
          Math.ceil(burndownData["Start"].remaining / (releaseTrendDelta - addedTrendDelta)) + 1,
          burndownDataLength + 3
        );
      }
      return [...Array(numPoints).keys()].reduce(reducer, {});
    };

const releaseBurndown = [
  {
    description: "Story Points",
    data: storyPoints,
    chartType: "bar"
  },
  {
    description: "Added Stories",
    data: addedPoints,
    chartType: "bar"
  },
  {
    description: "Estimated Release Trend",
    data: makeReleaseTrend(),
    chartType: "line",
    borderDash: [10, 5],
    borderColor: new RGB(150, 150, 200)
  },
  {
    description: "Adjusted Release Trend",
    data: makeAddedTrend(),
    chartType: "line",
    borderDash: [10, 5],
    borderColor: new RGB(200, 150, 150)
  }
];

export { releaseBurndown };
