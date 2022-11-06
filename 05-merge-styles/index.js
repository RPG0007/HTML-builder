const fs = require('fs');
const path = require('node:path');
const filePath = path.join(__dirname, 'project-dist/bundle.css');
const directoryPath = path.join(__dirname, 'styles');
// Add file bundle.css
fs.writeFile(filePath, "", function(err){
  if (err) {
    console.log(err);
    return;
  }
});
// Check files extension 
fs.readdir(directoryPath, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach((item, index) => {
    if (item.isFile()) {
      const parse = path.parse(`${directoryPath}/${item.name}`);
      const pathFileStyle = `${parse.dir}/${parse.base}`;
      const postfix = index + 1 === files.length ? '': '\n';
      if (parse.ext === '.css') {
        readFile(pathFileStyle, postfix);
      }
    }
  })
});
// Reading files style and write to array
function readFile(item, postfix) {
  fs.readFile(item, "utf8", function(error, data) {

    if (error) throw error; 
    writeFile(data+postfix);

  });
}
// Writing data to a file
function writeFile (data) {
  fs.appendFile(filePath, data, function(error){
    if(error) throw error;
  });
}