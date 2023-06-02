const fs = require('fs');

function readMarkdownFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const matches = data.match(regex);
        resolve(matches);
      }
    });
  });
}



module.exports = readMarkdownFile
