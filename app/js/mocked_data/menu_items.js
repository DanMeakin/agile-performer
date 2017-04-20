const menuItems = {
  filterTerm: "",
  items: [
    {
      heading: "Agility",
      metrics: [
        {
          type: "CODE_OWNERSHIP_PROJECT",
          name: "Code Ownership (Project)"
        },
        {
          type: "CODE_OWNERSHIP_TEAM",
          name: "Code Ownership (Team)"
        },
        {
          type: "SCRUM_PRACTICES",
          name: "Scrum Practices"
        },
        {
          type: "SPRINT_INTERFERENCE",
          name: "Sprint Interference"
        },
        {
          type: "XP_PRACTICES",
          name: "XP Practices"
        },
      ]
    },
    {
      heading: "Quality Assurance",
      metrics: [
        {
          type: "DEFECTS_OVER_TIME",
          name: "Defects Over Time"
        },
        {
          type: "REMEDIAL_FOCUS",
          name: "Remedial Focus"
        },
      ]
    },
    {
      heading: "Performance",
      metrics: [
        {
          type: "ENHANCED_RELEASE_BURNDOWN",
          name: "Enhanced Release Burndown"
        },
        {
          type: "LEAD_TIME",
          name: "Lead Time"
        },
        {
          type: "SPRINT_BURNDOWN",
          name: "Sprint Burndown"
        }
      ]
    },
    {
        heading: "Team Profile",
        metrics: [
          {
            type: "HAPPINESS_INDEX",
            name: "Happiness Index"
          },
          {
            type: "TEAM_SATISFACTION",
            name: "Satisfaction"
          }
        ]
    },
    {
      heading: "Testing",
      metrics: [
        {
          type: "CODE_COVERAGE",
          name: "Code Coverage"
        },
        {
          type: "TEST_CASES_COUNT",
          name: "Number of Test Cases"
        }
      ]
    },
    {
      heading: "Velocity",
      metrics: [
        {
          type: "SPRINT_CADENCE",
          name: "Sprint Cadence"
        },
        {
          type: "VELOCITY",
          name: "Velocity"
        },
        {
          type: "VELOCITY_TREND",
          name: "Velocity Trend"
        },
      ]
    }
  ]
};

const filterMenuItems = (term) => (
  { filterTerm: term,
    items: menuItems.items.map(({ heading, metrics }) => (
      { heading,
        metrics: metrics.filter(({ name }) => (
          name.toLowerCase().includes(term.toLowerCase())
        ))
      }
    )).filter(({ metrics }) => (
      metrics.length > 0
    ))
  }
);

export { menuItems, filterMenuItems };
