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
import Velocity from '../../components/dashboards/product_tracking/Velocity';

/*
   Opinion on the best ten metrics:-

   Enhanced release burndown (it's pretty new, interesting)
   Velocity (traditional, but needed; maybe rework as line chart with clearer variances?)
   Sprint Burndown (traditional, but needed, though should be line chart)
   Code Ownership - both in same vis (it's pretty new too, and interesting)
   Scrum / XP Practices - both in same vis (it's pretty interesting tho maybe difficult)
   Sprint Interference
   Remedial Focus
   Team Satisfaction (useful, different perspective, important as it's about people)
   Happiness index (not too sure how different from the above?)
   Defects over time (least favourite of the 10, but probably useful)

   ---

   Agreed upon metrics:

   Code Ownership - A - CM
   Practices (both) - M - Retro
   Defects over time - A - Jira
   Remedial Focus - A - Jira (?)
   Enh. Rel. Burndown - M/A - Jira (?)
   Sprint Burndown - A - Jira
   Happiness index - M - Weekly
   Satisfaction - M - Retro
   Velocity A/B - A - Jira
   Sprint Interference - M - Retro

 */
const menuItems = {
  filterTerm: "",
  items: [
    {
      heading: "NEW",
      metrics: [
        {
          type: Velocity,
          name: "Velocity (Product Tracking)"
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
