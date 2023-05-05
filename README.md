# Markdown Links 🔗
![Imagem](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## Índice
* [1. Sobre o projeto](#1-sobre-o-projeto)
* [2. Comandos](#2-comandos)
* [3. Ferramentas utilizadas](#3-ferramentas-utilizadas)

## 1. Sobre o projeto

Neste projeto focado em Back-End, foi criado uma ferramenta de linha de comando (CLI) que tem como objetivo permitir que o usuário execute a biblioteca diretamente do terminal, através de um módulo do Node.js que analisa e identifica links em arquivos [Markdown](https://pt.wikipedia.org/wiki/Markdown), e verifica o status _https_ de cada um deles.


## 2. Comandos

* Para instalar, execute o seguinte comando no terminal:

  `polyana-feitoza/SAP009-md-links`

* Após a instalação, é possível executar os seguintes comandos:

  `md-links ./nomeDoDiretório/caminhoDoArquivo`

  Esse comando lê o arquivo Markdown especificado e imprime o caminho do arquivo, os links encontrados e seus textos correspondentes.

  `md-links ./nomeDoDiretório/caminhoDoArquivo --validate`

  Ao adicionar a flag --validate, o módulo fará uma requisição HTTP para verificar se cada link funciona ou não. Se o link existir e funcionar, será considerado como um link válido. Caso contrário, será marcado como inválido.

  `md-links ./nomeDoDiretório/caminhoDoArquivo --stats`

  Ao adicionar a flag --stats, será exibido um resumo estatístico dos links encontrados no arquivo especificado. Será mostrado o número total de links e o número de links únicos.

  `md-links ./nomeDoDiretório/caminhoDoArquivo --validate --stats`

  Ao adicionar as flags --stats e --validate juntas, além das informações de total de links e links únicos, também será exibido o número de links inválidos (broken) encontrados.

### 3. Ferramentas utilizadas

* Node.js
* JavaScript
* Jest
* GitHub
