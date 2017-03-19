import ReactDOM from 'react-dom';
import React from 'react';
import App from 'components/App';
import TeamSkillsChart from 'components/TeamSkillsChart';

var chartData = {
  labels: ["Architecture", "Object-oriented Design", "Requirements/PO", "Testing", "Business", "Implementation"],
    datasets: [
        {
          label: "Team Α",
          values: [2, 5, 3, 7, 3, 4]
        },
        {
          label: "Team Γ",
          values: [1, 2, 2, 4, 2, 7]
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<TeamSkillsChart data={chartData.datasets} labels={chartData.labels}/>, document.querySelector('#app'));
});
