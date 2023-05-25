#!/usr/bin/env	node
import mdLinks from './index.js';
import process from 'process';
import chalk from 'chalk';

const pathFile = process.argv[2];

const options = {
  validate: process.argv.includes("--validate"),
  stats: process.argv.includes("--stats")
}

const validateFalse = (linksFormatados) => {
  linksFormatados.forEach(cadaObjeto => {
    console.log(chalk.green("✔️"), chalk.grey(cadaObjeto.file), chalk.green(cadaObjeto.href), chalk.grey(cadaObjeto.text));
  })
}

const ValidateTrue = (linksFormatados) => {
  linksFormatados.forEach(cadaObjeto => {
    let ok;
    let icon;
    if(cadaObjeto.ok) {
      ok = chalk.green("OK");
      icon = chalk.green("✔️");
    } else {
      ok = chalk.red("FAIL");
      icon = chalk.red("❌");
    }
    console.log(icon, chalk.grey(cadaObjeto.file), chalk.green(cadaObjeto.href), ok, chalk.yellow(cadaObjeto.status), chalk.grey(cadaObjeto.text));
  })
}

const validateStats = (linksFormatados) => {
   stats(linksFormatados)
   .then(objStats => {
       console.log('Total: ', objStats.total);
       console.log('Unique: ', objStats.unique);

       if (process.argv[4] === '--validate') {
           console.log('Broken: ', objStats.broken);
       }
   })
}

mdLinks(pathFile, options)
  .then(result => {
    if(options.validate === false && options.stats === false) {
        validateFalse(result);
    } else if(options.validate === true && options.stats === false) {
        ValidateTrue(result);
    } else if(options.stats) {
        validateStats(result);
    }
  })
  .catch(err => {
    console.log(err);
  })

 
  