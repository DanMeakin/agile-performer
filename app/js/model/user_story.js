export default class UserStory {
  /**
   * Construct a UserStory value.

   * @param {string} description - A description of the story
   * @param {integer} storyPoints - The number of story points for this story
   * @param {date} dateAdded - The date this story was added to a sprint
   * @param {date} dateDone - The date this story was complete
   */
  constructor(description, storyPoints, dateAdded, dateDone) {
    this.description = description;
    this.storyPoints = storyPoints;
    this.dateAdded = dateAdded;
    this.dateDone = dateDone;
  }
};
