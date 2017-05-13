const defaultSprintCount = 4; // Number of sprints to take for overview purposes

class Overview {
  constructor(release, sprintCount = defaultSprintCount) {
    this.release = release;
    this.sprintCount = sprintCount;
  }

  relevantSprints(teamName) {
    return this.release.sprintsForTeam(teamName).slice(-1 * this.sprintCount);
  }

  velocityVariances(teamName) {
    let storyPoints = this.relevantSprints(teamName).map(sprint => sprint.completedStoryPoints()),
        variances = storyPoints.reduce((allVariances, points, idx) => {
          if (idx == 0) {
            return [];
          } else {
            let previousPoints = storyPoints[idx - 1],
                percentageVariance = Math.abs(points - previousPoints) / previousPoints;
            allVariances.push(percentageVariance);
            return allVariances;
          }
        }, []);
    return variances;
  }

  averageVelocityVariance(teamName) {
    let totalVariances = this.velocityVariances(teamName).reduce((sum, variance) => sum + variance, 0),
        numVariances = this.velocityVariances(teamName).length;
    return totalVariances / numVariances;
  }

  deliveryVariances(teamName) {
    let variances = this.relevantSprints(teamName).map(sprint => (
      Math.abs(sprint.completedStoryPoints() - sprint.committedStoryPoints()) / sprint.committedStoryPoints()
    ));
    return variances;
  }

  averageDeliveryVariance(teamName) {
    let totalVariances = this.deliveryVariances(teamName).reduce((sum, variance) => sum + variance, 0),
        numVariances = this.deliveryVariances(teamName).length;
    return totalVariances / numVariances;
  }

  makeIndicator(value) {
    if (value <= 0.05) {
      return "GREEN";
    } else if (value <= 0.1) {
      return "YELLOW";
    } else {
      return "RED";
    }
  }

  velocityIndicator(teamName) {
    return this.makeIndicator(this.averageVelocityVariance(teamName));
  }

  deliveryIndicator(teamName) {
    return this.makeIndicator(this.averageDeliveryVariance(teamName));
  }
}

export default Overview;
