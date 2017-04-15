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
      heading: "Codebase",
      metrics: [
        {
          type: "LINES_OF_CODE",
          name: "Lines of Code"
        }
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
        {
          type: "CUSTOMER_SATISFACTION",
          name: "Customer Satisfaction"
        }
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
        },
        {
          type: "VELOCITY",
          name: "Velocity"
        },
        {
          type: "VELOCITY_TREND",
          name: "Velocity Trend"
        },
        {
          type: "STORY_POINT_EFFORT",
          name: "Story Point Effort"
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
          },
          {
            type: "TEAM_SKILLS",
            name: "Skills"
          },
          {
            type: "COMMITMENT_LEVEL",
            name: "Commitment Level"
          },
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
