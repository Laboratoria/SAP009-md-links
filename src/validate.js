function validate(linksFormatados) {
  return Promise.all(
    linksFormatados.map((cadaObjeto) => fetch(cadaObjeto.href)
      .then((response) => {
        const linkValidado = { ...cadaObjeto, status: response.status, ok: response.ok };
        return linkValidado;
      })
      .catch((erro) => ({ ...cadaObjeto, status: (erro.cause.code), ok: false }))),
  );
}

export default validate;
