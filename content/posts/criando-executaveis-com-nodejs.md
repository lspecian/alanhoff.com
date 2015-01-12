---
title: Criando executáveis com Node.js
date: 2015-01-12 14:29
author_name: Alan Hoffmeister
author_url: https://twitter.com/alan_hoff
gravatar: 6350d3781efe9d1a3a88542771ee39d4
image: nodejs.jpg
collection: posts
template: post.html
---

Quem nunca teve a vontade de criar um executável para distribuir em outras
máquinas e clientes, usando o Node.js? Hoje vamos falar um pouco sobre como
criar um arquivo único contendo o seu código junto com o Node.js.
<!--more-->

Dica simples e rápida para quem deseja criar aquele `arquivo.exe` ou executar um
`./hello-world` no terminar sem precisar instalar o Node.js.

A distribuição do Node.js já vem pré configurada para ser distribuída juntamente
com arquivos de terceiros, assim você pode integrar o seu script juntamente com
o build do Node.js.

### Instruções para linux

O primeiro passo é instalar as dependências e baixar o source code do Node.js
para que possamos compilá-lo.

```bash
sudo apt-get install build-essential
curl -O http://nodejs.org/dist/v0.10.35/node-v0.10.35.tar.gz
tar -zxvf node-v0.10.35.tar.gz
cd node-v0.10.35
```

Feito isso, precisamos criar um arquivo chamado `_third_party_main.js` e
adicionar este arquivo ao `node.gyp`, depois disto é só compilar.

```bash
# Criamos o arquivo necessário
echo 'console.log("Hello world!");' >> lib/_third_party_main.js

# Depois acrescentamos este arquivo nas dependências da build
sed -i "s/lib\/zlib.js',/lib\/zlib.js',\n'lib\/_third_party_main.js'/" node.gyp

# Agora é só compilar o Node.js!
./configure
make
```

Após a compilação seu binário estará localizado na pasta `./out/Release` e você
já pode rodar ele.

```bash
cd ./out/Release
./node
```

Agora é só enviar este executável para os seus amigos, o seu programa rodará
sem precisar instalar o Node.js.

### Instruções para Windows

Se alguém souber o processo de compilação para Windows, por favor
[forke esta postagem][0] e adicione aqui.

### Bônus: reduzindo o tamanho com o UPX

O [UPX][1] é um packer para executáveis, reduzindo o tamanho dos mesmo, podemos
utilizar ele para reduzir o tamanho do executável gerado.

```bash
sudo apt-get install upx
cd ./out/Release
cp node node_compressed
upx node_compressed
```

Podemos ver que o resultado ficou muito bom, nosso executável passou de 12Mb
para apenas 4Mb, e continua funcionando.

```
➜  Release ls -lah
total 43M
-rwxrwxr-x  1 alan alan  12M Jan 12 15:31 node*
-rwxrwxr-x  1 alan alan 4,1M Jan 12 15:36 node_compressed*
```

[0]: https://github.com/alanhoff/alanhoff.com/tree/master/content/posts
[1]: http://upx.sourceforge.net/
