#!/usr/bin/env node

const mdLinks = require("./index.js")

    mdLinks('./files/text.md')
    .then((content) => {
      
      console.log(content);
  })
  .catch((error) => {
      console.error(error);
  });
  
  


