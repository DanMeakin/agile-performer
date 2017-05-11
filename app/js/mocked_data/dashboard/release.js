/**
 * @fileOverview Contains mocked sprints data for use within the dashboard
 * prototype. Five sprints for each of six teams are mocked. The sprints are
 * then combined into a mocked release.
 */

import {
  teams,
  startingDates
} from './teams';
import userStories from './user_stories';

import {
  addDays
} from '../../lib/dates';
import Sprint from '../../model/sprint';
import Release from '../../model/release';

let createSprints = (teamName => [...Array(5).keys()].map(sprintNumber => {
    let startDate = addDays(startingDates[teamName], sprintNumber * 21),
      endDate = addDays(startDate, 12),
      team = teams[teamName],
      stories = userStories[teamName][sprintNumber];
    return new Sprint(team, sprintNumber + 1, stories, startDate, endDate);
  })),
  sprints = Object.keys(teams).map(createSprints),
  release = new Release(userStories.unassigned, new Date("2017-05-26"));

release.sprints = sprints;

export {
  sprints,
  release
};
