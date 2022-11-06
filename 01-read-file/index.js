const fs = require('fs');
const readline = require('readline');
const path = require('path');

const directories = path.dirname('01-read-file/text.txt');

const readInterface = readline.createInterface({ 
  input: fs.createReadStream(`${directories}/text.txt`), 
  output: process.stdout, 
  console: false 
}); 