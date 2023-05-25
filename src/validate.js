function validate(linksFormatados) {
  return Promise.all(
    linksFormatados.map(cadaObjeto => {
      return fetch(cadaObjeto.href)
        .then(response => {
            const linkValidado = {...cadaObjeto, status: response.status, ok: response.ok}
            return linkValidado;
        })
        .catch(erro =>  ({...cadaObjeto, status: handleErrorFetch(erro), ok: false}));
        })
        )
}

function stats(linksFormatados) {
  return new Promise((resolve) => {
    let hrefList = [];
    let broken = 0;
    linksFormatados.forEach(cadaObjeto => {
        hrefList.push(cadaObjeto.href)
        if(cadaObjeto.ok === false) {
            return broken++;
        };
    });
    const uniqueLinks = new Set(hrefList);

    const objStats = {
        total: hrefList.length,
        unique: uniqueLinks.size,
        broken: broken,
    }
    resolve(objStats);
  });
}

export default {validate, stats};
