#!/usr/bin/env node
const mdLinks = require("./index.js")
const caminhoDoarquivo = process.argv[2]
const precisaValidar = process.argv.includes('--validate')
    mdLinks(caminhoDoarquivo,precisaValidar)
    .then((content) => {
      
      console.log(content);
  })
  .catch((error) => {
      console.error(error);
  });
  
  


