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

  /**
   * Generate a set of velocity data for use in a velocity chart.
   *
   * @param {String} teamName - the name of the team whose velocity to collect
   * @returns {Array[Object]} - velocity data for use within a Velocity chart
   */
  velocityData(teamName) {
    let teamSprints = this.sprints.filter(sprint =>
        sprint.team.name == teamName
      ),
      commitment = teamSprints.reduce((commitmentData, sprint) => {
        commitmentData["Sprint " + sprint.number] = sprint.committedStoryPoints();
        return commitmentData;
      }, {}),
      completed = teamSprints.reduce((completionData, sprint) => {
        completionData["Sprint " + sprint.number] = sprint.completedStoryPoints();
        return completionData;
      }, {}),
      data = [{
          description: "Commitment",
          data: commitment
        },
        {
          description: "Work Completed",
          data: completed
        }
      ];
    return data;
  }
};
