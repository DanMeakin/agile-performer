/**
 * Define one release within a development.

 * @param {Array[UserStory]} userStories - The stories comprising a release
 * @param {Date} plannedDate - The planned release date
 */
export default class Release {
  constructor(userStories, plannedDate) {
    this.userStories = userStories;
    this.plannedDate = plannedDate;
    this.sprints = [];
  }

  planSprint(team, startDate, endDate, stories) {
    let sprintNum = 1,
        sprint = new Sprint(team, sprintNum, stories, startDate, endDate);
    this.sprints.push(sprint);
  }
};
