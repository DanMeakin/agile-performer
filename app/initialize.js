import ReactDOM from 'react-dom';
import React from 'react';
import App from 'js/components/App';
import BarLineChart from 'js/components/BarLineChart';
import MultiBarChart from 'js/components/MultiBarChart';
import SprintChart from 'js/components/SprintChart';
import TeamSkillsChart from 'js/components/TeamSkillsChart';
import RGB from 'js/lib/rgb';

var teamSkills = [
  { description: "Team α",
    data: {
      "Architecture": 2,
      "Object-oriented Design": 5,
      "Requirements/PO": 3,
      "Testing": 7,
      "Business": 3,
      "Implementation": 4
    }
  },
  { description: "Team β",
    data: {
      "Requirements/PO": 2,
      "Object-oriented Design": 2,
      "Testing": 4,
      "Implementation": 7,
      "Business": 3
    }
  },
  { description: "Team γ",
    data: {
      "Testing": 7,
      "Implementation": 6,
      "QA": 7
    }
  }
]

var linesOfCode = [
  { description: "Source code",
    data: {
      "Sprint 1": 11000,
      "Sprint 2": 19000,
      "Sprint 3": 28000,
      "Sprint 4": 31000
    }
  },
  { description: "Test code",
    data: {
      "Sprint 1": 9000,
      "Sprint 2": 11000,
      "Sprint 3": 13000,
      "Sprint 4": 16000
    }
  }
]

var testCoverage = [
  { description: "Tested functionality",
    data: {
      "Sprint 1": 0.6,
      "Sprint 2": 0.25,
      "Sprint 3": 0.3,
      "Sprint 4": 0.4
    }
  }
]

var testCovOpts = {
  scales: {
    yAxes: [{
      ticks: {
        callback: val => (
          (val * 100).toFixed() + "%"
        ),
        suggestedMin: 0,
        suggestedMax: 1,
        beginAtZero: true
      }
    }]
  }
}

var storyPoints = [
  { description: "Commitment",
    data: {
      "Sprint 1": 350,
      "Sprint 2": 280,
      "Sprint 3": 330,
      "Sprint 4": 380
    }
  },
  { description: "Work completed",
    data: {
      "Sprint 1": 250,
      "Sprint 2": 280,
      "Sprint 3": 300,
      "Sprint 4": 350
    }
  }
]

var happinessIndex = [
  { description: "Resources",
    data: {
      "Sprint 1": 1,
      "Sprint 2": 2,
      "Sprint 3": 4,
      "Sprint 4": 2
    }
  },
  { description: "Communication",
    data: {
      "Sprint 1": 4,
      "Sprint 2": 3,
      "Sprint 3": 4,
      "Sprint 4": 5
    }
  },
  { description: "Requirements",
    data: {
      "Sprint 1": 3,
      "Sprint 2": 4,
      "Sprint 3": 4,
      "Sprint 4": 4
    }
  },
  { description: "Management",
    data: {
      "Sprint 1": 2,
      "Sprint 2": 2,
      "Sprint 3": 2,
      "Sprint 4": 3
    }
  },
  { description: "Technical",
    data: {
      "Sprint 1": 5,
      "Sprint 2": 2,
      "Sprint 3": 3,
      "Sprint 4": 3
    }
  }
]

var burndown = () => {
  let burndownData = {
        "Start":         420,
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
        "Week 4, Day 1": 170,
        "Week 4, Day 2": 140,
        "Week 4, Day 3": 130,
        "Week 4, Day 4": 85,
        "Week 4, Day 5": 30
      },
      makeBurndownTrend = (startVal, dataPoints) => {
        let delta = startVal / (Object.keys(dataPoints).length - 1);
        let trend = Object.keys(dataPoints).reduce(
          (trendLine, label, i) => {
            trendLine[label] = startVal - i * delta
            return trendLine;
          }, {}
        );
        return trend;
      };

  return [
    { description: "Remaining Effort",
      data: burndownData,
      chartType: "bar"
    },
    { description: "Ideal Burndown",
      data: makeBurndownTrend(420, burndownData),
      chartType: "line",
      isOverlay: true
    }
  ];
};

var colours = [
  new RGB(238,64,53),
  new RGB(243,119,54),
  new RGB(253,244,152),
  new RGB(123,192,67),
  new RGB(3,146,207)
];

var charts =

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <TeamSkillsChart data={teamSkills} colours={colours} title="Team Skills"/>
      <SprintChart data={linesOfCode} colours={colours} title="Lines of Code" />
      <SprintChart data={testCoverage} colours={colours} options={testCovOpts} title="Code Coverage" />
      <MultiBarChart data={storyPoints} colours={colours} title="Story Points" />
      <MultiBarChart data={happinessIndex} colours={colours} title="Happiness" />
      <BarLineChart data={burndown()} colours={colours} title="Burndown" />
    </div>,
    document.querySelector('#app')
  );
});
