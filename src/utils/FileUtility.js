import CanvasUtility from './CanvasUtility';

const processInputFile = async (inputFile) => {
  try {
    if (inputFile.type === 'text/plain') {

      const fileData = await readFileAsync(inputFile);
      if (!fileData) throw new Error('File doesn`t contains any data!');
      const commands = parseInputParams(fileData);

      if (commands.error) throw new Error(commands.error);

      return [...CanvasUtility.handleCanvasCreation(commands)];
    }
    else {
      throw new Error('Cant read input file, type doesn`t match "text/plain"!');
    }
  } catch (err) {
    return [null, null, err.message];
  }

};

const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject('Error with reading txt file!');
    };

    reader.readAsText(file);
  });
}

const parseInputParams = (textCommands) => {

  const text = textCommands.split('\n');

  const divideCommandsByLine = textCommands
    .split('\n')
    .filter(line => {
      return line.length >= 6
    });

  if (divideCommandsByLine[0][0] !== 'C')
    return { error: 'Command to create canvas not exist!' };

  if (text.length !== divideCommandsByLine.length) {
    return { error: 'Not enought arguments to create canvas!' };
  }

  const commands = {};
  divideCommandsByLine.forEach(command => {
    const commandType = command[0];
    const args = command.slice(2)
      .split(' ')
      .map(value => Number.isNaN(Number(value)) ? value : Number(value));
    
    let width, height, x1, y1, x2, y2, color;

    if (args.length === 2) [width, height] = args;
    else if (args.length === 3) [x1, y1, color] = args;
    else if (args.length === 4) [x1, y1, x2, y2] = args;

    if (!commands[commandType]) {
      commands[commandType] = [];
      if (args.length === 2) commands[commandType].push({ width, height });
      if (args.length === 4) commands[commandType].push({ x1, y1, x2, y2 });
      if (args.length === 3) commands[commandType].push({ x1, y1, color });

    } else {
      if (args.length === 2) commands[commandType].push({ width, height });
      if (args.length === 4) commands[commandType].push({ x1, y1, x2, y2 });
      if (args.length === 3) commands[commandType].push({ x1, y1, color });
    }
  })

  return commands;

};

const createOutputFile = (canvas) => {
  const blob = new Blob([canvas], { type: 'text/plain' });
  return URL.createObjectURL(blob);
}

export default {
  createOutputFile,
  processInputFile
};
