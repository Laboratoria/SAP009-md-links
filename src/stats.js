function stats(linksFormatados) {
  return new Promise((resolve) => {
    const hrefList = [];
    let broken = 0;
    linksFormatados.forEach((cadaObjeto) => {
      hrefList.push(cadaObjeto.href);
      if (cadaObjeto.ok === false) {
        broken++;
      }
    });
    const uniqueLinks = new Set(hrefList);

    const objStats = {
      total: hrefList.length,
      unique: uniqueLinks.size,
      broken,
    };
    resolve(objStats);
  });
}

export default stats;
