
function handleError(err){
    if (err.code === 'ENOTFOUND') {
        // console.log(
        // chalk.red('\u2717') + ' ' + chalk.red(err.code) + chalk.gray(`: erro ao encontrar o site 
        //     (${chalk.red(itemObj.href)})`));
        const msgError = 'Link não encontrado!';
        return msgError;
    } else {
        const msgError = 'Erro no link!';
        return msgError;
    }

}

module.exports = handleError;