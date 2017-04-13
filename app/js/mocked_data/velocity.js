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
  let newData = Object.keys(data).reduce((acc, k) => {
    acc[k] = data[k].total;
    return acc;
  }, {});
});

export { velocity, detailedVelocity };
