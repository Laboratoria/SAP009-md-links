const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const handleError = require("./erro.js");
const { read }  = require("./readDir.js");

// function findMdFiles(pathFile, options){
//   return new Promise((resolve, reject)=> {
//     fs.stat(pathFile, (err, stats) => {
//       if(err){
//         throw err;
//       }
//       const type = stats.isDirectory();
//       if(type){
//         readDirFunction(pathFile)
//         .then(arrayFiles =>{
//           arrayFiles.forEach(file => {
//             mdLinks(file)
//           });

//         })
//       } else if(path.extname(pathFile) === '.md'){

//        resolve(pathFile)
//       }
//       else{
//         console.log('não é um arquivo md')
//       }
//     })
//   });
// }
function getLinks(fileData) {
  return new Promise((resolve, reject) => {
    const textFile = fileData.data;
    const defaultRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const searchLinks = textFile.match(defaultRegex);
    if (searchLinks !== null) {
      const linksArray = searchLinks.map((link) => {
        const removeItens = link.replace(/.$/, "").replace(/^./, "");
        const splitItens = removeItens.split("](");
        const newObject = {
          href: splitItens[1],
          text: splitItens[0],
          file: fileData.file,
        };
        return newObject;
      });
      resolve(linksArray);
    }
  });
}

function validate (arrObjsLinks){
  return Promise.all(arrObjsLinks.map((eachObj) => {
      return fetch(eachObj.href)
        .then((result) => {
          // eslint-disable-next-line
          const newObjFetch = {...eachObj, status: result.status, ok: result.ok};
          return newObjFetch;
        })
        .catch((err) => ({...eachObj, status: handleError(err), ok: false }));
    })
  );
}

function mdLinks(pathFile, options) {
  return new Promise((resolve, reject) => {
    read(pathFile).then((fileContent) => {
      if (!Array.isArray(fileContent)) {
        getLinks(fileContent).then((linksObj) => {
          if (!options.validate) {
            resolve(linksObj);
          } else {
            validate(linksObj)
            .then((linksArrayFetchResult) => {
              resolve(linksArrayFetchResult);
            });
          }
        });
      } else {
        fileContent.forEach((objContent) => {
          getLinks(objContent).then((linksObj) => {
            resolve(linksObj);
          });
        });
      }
    });
  });
}

// console.log(chalk.red('\u2717') + ' ' + chalk.grey(`O arquivo: ${chalk.red(pathFile)} não possui extensão .md!`));
//     else {
//       fs.readFile(pathFile, 'utf8', (err, data) => {

//           if (!options.validate) {
//             resolve(linksArray);
//           } else {
//             const linksArrayFetch = Promise.all(linksArray.map(eachObj => {
//                 return fetch(eachObj.href)
//                   .then(result => {

//                     const newObjectFetch = {...eachObj, status: result.status, ok: result.ok};

//                     return newObjectFetch;
//                   })
//                   .catch((err) => ({...eachObj, status: handleError(err), ok: false}));
//               }));

//             linksArrayFetch.then(linksArrayFetchResult => {
//               resolve(linksArrayFetchResult);
//             })
//           }
//         } else if (fs.existsSync(pathFile) === false || fs.statSync(pathFile).size === 0) {
//           console.log(chalk.red('\u2717') + ' ' + chalk.grey(`O arquivo: ${chalk.red(pathFile)} não existe ou é vazio.`));
//         } else {
//           console.log(chalk.red('\u2717') + ' ' + chalk.red('Não há links no arquivo!'));
//         }
//       });
//     }
//   });
// }
module.exports = mdLinks;
