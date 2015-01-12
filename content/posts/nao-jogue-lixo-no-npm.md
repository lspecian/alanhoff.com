---
title: Não jogue lixo no npm!
date: 2014-10-21 23:00
author_name: Alan Hoffmeister
author_url: https://twitter.com/alan_hoff
gravatar: 6350d3781efe9d1a3a88542771ee39d4
image: garbage.jpg
collection: posts
template: post.html
---

Sim, tudo o que está dentro do seu projeto é empacotado na hora de publicar o
seu pacote no npm, incluindo seus testes, documentação, imagens, descrição da
API e possíveis pornografias. Se o npm começar a ficar lento, a culpa é sua!
<!--more-->

### Os arquivos que o npm NÃO precisa

Pense um pouco comigo, toda vez que eu utilizo o `require('seu-modulo-lindo')`
estou usando a documentação do seu módulo? Estou usando os testes dele? Ou pior
ainda: estou usando o ***WEBSITE DO PROJETO*** (sim uma vez vi um tarball com o
gh-pages do projeto, e não era meu)? Obviamente você não precisa destes itens.
Então porque deixar esses arquivos na hora de rodar o `npm publish`?

Se eu quero realizar os testes do seu projeto, vou fazer o fork do mesmo,
instalar as dependências de desenvolvimento e rodar o comando de testes. Eu ***
não vou*** baixar o tarball do npm para fazer isso, muito menos para ler a
documentação.

Pode parecer besteira para alguns, mas se enviássemos somente os arquivos
necessários para um ambiente de produção, a instalação dos nossos projetos
iria demorar menos, iríamos consumir menos banda, o cache local dos pacotes
também diminuiria. Dica: fale com o seu chefe sobre redução de gastos.

### Os arquivos que o npm precisa

Lembre-se destes três arquivos: `package.json`, `readme.md` e `license`.
Obviamente você também vai precisar de todos os arquivos necessários para seu
módulo rodar quando o outro cara fizer o `require` ou compilar binários na hora
da instalação.

* __`package.json`__, acho que não precisa dar explicação, sem isso nem da para
publicar.
* __`readme.md`,__ além de servir para formatar a página do seu módulo no npm,
também é muito útil quando precisamos consular rapidamente algo utilizando o
`npm show modulo-lindo readme`.
* __`license`__ é sempre necessário se você quiser deixar seu pacote dentro das
normas da sua licença.

### O .npmignore salvando você

A primeira opção é utilizar o `.gitignore`, tudo o que está ali dentro o npm irá
ignorar na hora de publicar, mas também vai dar trabalho na hora do `git push`
pois certamente você vai querer mandar a documentação e os testes para o seu
repositório, para solucionar isso você pode utilizar o `.npmignore`, que
funciona exatamente igual ao `.gitignore` porém ele só é lido pelo npm na hora
de publicar um módulo. E aqui vai uma colinha pra você não precisar adicionar
arquivo por aquivo dentro do seu `.npmignore`

```
# Primeiro ignoramos tudo
*
# Agora permitimos somente os arquivos necessários
!package.json
!readme.md
!license
!lib/
```

Pronto, após seguir esses simples passos, você já estará capacitado a parar de
ferrar com o npm.
