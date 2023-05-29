function validate(linksFormatados) {
  return Promise.all(
    linksFormatados.map(cadaObjeto => {
      return fetch(cadaObjeto.href)
        .then(response => {
            const linkValidado = {...cadaObjeto, status: response.status, ok: response.ok}
            return linkValidado;
        })
        .catch(erro =>  ({...cadaObjeto, status: (erro), ok: false}));
    })
  )
}



export default validate;
