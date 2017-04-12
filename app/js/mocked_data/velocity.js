let storyPointData = {
  "Task 1": {
    estimated: 2,
    time: 3
  },
  "Task 2": {
    estimated: 1,
    time: 0.5
  },
  "Task 3": {
    estimated: 1,
    time: 1
  },
  "Task 4": {
    estimated: 3,
    time: 2
  },
  "Task 5": {
    estimated: 5,
    time: 7
  },
  "Task 6": {
    estimated: 2,
    time: 2
  },
  "Task 7": {
    estimated: 3,
    time: 3
  },
  "Task 8": {
    estimated: 2,
    time: 5
  },
  "Task 9": {
    estimated: 1,
    time: 2
  },
},
  calcStoryPointEffort = (dataPoints) => {
    //create array of values for each unique story point
    let storyPointVals = Object.values(storyPointData).reduce((acc, val) => {
      if (val.estimated in acc) {
        acc[val.estimated] += val.time;
      } else {
        acc[val.estimated] = val.time;
      }
      return acc;
    }, {});

    //create array of storypoint lengths
    let storyPointLenghts = Object.values(storyPointData).reduce((acc, val) => {
      if (val.estimated in acc) {
        acc[val.estimated]++;
      } else {
        acc[val.estimated] = 1;
      }
      return acc;
    }, {});

    //get average amount of time spent for each unique story point
    let storyPointEffort = Object.keys(storyPointVals).reduce((acc, key) => {
      acc[key] = storyPointVals[key] / storyPointLenghts[key]
      return acc;
    }, {})

    return storyPointEffort;
  }

//Data containing an object with 'story point': 'avg completion time'
const storyPointEffort = [
  {
    description: "Story Point Effort",
    data: calcStoryPointEffort()
  }
], 
velocity = [
  {
    description: "Commitment",
    data: {
      "Sprint 1": 350,
      "Sprint 2": 280,
      "Sprint 3": 330,
      "Sprint 4": 380
    }
  },
  {
    description: "Work Completed",
    data: {
      "Sprint 1": 250,
      "Sprint 2": 280,
      "Sprint 3": 300,
      "Sprint 4": 350
    }
  }
]

export { storyPointEffort, velocity };
