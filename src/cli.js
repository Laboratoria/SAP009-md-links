import { mdLinks } from "./md-links";
import chalk from "chalk";
import { argv } from 'node:process';

const caminhoDoArquivo = argv[2];

mdLinks(caminhoDoArquivo)
    .then((informacoes) => {
        informacoes.map((item) => {
        console.log(`${chalk.blue(item.file)} ${chalk.cyan(item.href)} ${chalk.green(item.text)}`)
        })

    }).catch((err) => {
        console.log(err);
    })