const teamSatisfaction = {
  chart: [
    {
      description: "Resources",
      data: {
        "Sprint 1": 1,
        "Sprint 2": 2,
        "Sprint 3": 4,
        "Sprint 4": 2
      }
    },
    {
      description: "Communication",
      data: {
        "Sprint 1": 4,
        "Sprint 2": 3,
        "Sprint 3": 4,
        "Sprint 4": 5
      }
    },
    {
      description: "Requirements",
      data: {
        "Sprint 1": 3,
        "Sprint 2": 4,
        "Sprint 3": 4,
        "Sprint 4": 4
      }
    },
    {
      description: "Management",
      data: {
        "Sprint 1": 2,
        "Sprint 2": 2,
        "Sprint 3": 2,
        "Sprint 4": 3
      }
    },
    {
      description: "Technical",
      data: {
        "Sprint 1": 5,
        "Sprint 2": 2,
        "Sprint 3": 3,
        "Sprint 4": 3
      }
    }
  ],
  description: {
    leadText: "Sprint Burndown illustrates task/story completion over the course of a Sprint.",
    breadText: "The Remaining Effort trendline/bars shows how many points are remaining at a given point in time during the sprint. This chart illustrates an incomplete Sprint, with Week 4 remaining incomplete."
  }
};

export {teamSatisfaction};
