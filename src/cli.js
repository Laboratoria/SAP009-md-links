import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js'
import listaValidada from './http-validacao.js';

//PROCESS.ARGV é um obj proprio do Node que representa valores de argumento e objeto, capturamos as informações passadas pela linha de comando
const caminho = process.argv;

async function imprimeLista(valida, resultado, identificador = ''){
    if(valida) {
        console.log(
            chalk.yellow('Lista Validada'), 
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    }else {
        console.log(
            chalk.yellow('Lista de Links'), 
            chalk.black.bgGreen(identificador),
            resultado);
    }
}

//responsavel por mandar nossa lista de links p/ tela do terminal
//const resultao chamará pegaArquivo passando o caminho na posição 2
function processaTexto(argumento){
    const caminho = argumento[2];
    const valida = argumento[3] === '--valida';
    
    try{
        fs.lstatSync(caminho);
    } catch(erro){
        if(erro.code === 'ENOENT'){
            console.log(chalk.red('Arquivo ou Diretório não existe'))
            return;
        }
    }
    
    //isFile vai retornar true se for o caminho de um arquivo
    if (fs.lstatSync(caminho).isFile()) { 
        pegaArquivo(argumento[2])
            .then((resultado) => {
        imprimeLista(valida, resultado);
    })
        .catch ((e) => {
        console.error('Erro ao processar o arquivo', e);
        });
    } else if (fs.lstatSync(caminho).isDirectory()) {
        fs.promises.readdir(caminho)
        //O then é usado para definir um callback que será executado quando a promessa for resolvida, ou seja, quando a leitura do diretório for concluída com sucesso. 
        .then((arquivos) => {
            arquivos.forEach((nomeDeArquivo) => {
                pegaArquivo(`${caminho}/${nomeDeArquivo}`)
                .then((lista) => {
                    imprimeLista(valida, lista, nomeDeArquivo)
                })      
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }            
}
processaTexto(caminho);
