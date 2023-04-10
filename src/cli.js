import chalk from "chalk";
import fs from 'fs';
import pegarArquivo from "../src/index.js";
import listaValidada from "../src/http-validacao.js";

const caminho = process.argv; //mudar para path?

async function imprimeLista(valida, resultado, identificador = '') {

    if(valida){
        console.log(
            chalk.yellow('lista validada'), 
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    }else{
        console.log(
            chalk.yellow('lista de links'), 
            chalk.black.bgGreen(identificador),
            resultado);
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
   
    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log('arquivo ou diretório não existe');
            return
        }

    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegarArquivo(argumentos[2]);
        imprimeLista(valida, resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegarArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo);
        })
    }
}
processaTexto(caminho)