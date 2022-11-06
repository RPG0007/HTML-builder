const fs = require('fs');
const path = require('node:path');

const NewDirPath = path.join(__dirname, 'project-dist');
const NewHtmlPath = path.join(__dirname, 'components');
const directory = path.dirname(NewDirPath);

//Add new directory project-dist

fs.mkdir(NewDirPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  FormHtml();
  FormStyles();
  copyAssets();
});

function FormHtml() {
  fs.readdir(NewHtmlPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    fs.readFile(`${directory}/template.html`, 'utf8', function (error, template) {
      if (error) throw err;
      files.forEach((item) => {
        if (item.isFile()) {
          const parse = path.parse(`${NewHtmlPath}/${item.name}`);

          if (parse.ext === '.html') {
            fs.readFile(`${NewHtmlPath}/${item.name}`, 'utf8', function (error1, data) {
              if (error1) throw error1;
              template = template.replace(`{{${parse.name}}}`, data);
              fs.writeFile(`${directory}/project-dist/index.html`, template, function (error) {
                if (error) throw error;
              });
            });
          }
        }
      });
    });
  });
}

function FormStyles() {
  const StylePath = path.join(__dirname, 'project-dist/style.css');
  const directoryPath = path.join(__dirname, 'styles');

  // Add file bundle.css

  fs.writeFile(StylePath, '', function (err) {
    if (err) {
      console.log(err);
      return;
    }
  });

  // Check files extension

  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((item, index) => {
      if (item.isFile()) {
        const parse = path.parse(`${directoryPath}/${item.name}`);
        const pathFileStyle = `${parse.dir}/${parse.base}`;
        const postfix = index + 1 === files.length ? '' : '\n';
        if (parse.ext === '.css') {
          readFile(pathFileStyle, postfix);
        }
      }
    });
  });

  // Reading files style and write to array

  function readFile(item, postfix) {
    fs.readFile(item, 'utf8', function (error, data) {
      if (error) throw error;
      writeFile(data + postfix);
    });
  }

  // Writing data to a file

  function writeFile(data) {
    fs.appendFile(StylePath, data, function (error) {
      if (error) throw error;
    });
  }
}

function copyAssets() {
  const NewDirPath = path.join(__dirname, 'project-dist/assets');
  const directoryPath = path.join(__dirname, 'assets');
  copyDir(directoryPath, NewDirPath);
}

function copyDir(directoryPath, NewDirPath) {
  fs.mkdir(NewDirPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((element) => {
      if (!element.isFile()) {
        copyDir(`${directoryPath}/${element.name}`, `${NewDirPath}/${element.name}`);
      } else {
        fs.copyFile(`${directoryPath}/${element.name}`, `${NewDirPath}/${element.name}`, (err) => {
          if (err) throw err;
        });
      }
    });
  });
}