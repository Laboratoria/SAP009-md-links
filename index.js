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
    console.log(searchLinks);
    searchLinks.forEach(link => {
      console.log(link);
    });
  });
}

lerArquivo('./folder/arquiv.md');