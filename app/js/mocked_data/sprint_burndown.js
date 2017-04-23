let burndownData = {
  "Start": 420,
  "Week 1, Day 1": 410,
  "Week 1, Day 2": 400,
  "Week 1, Day 3": 360,
  "Week 1, Day 4": 320,
  "Week 1, Day 5": 310,
  "Week 2, Day 1": 290,
  "Week 2, Day 2": 285,
  "Week 2, Day 3": 260,
  "Week 2, Day 4": 250,
  "Week 2, Day 5": 230,
  "Week 3, Day 1": 220,
  "Week 3, Day 2": 215,
  "Week 3, Day 3": 210,
  "Week 3, Day 4": 210,
  "Week 3, Day 5": 200,
  "Week 4, Day 1": null,
  "Week 4, Day 2": null,
  "Week 4, Day 3": null,
  "Week 4, Day 4": null,
  "Week 4, Day 5": null
},
  makeBurndownTrend = (startVal, dataPoints) => {
    let delta = startVal / (Object.keys(dataPoints).length - 1);
    let trend = Object.keys(dataPoints).reduce(
      (trendLine, label, i) => {
        trendLine[label] = startVal - i * delta;
        console.log("Burndown label", label);
        return trendLine;
      }, {}
    );
    return trend;
  };

const sprintBurndown = {
  chart: [
    {
      description: "Ideal Burndown",
      data: makeBurndownTrend(420, burndownData),
      chartType: "line",
      borderDash: [10, 5]
    },
    {
      description: "Remaining Effort",
      data: burndownData
    }
  ],
  description: {
    leadText: "Sprint Burndown illustrates task/story completion over the course of a Sprint.",
    breadText: "The Remaining Effort trendline/bars shows how many points are remaining at a given point in time during the sprint. This chart illustrates an incomplete Sprint, with Week 4 remaining incomplete."
  }
};


export { sprintBurndown };
