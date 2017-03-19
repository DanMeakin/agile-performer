export default class RGB {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  toRGBA(opacity) {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${opacity || 1})`;
  }
}
