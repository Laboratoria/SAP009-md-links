const path = require('path');
const fs = require('fs');

function readDirectory(dir){ //fazer ifelse, if nenhum dir tem ext .md...return n achei nada, reject, ser promise
    //resolve meus arq md
    return new Promise((resolve, reject)=>{
    
        const files = fs.readdirSync(dir);
        //console.log(files);
        const reading = files.filter(file => {
            return path.extname(file) === '.md';
        })
        .map(file => {
            return readFile(path.resolve(dir, file));
        })
        Promise.all(reading).then((values)=> {
            resolve(values);
        })
    })
       
}
function readFile(file){

    return fs.promises.readFile(file).then((data) => {
        return {file: file, data: data.toString()}
    }); 
}
function read(pathFile){
    // const mdExtension = path.extname(pathFile);
    statsObj = fs.statSync(pathFile);
    if(statsObj.isDirectory(pathFile)){
        return readDirectory(pathFile)
    } else {
        return readFile(pathFile);
    }
}

module.exports = {read, readFile, readDirectory};