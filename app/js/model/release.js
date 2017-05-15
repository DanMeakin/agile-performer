import { shortDate, veryShortDate } from '../lib/dates';

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

  /**
   * Return a list of all teams involved in this release.
   *
   * @returns {Array[Team]} - a list of all teams participating in this release
   */
  teams() {
    return this.sprints.reduce((allTeams, sprint) => {
      let team = sprint.team;
      if (allTeams.indexOf(team) == -1) {
        allTeams.push(team);
      }
      return allTeams;
    }, []);
  }

  defectsOverTime() {
    let combineDefectData = (dataset1, dataset2) => {
      let newDataset = Object.assign({}, dataset1);
      return Object.keys(dataset2).reduce((combinedDataset, dateKey) => {
        combinedDataset[dateKey] = (combinedDataset[dateKey] || 0) + dataset2[dateKey];
        return combinedDataset;
      }, newDataset);
    };
    return this.teams().reduce((defectsData, team) => {
      let teamDefectsData = team.defectsOverTimeData();
      if (defectsData.length == 0) {
        return teamDefectsData;
      } else {
        return defectsData.map(({ description, data }, idx) => {
          console.log("This data", data);
          return {
            description,
            data: combineDefectData(data, teamDefectsData[idx].data)
          };
        });
      }
    }, []);
  }


  /**
   * Return the start date of this release.
   *
   * The start date is the date the first sprint commences.
   *
   * @returns {Date} - the start date for this release
   */
  startDate() {
    // Shortcut - assume it is the first sprint added
    return this.sprints[0].startDate();
  }

  /**
   * Return the end date of this release.
   *
   * The end date is later of the release date, and the end date of the final
   * sprint for this release.
   *
   * @returns {Date} - the end date for this release 
   */
  endDate() {
    // Shortcut - assume the last sprint is the one with the latest end date
    return new Date(Math.max(this.plannedDate, this.finalSprintEndDate()));
  }

  /**
   * Return the end date of the latest sprint in this release, or today if this
   * date is in the future.
   * 
   * @returns {Date} - the end date for the latest sprint this release 
   */
  finalSprintEndDate() {
    return new Date(Math.min(this.sprints[this.sprints.length - 1].endDate(), Date.now()));
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
        sprintLabel = (sprint) => (
          [
            "Sprint ",
            sprint.number,
            " (",
            veryShortDate(sprint.startDate()),
            " - ",
            veryShortDate(sprint.endDate()),
            ")"
          ].join("")
        ),
      commitment = teamSprints.reduce((commitmentData, sprint) => {
        commitmentData[sprintLabel(sprint)] = sprint.committedStoryPoints();
        return commitmentData;
      }, {}),
      completed = teamSprints.reduce((completionData, sprint) => {
        completionData[sprintLabel(sprint)] = sprint.completedStoryPoints();
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
      console.log("Velocity", data);
    return data;
  }

  /**
   * Generate a set of velocity trend data for use in a velocity chart.
   *
   * @param {String} teamName - the name of the team whose velocity to collect
   * @returns {Array[Object]} - velocity data for use within a Velocity chart
   */
  velocityTrendData(teamName) {
    let teamSprints = this.sprintsForTeam(teamName),
      commitment = teamSprints.reduce((commitmentData, sprint) => {
        commitmentData["Sprint " + sprint.number] = sprint.committedStoryPoints();
        return commitmentData;
      }, {}),
      completed = teamSprints.reduce((completionData, sprint) => {
        completionData["Sprint " + sprint.number] = sprint.completedStoryPoints();
        return completionData;
      }, {}),
      completionRate = this.calcCompletionRate(teamSprints),
      averageVelocity = this.calcAverageVelocity(teamSprints),
      data = [
        {
          description: "Work Completed",
          data: completed
        },
        {
          description: "Commitment",
          data: commitment
        },
        {
          description: "Completion Rate",
          data: completionRate
        },
        {
          description: "Average Velocity",
          data: averageVelocity
        },
      ];
      console.log("Velocity", data);
    return data;
  }

  calcAverageVelocity(sprints){
    let total = sprints.reduce((points, sprint)=>{
      return points + sprint.completedStoryPoints();
    }, 0),
    data = sprints.reduce((averagePoints, sprint) => {
      averagePoints["Sprint " + sprint.number] = total / sprints.length;
      return averagePoints
    }, {})
        console.log("Velocity", data);
        console.log("Velocity", total);
    return data;
  }

/**
 * Calcs the completion rate for a list of sprints 
 * 
 * @param {Array[Sprint]} sprints - sprints for which you want to calc the completion rate
 * @returns {Object}
 */
  calcCompletionRate(sprints){
    let data = sprints.reduce((completionRateData, sprint) => {
      let completionRate = sprint.completedStoryPoints() / sprint.committedStoryPoints();
      let completionPercentage = completionRate * 100 
      completionRateData["Sprint " + sprint.number] =  completionPercentage;
      return completionRateData
    }, {})
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

  /**
   * Generate burndown trend data for all sprints for a given team.
   *
   * @param {String} teamName - the name of the team whose burndown trend to collect
   * @returns {Array[Object]} - burndown trend data for use within a linechart
   */
   burndownData(teamName) {
      let sprints = this.sprintsForTeam(teamName),
      data = sprints.map((sprint) =>{
        let burndown = sprint.burndown().reduce((dataPoint, points, idx) => {
          dataPoint[idx] = points;
          return dataPoint;
        }, {});
        return {
          description: "Sprint " + sprint.number, 
          data: burndown
        };
      });
      return data;
   }

};
