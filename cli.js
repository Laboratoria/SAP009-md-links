#!/usr/bin/env node
const mdLinks = require('./index.js');
const fetch = require('node-fetch');
const chalk = require('chalk');

const typedPath = process.argv[2];
const optionUser = process.argv[3];
mdLinks(typedPath)
    .then(answer => {
        if(optionUser === '--validate'){
            answer.forEach(itemObj => {
                fetch(itemObj.href)
                .then(result => {
                    let output = '';
                    let icon = '';
                    if(result.ok === true){
                        output = chalk.blue('OK');
                        icon = chalk.red('\u2764');
                    } else {
                        output = chalk.red('FAIL');
                        icon = chalk.red('\u2717');
                    }
                    console.log(icon + ' ' + chalk.magenta(itemObj.file) + ' ' + chalk.gray.bold(itemObj.href) + ' ' + output + ' ' + chalk.gray(result.status) + ' ' + chalk.magenta(itemObj.text));
                }) 
                .catch(err => {
                    console.error(err);
                })
            })
        } else if (optionUser === '--stats'){
            console.log('entrou no stats');
        } else if (!optionUser){
            answer.forEach(itemObj => {
            console.log(chalk.red('\u2764') + ' ' + chalk.magenta(itemObj.file) + ' ' + chalk.gray(itemObj.href) + ' ' + chalk.magenta(itemObj.text));
            });
        }
        else {
            console.log(chalk.red('\u2717') + ' ' + chalk.red('Não entendi o seu comando :( '));
        }
    })
    .catch(erro => {
        console.log(erro);
    })



