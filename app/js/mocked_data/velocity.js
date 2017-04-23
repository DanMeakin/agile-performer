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
] 

class VelocityData {
  constructor(userStoryPoints, bugFixPoints) {
    this.userStoryPoints = userStoryPoints;
    this.bugFixPoints = bugFixPoints || 0;
  }

  get total() {
    return this.userStoryPoints + this.bugFixPoints;
  }
}

const detailedVelocity = [
  {
    description: "Commitment",
    data: {
      "Sprint 1": new VelocityData(350),
      "Sprint 2": new VelocityData(250, 30),
      "Sprint 3": new VelocityData(280, 50),
      "Sprint 4": new VelocityData(370, 10)
    }
  },
  {
    description: "Work Completed",
    data: {
      "Sprint 1": new VelocityData(250),
      "Sprint 2": new VelocityData(250, 30),
      "Sprint 3": new VelocityData(230, 50),
      "Sprint 4": new VelocityData(340, 10)
    }
  }
];

const velocity = detailedVelocity.map(({ description, data }) => {
  return Object.keys(data).reduce((acc, k) => {
    acc.data[k] = data[k].total;
    return acc;
  }, {
    data: {},
    description
  });
});

let remedialChartData = () => {
    let commitment = detailedVelocity.find(entry => {
      return entry.description == "Commitment";
    });
    return [
      { description: "Bug Fixing",
        stack: "remedialFocus",
        data: Object.keys(commitment.data).reduce((acc, k) => {
          acc[k] = commitment.data[k].bugFixPoints;
          return acc;
        }, {})
      },
      { description: "User Stories",
        stack: "remedialFocus",
        data: Object.keys(commitment.data).reduce((acc, k) => {
          acc[k] = commitment.data[k].userStoryPoints;
          return acc;
        }, {})
      }
    ];
  }

const remedialFocus = {
  chart: remedialChartData(),
  description: {
    leadText: "Remedial focus provides insight into the amount of time spend on remidial tasks during a sprint",
    breadText: "The chart displays how many story points where allocated on user stories and bug fixing during each sprint"
  }
}

export { storyPointEffort, velocity, detailedVelocity, remedialFocus };

