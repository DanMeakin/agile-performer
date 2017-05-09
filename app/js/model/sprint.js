import { makePeriod } from '../lib/dates';

export default class Sprint {
  constructor(team, number, startDate, endDate) {
    this.team = team;
    this.number = number;
    this.period = makePeriod(startDate, endDate);
  }
}
