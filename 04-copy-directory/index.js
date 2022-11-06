
const fs = require('fs');
const path = require('node:path');
const newDirectoryPath = path.join(__dirname, 'files-copy');
const directoryPath = path.join(__dirname, 'files');

fs.mkdir(newDirectoryPath, { recursive: true }, (err) => {

  if (err) {
    console.error(err)
    return;
  }

})

fs.readdir(directoryPath, (err, files) => {

  if (err) {
    console.error(err)
    return;
  }

  files.forEach(element => {
    fs.copyFile(`${directoryPath}/${element}`, `${newDirectoryPath}/${element}`, err => {

      if(err) throw err;  

    });

  });
})