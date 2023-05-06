#!/usr/bin/env node
import { mdLinks } from "./md-links.js";

import chalk from "chalk";
import process from "node:process";
import fetch from "node-fetch";
import { argv } from 'node:process';
import { error } from "node:console";

const caminhoDoArquivo = argv[2];

const options = {
    validate: process.argv.includes('--validate'),
    stats: process.argv.includes('--stats')
}

if(options.validate){
    mdLinks(caminhoDoArquivo,{validate:true})
    .then((informacoes) => {
        informacoes.map((item) => {
            fetch(item.href)
            .then((res) => {
                const status = res.status == 200 ? chalk.blue('ok') : chalk.red('fail');
                console.log(`${chalk.blue(item.file)} ${chalk.green(item.href)} ${chalk.bgMagenta(status)} ${chalk.bgGreen(res.status)} ${chalk.cyan(item.text)}`);
            })
            .catch((err) => {
                console.log(err);
            })
        console.log(`${chalk.magenta(item.file)} ${chalk.bgCyanBright(item.href)} ${chalk.green(item.text)}`)
        })
    }).catch((err) => {
        console.log(err);
    });
}else if(options.stats){
    mdLinks(caminhoDoArquivo, {stats:true})
    .then((informacoes) => {
        const links = informacoes.map((item) => item.href);
        console.log(`total:${informacoes.length}`);
        console.log(`unique:${informacoes.length}`);
    }).catch((err)=>{
        console.log(err);
    });
}else if(options.validate && options.stats){
    mdLinks(caminhoDoArquivo, {stats:true})
    .then((informacoes) => {
        const links = informacoes.map((item) => item.href);
        console.log(`total:${informacoes.length}`);
        console.log(`unique:${links.length}`);
    }).catch((err)=>{
        console.log(err);
    });
}else{
    mdLinks(caminhoDoArquivo,)
    .then((informacoes) => {
        informacoes.map((item) => {
        console.log(`${chalk.magenta(item.file)} ${chalk.bgCyanBright(item.href)} ${chalk.green(item.text)}`)
        })
    }).catch((err) => {
        console.log(err);
    });
    
}


