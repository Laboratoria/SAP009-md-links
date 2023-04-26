* Usando um _módulo_ como
  [markdown-it](https://github.com/markdown-it/markdown-it), que nos devolve um
  array de _tokes_ que utilizamos para identificar os links.
* Seguindo outro caminho, poderíamos usar [expressões regulares
  (`RegExp`)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions).
* Também poderíamos usar uma combinação de vários _módulos_ (poderia ser válido
  transformar o markdown em um HTML usando o
  [marked](https://github.com/markedjs/marked) e depois extrair os links com uma
  biblioteca de DOM como [JSDOM](https://github.com/jsdom/jsdom) o
  [Cheerio](https://github.com/cheeriojs/cheerio)).
* Usando um _custom renderer_ de [marked](https://github.com/markedjs/marked)
  (`new marked.Renderer()`).