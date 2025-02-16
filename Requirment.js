/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class point {
  constructor(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
  }

  validatePoint(width, height) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); // throws an error in case of width or height < 0
    }
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    startingPoint.validatePoint(width, height)
    this.startingPoint = startingPoint;
    this.width = width; 
    this.height = height; 
  }

  // ***************
  // Calculations
  // ***************

  calculateArea() {
    return this.width * this.height;
  }

  calculatePerimeter() {
    return 2 * this.width + 2 * this.height;
  }

  // ***************
  // Setters and Getters
  // ***************

  getHeight() {
    return this.height;
  }

  setHeight(height) {
    //handeling square special case
    if(this.height==this.width) {
      this.width=height;
    }

    if (height && height > 0) {
      this.height = height;
    }
  }

  getWidth() {
    return this.width;
  }

  setWidth(width) {
    //handeling square special case
    if(this.height==this.width) {
      this.height=width;
    }

    if (width && width > 0) {
      this.width = width;
    }
  }

// ***************
// Misc
// ***************

  updateParameters({ startingPoint, width, height }) {
    startingPoint.validatePoint(width, height)
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  printEndPoints() {
    const topRight = this.startingPoint.coordX + this.width;
    const bottomLeft = this.startingPoint.coordY + this.height;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }
}

function constructRectangle(x, y, width, height) {
  const mainPoint = new point(x, y);
  const rectangle = new Rectangle(mainPoint, width, height);
  return rectangle;
}

function constructSquare(x, y, height) {
  let square;
  if (!height || height <= 0) {
    square = constructRectangle(x, y, height, height);
  }
  const area = square.calculateArea();
  const perimeter = square.calculatePerimeter();
  console.log("square Area ", area);
  console.log("square Perimeter ", perimeter);
}

const myRectangle = constructRectangle(2, 3, 5, 4);
const mySquare = constructSquare();

console.log(mySquare.calculatePerimeter());

mySquare.printEndPoints();

myRectangle.setHeight(3);
