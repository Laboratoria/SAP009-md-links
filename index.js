// function init(){
//   console.log('deu certo, olha eu aqui');
// }
// module.exports = init;
const fs = require('fs');

function lerArquivo(pathFile){
  fs.readFile(pathFile, 'utf8', (err, data) => {
    // console.log(data);
    if (err) throw err;

    const defaultRegex = /\[\w+.\w+\]\(\w+.+\)/gmi; 
    const searchLinks = data.match(defaultRegex);

    searchLinks.forEach(link => {
      const removeItens = link.replace(')','').replace('[','');
      const split = removeItens.split('](');
      const newObj = {
        href: split[1],
        text: split[0],
        file: pathFile,
      }
      console.log(newObj.file + ' ' + newObj.href + ' ' + newObj.text);
    });
  });
}

lerArquivo('README.md');