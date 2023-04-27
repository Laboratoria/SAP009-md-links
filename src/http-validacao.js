import chalk from "chalk";

function extraiLinks (arrLinks){
   return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

//documentação Node
// async function checkStatus (listaURLs) {
//     const arrStatus = await Promise
//     .all(
//             listaURLs.map(async (url) => {
//             const response = await fetch(url)
//             return response.status;
//     })
//     )
//     return arrStatus;
// }

function checkStatus (listaURLs) {
    const arrStatus = Promise
    .all(
            listaURLs.map((url) => {
            return fetch(url).then((response) => {
                return `${response.status} - ${response.statusText}`;
            })
            .catch ((erro) => {
                return manejaErro(erro)                
            });         
    })
    )
    return arrStatus;
}

function manejaErro(erro){
   if(erro.cause.code === 'ENOTFOUND') {
    return 'Link não encontrado';
   } else {
    return 'Ocorreu algum erro';
   }
}

// export default async function listaValidada (listaDeLinks) {
//     const links = extraiLinks(listaDeLinks);
//     const status = await checkStatus(links);
//     return status;
// }

export default function listaValidada (listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    return checkStatus(links).then((status) => {
        return listaDeLinks.map((objeto, indice) => ({
            ...objeto,
            status: status[indice]
        }))
    });    
}