import chalk from "chalk";
import mdLinks from "../src/index.js";


function imprimeLista(resultado, identificador = '') {
    console.log(chalk.yellow('Lista de links'),
        chalk.black.bgGreen(identificador), resultado);
}

const caminho = process.argv[2];
const validate = process.argv.some(argumento => argumento === '--validate');
const stats = process.argv.some(argumento => argumento === '--stats');

const options = {
    validate: validate,
    stats: stats
}

mdLinks(caminho, options)
    .then((resultado) => {
        imprimeLista(resultado);
    })
    .catch((err) => console.log(err));

