import ReactDOM from 'react-dom';
import React from 'react';
import App from 'components/App';
import MultiBarChart from 'components/MultiBarChart';
import SprintChart from 'components/SprintChart';
import TeamSkillsChart from 'components/TeamSkillsChart';
import RGB from 'lib/rgb';

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
      "Sprint 1": 60,
      "Sprint 2": 25,
      "Sprint 3": 30,
      "Sprint 4": 40
    }
  }
]

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

var colours = [
  new RGB(99, 152, 255),
  new RGB(99, 255, 139),
  new RGB(255, 213, 133)
];

var charts =

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <TeamSkillsChart data={teamSkills} colours={colours} title="Team Skills"/>
      <SprintChart data={linesOfCode} colours={colours} title="Lines of Code" />
      <SprintChart data={testCoverage} colours={colours} title="Code Coverage" />
      <MultiBarChart data={storyPoints} colours={colours} title="Story Points" />
      <MultiBarChart data={happinessIndex} title="Happiness" />
    </div>,
    document.querySelector('#app')
  );
});
