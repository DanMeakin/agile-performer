export default class UserStory {
  /**
   * Construct a UserStory value.

   * @param {string} description - A description of the story
   * @param {integer} storyPoints - The number of story points for this story
   * @param {date} dateAdded - The date this story was added to a release
   * @param {date} dateDone - The date this story was complete
   * @param {boolean} isAdditional - Flag whether this story is added to a
   * release post-planning, i.e. is additional to scope
   */
  constructor(description, storyPoints, dateAdded, dateDone, isAdditional) {
    this.description = description;
    this.storyPoints = storyPoints;
    this.dateAdded = dateAdded;
    this.dateDone = dateDone;
    this.isAdditional = isAdditional;
  }
};
