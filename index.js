const fs = require('fs');


function readMarkdownFile(filePath,precisaValidar) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const matches = data.match(regex);
        const result = [];

        if (matches) {
          for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            const linkText = match.replace(regex, '$1');
            const linkUrl = match.replace(regex, '$2');
            const item = {
              text: linkText,
              url: linkUrl
            };
            result.push(item);
          }
        }
      if (precisaValidar) {
        console.log('opa precisa validar')
      } else{
        resolve(result);
      }
      }
    });
  });
}































//function readMarkdownFile(filePath) {
//  return new Promise((resolve, reject) => {
  //  fs.readFile(filePath, 'utf8', (error, data) => {
   //   if (error) {
    //    reject(error);
    //  } else {
     //   const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
     // const matches = data.match(regex);
     //   resolve(matches);
     // }
  //  });
  //});
//}



module.exports = readMarkdownFile
