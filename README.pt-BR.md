<p align="center">
    <a href="#ceps">
        <img alt="logo" src="asset/logo.png">
    </a>
</p>

# ceps

[![build](https://travis-ci.org/tallesl/ceps.png)](https://travis-ci.org/tallesl/ceps)
[![coverage](https://coveralls.io/repos/tallesl/ceps/badge.png?branch=master)](https://coveralls.io/r/tallesl/ceps?branch=master)
[![dependencies](https://david-dm.org/tallesl/ceps.png)](https://david-dm.org/tallesl/ceps)
[![devDependencies](https://david-dm.org/tallesl/ceps/dev-status.png)](https://david-dm.org/tallesl/ceps#info=devDependencies)
[![npm module](https://badge.fury.io/js/ceps.png)](http://badge.fury.io/js/ceps)

[![npm](https://nodei.co/npm/ceps.png?mini=true)](https://nodei.co/npm/ceps/)

Um (web) service que expõe a página de busca individual de CEP dos Correios como uma API.

## *stack*

[cheerio](https://github.com/cheeriojs/cheerio) para navegação, [Express](http://expressjs.com) para HTTP e [MongoDB](http://mongodb.org) para banco de dados.

## Executando

`npm install -g`, configure duas variáveis de ambiente (abaixo), e chame-o.
Só isso.

## Variáveis de ambiente

Existem duas variáveis de ambiente a serem *setadas*:

* `CEPS_CONNECTIONSTRING`: [uma string de conexão MongoDB](http://docs.mongodb.org/manual/reference/connection-string/);
* `CEPS_SECRET`: uma string qualquer utiliza como senha.

Existe também uma variável opcional `PORT`. Assume `80` se nenhuma for especificada (pode precisar de [poderes de super vaca](http://pt.wikipedia.org/wiki/Superusu%C3%A1rio)).

## Fazendo a requisição

O serviço espera um `GET` em `/{cep desejado}`.
Você também tem que mandar um cabecalho `Secret` com a variável de ambiente mencionada acima.

Por exemplo, um `GET` à `/30130010` retornaria:

```json
{
    "cep": "30130010",
    "logradouro": "Praça Sete de Setembro",
    "bairro": "Centro",
    "localidade": "Belo Horizonte",
    "uf": "MG"
}
```

[400](http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#400_Requisi.C3.A7.C3.A3o_inv.C3.A1lida) significa que o CEP dado estava malformado ou que o cabeçalho `Secret` não foi passado.
[403](http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#403_Proibido) significa quem um `Secret` incorreto foi passado.
[500](http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#500_Erro_interno_do_servidor_.28Internal_Server_Error.29) siginifica que algo de errado aconteceu no servidor.

E, claro, [200](http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#200_OK) que tudo foi como esperado.
[204](http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#204_Nenhum_conte.C3.BAdo) se a requisição foi OK mas nenhum endereço foi encontrado para o CEP.

## Como funciona

Quando uma requisição é feita, o serviço busca do banco de dados o endereço do CEP informado.

Se o endereço existe no banco de dados e se o registro não possui mais do que um mês, responde.
Fim da requisiçao.

Se o endereço não existe no banco de dados ou possui mais do que um mês, busca um novo do site dos Correios, salva no banco de dados, e então responde.
Fim da requisição.

## Um *hack* cuidadoso

* [Os site dos Correios permite que todo o site seja indexado por robôs de busca](http://correios.com.br/robots.txt);
* Não existe nenhum recurso impedindo um acesso *não humano* (como um CAPTCHA por exemplo);
* Nós não *bombardeamos* de requisições (uma única requisição aqui é uma única requisição lá);
* Nõs evitamos realizar a requisição se possível (somente requisitamos registros com mais de um mês, senão utilizamos do nosso próprio banco de dados).

