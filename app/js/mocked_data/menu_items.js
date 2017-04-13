const menuItems = [
    {
        heading: "Statistics",
        metrics: [
            {
                type: "CODE_COVERAGE",
                name: "Code Coverage"
            } ,
            {
                type: "CODE_OWNERSHIP_PROJECT",
                name: "Code Ownership (Project)"
            },
            {
                type: "CODE_OWNERSHIP_TEAM",
                name: "Code Ownership (Team)"
            },
            {
                type: "LINES_OF_CODE",
                name: "Lines of Code"
            },
            {
                type: "TEST_CASES_COUNT",
                name: "Number of Test Cases"
            },
            {
                type: "REMEDIAL_FOCUS",
                name: "Remedial Focus"
            },
            {
                type: "TEAM_SATISFACTION",
                name: "Team Satisfaction"
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
                type: "HAPPINESS_INDEX",
                name: "Happiness Index"
            },
            {
                type: "ENHANCED_RELEASE_BURNDOWN",
                name: "Enhanced Release Burndown"
            },
            {
                type: "SPRINT_BURNDOWN",
                name: "Sprint Burndown"
            },
            {
                type: "SPRINT_INTERFERENCE",
                name: "Sprint Interference"
            },
            {
                type: "LEAD_TIME",
                name: "Lead Time"
            },
        ]
    },
    {
        heading: "Profile",
        metrics: [
            {
                type: "SCRUM_PRACTICES",
                name: "Scrum Practices"
            } ,
            {
                type: "XP_PRACTICES",
                name: "XP Practices"
            },
            {
                type: "TEAM_SKILLS",
                name: "Team Skills"
            }
        ]
    }
];

const filterMenuItems = (term) => (
  menuItems.map(({ heading, metrics }) => (
    { heading,
      metrics: metrics.filter(({ name }) => (
        name.toLowerCase().includes(term.toLowerCase())
      ))
    }
  ))
);

export { menuItems, filterMenuItems };
