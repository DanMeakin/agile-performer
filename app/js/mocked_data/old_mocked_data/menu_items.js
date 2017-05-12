import React from 'react';
import {
  TeamSatisfactionMetric,
  VelocityBarMetric,
  VelocityLineMetric,
  HappinessIndexMetric,
  EnhancedReleaseBurndownMetric,
  SprintBurndownBarMetric,
  SprintBurndownLineMetric,
  ScrumPracticesMetric,
  XpPracticesMetric,
  ProjectCodeOwnershipMetric,
  TeamCodeOwnershipMetric,
  RemedialFocusMetric,
  SprintInterferenceMetric,
  DefectsOverTimeMetric,
} from '../../components/metrics';
<<<<<<< HEAD
import { SprintBurndown, Velocity, Happiness, Satisfaction } from '../../components/dashboards/product_tracking';
import { 
  SprintBurndownTrend,
  ScrumPractices,
  XpPractices, 
  OtherPractices, 
  SprintInterference 
} from '../../components/dashboards/agile_maturity';
=======
import { SprintBurndown, Velocity, Happiness, Satisfaction, ReleaseBurnup } from '../../components/dashboards/product_tracking';
import { ScrumPractices,XpPractices, OtherPractices, SprintInterference } from '../../components/dashboards/agile_maturity';
>>>>>>> 62b46ff8e49ec488bdd87b6d6d944f447c62be7d

const menuItems = {
  filterTerm: "",
  items: [
    {
      heading: "AGILE MATURITY",
      metrics: [
        {
          type: ScrumPractices,
          name: "Scrum"
        },
        {
          type: XpPractices,
          name: "Extreme Programming"
        },
        {
          type: OtherPractices,
          name: "Other Practices"
        },
        {
          type: SprintInterference,
          name: "Sprint Interference"
        },
        {
          type: SprintBurndownTrend,
          name: "Burndown Trend"
        }
      ]
    },
    {
      heading: "PRODUCT TRACKING DASHBOARD",
      metrics: [
        {
          type: ReleaseBurnup,
          name: "Release Burnup"
        },
        {
          type: Velocity,
          name: "Velocity"
        },
        {
          type: SprintBurndown,
          name: "Sprint Burndown"
        },
        {
          type: Happiness,
          name: "Happiness"
        },
        {
          type: Satisfaction,
          name: "Satisfaction"
        }
      ]
    },
    {
      heading: "Agility",
      metrics: [
        {
          type: ProjectCodeOwnershipMetric,
          name: "Code Ownership (Project)"
        },
        {
          type: TeamCodeOwnershipMetric,
          name: "Code Ownership (Team)"
        },
        {
          type: ScrumPracticesMetric,
          name: "Scrum Practices"
        },
        {
          type: SprintInterferenceMetric,
          name: "Sprint Interference"
        },
        {
          type: XpPracticesMetric,
          name: "XP Practices"
        },
      ]
    },
    {
      heading: "Quality Assurance",
      metrics: [
        {
          type: DefectsOverTimeMetric,
          name: "Defects Over Time"
        },
        {
          type: RemedialFocusMetric,
          name: "Remedial Focus"
        },
      ]
    },
    {
      heading: "Performance",
      metrics: [
        {
          type: EnhancedReleaseBurndownMetric,
          name: "Enhanced Release Burndown"
        },
        {
          type: SprintBurndownBarMetric,
          name: "Sprint Burndown A"
        },
        {
          type: SprintBurndownLineMetric,
          name: "Sprint Burndown B"
        },
        {
          type: VelocityBarMetric,
          name: "Velocity A"
        },
        {
          type: VelocityLineMetric,
          name: "Velocity B"
        }
      ]
    },
    {
        heading: "Team Profile",
        metrics: [
          {
            type: HappinessIndexMetric,
            name: "Happiness Index"
          },
          {
            type: TeamSatisfactionMetric,
            name: "Satisfaction"
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
