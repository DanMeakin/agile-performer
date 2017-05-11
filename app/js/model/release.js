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
   * Select all sprints for a given team.
   *
   * @param {String} teamName - the name of the team whose sprints to select
   * @returns {Array[Object]} - sprints for the given team
   */
  sprintsForTeam(teamName) {
    return this.sprints.filter(sprint => sprint.team.name == teamName);
  }

  /**
   * Generate a set of velocity data for use in a velocity chart.
   *
   * @param {String} teamName - the name of the team whose velocity to collect
   * @returns {Array[Object]} - velocity data for use within a Velocity chart
   */
  velocityData(teamName) {
    let teamSprints = this.sprintsForTeam(teamName),
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


  /**
   * Calculate the maximum value to use as upper bounds for velocity and
   * burndown charts. The max value is rounded to the nearest 20.
   *
   * @returns {Integer} - the maximum points committed or completed in any
   * sprint within this release
   */
  maximumPoints() {
    let rawMax = this.sprints.reduce((currentMax, thisSprint) => (
      Math.max(
        thisSprint.committedStoryPoints(),
        thisSprint.completedStoryPoints(),
        currentMax
      )
    ), 0);
    return Math.ceil(rawMax / 20) * 20;
  }
};
