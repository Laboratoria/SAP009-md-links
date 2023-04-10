import chalk from "chalk";
import fs from 'fs';
import extrairLinksDoArquivo from "../src/index.js";
 import listaValidada from "../src/http-validacao.js";

const caminho = process.argv; //mudar para path?

function imprimeLista(valida, resultado, identificador = '') {
    if (valida) {
        listaValidada(resultado)
            .then((res) => {
                console.log(chalk.bgMagenta('Lista validada'),
                    chalk.black.bgGreen(identificador), res);
            })
            .catch((err) => console.log(err));
    } else {
        console.log(chalk.yellow('Lista de links'),
            chalk.black.bgGreen(identificador), resultado);
    }
}

function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try {
        
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log(chalk.black.bgRed('Arquivo ou diretório não existe'));
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        extrairLinksDoArquivo(argumentos[2])
            .then((resultado) => {
                imprimeLista(valida, resultado);
            })
            .catch((err) => console.log(err));
    } else if (fs.lstatSync(caminho).isDirectory()) {
        fs.promises.readdir(caminho)
            .then((arquivos) => {
                arquivos.forEach((nomeDeArquivo) => {
                    extrairLinksDoArquivo(`${caminho}/${nomeDeArquivo}`)
                        .then((lista) => {
                            console.log(chalk.black.bgBlue('OK'))
                            imprimeLista(valida, lista, nomeDeArquivo);
                        })
                        .catch((err) => console.log(err));
                });
            })
            .catch((err) => console.log(err));
    }
}

processaTexto(caminho);

