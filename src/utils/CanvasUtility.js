import FileUtility from './FileUtility';

class CanvasUtility {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.array = this.createCanvasArray(width, height);
    this.canvasParts = [];
  }

  createCanvasArray(width, height) {
    const array = [];
    for (let row = 0; row < height; row++) {
      array[row] = [];
      for (let column = 0; column < width; column++) {
        array[row][column] = ' ';
      }
    }
    return array;
  }

  convertToString = () => {
    this.stringView = '-'.repeat(this.width + 2);
    this.stringView += '\n';
    for (let row = 0; row < this.height; row++) {
      this.stringView += '|';
      for (let column = 0; column < this.width; column++) {
        this.stringView += this.array[row][column];
      }
      this.stringView += '|';
      this.stringView += '\n';
    }
    this.stringView += '-'.repeat(this.width + 2);
    this.canvasParts.push(this.stringView + '\n');
  };

  drawLine = (x1, y1, x2, y2) => {

    if ((x1 > this.width || y1 > this.height) ||
      (x2 > this.width || y2 > this.height)) {
      throw new Error('Draw line out of paint zone!');
    }

    if (y1 === y2) {
      const row = this.array[y1 - 1];

      const min = x2 > x1 ? x1 : x2;
      const max = x2 > x1 ? x2 : x1;
      for (let i = min; i <= max; i++) {
        row[i - 1] = 'x';
      }
    } else if (x1 === x2) {
      const min = y2 > y1 ? y1 : y2;
      const max = y2 > y1 ? y2 : y1;
      for (let i = min; i <= max; i++) {
        const row = this.array[i - 1];
        row[x1 - 1] = 'x';
      }

    }

  };

  drawRectangle = (x1, y1, x2, y2) => {
      this.drawLine(x1, y1, x2, y1);
      this.drawLine(x2, y1, x2, y2);
      this.drawLine(x2, y2, x1, y2);
      this.drawLine(x1, y2, x1, y1);
  };

  fillArea = (x, y, bucketColor) => {
    if (x > this.width || y > this.height)
      throw new Error('Bucket fill out of paint zone!');

    const canvas = this.array;

    const startPoint = { x, y };
    const stack = [];
    stack.push(startPoint);

    while (stack.length) {
      const { x, y } = stack.pop();
      if (!(x > this.width || y > this.height || y <= 0 || x <= 0)) {

        const row = canvas[y - 1];
        if (row[x - 1] === ' ') {
          row[x - 1] = bucketColor;
          stack.push({ x: x + 1, y: y });
          stack.push({ x: x - 1, y: y });
          stack.push({ x: x, y: y + 1 });
          stack.push({ x: x, y: y - 1 });
        }

      }
    }
  };

  static handleCanvasCreation = (parsedParams) => {
    try {
      
      Object.keys(parsedParams).forEach(commandName => {
  
        if (parsedParams[commandName].length > 1) {
          const length = parsedParams[commandName].length;
          let i = 0;
          while (length !== i) {
            setAction(commandName, parsedParams[commandName][i], canvas);
            i++;
          }
        } else {
          setAction(commandName, parsedParams[commandName][0], canvas);
        }
      });
      const finalCanvas = canvas.canvasParts.join('');
      return [FileUtility.createOutputFile(finalCanvas), canvas.stringView, null];
    } catch (err) {
      return [null, null, new Error('Incorrect input commands.Please, try another commands!').message];
    }
  }

}

const canvasActions = {
  createCanvas: 'C',
  drawLine: 'L',
  drawRectangle: 'R',
  fillArea: 'B',
};

let canvas;

export const setAction = (action, state) => {
  const { x1, y1, x2, y2, width, height, color } = state;

  switch (action) {
    case canvasActions.createCanvas:
      canvas = new CanvasUtility(width, height);
      break;
    case canvasActions.drawLine:
      canvas.drawLine(x1, y1, x2, y2);
      break;
    case canvasActions.drawRectangle:
      canvas.drawLine(x1, y1, x2, y1);
      canvas.drawLine(x2, y1, x2, y2);
      canvas.drawLine(x2, y2, x1, y2);
      canvas.drawLine(x1, y2, x1, y1);
      break;
    case canvasActions.fillArea:
      canvas.fillArea(x1, y1, color);
      break;
    default:
      console.log('Can`t find any canvas actions...');
      break;
  }

  canvas.convertToString();
}

export default CanvasUtility;