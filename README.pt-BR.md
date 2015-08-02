<p align="center">
    <a href="#ceps">
        <img alt="logo" src="asset/logo.png">
    </a>
</p>

# ceps

[![][build-img]][build]
[![][coverage-img]][coverage]
[![][dependencies-img]][dependencies]
[![][devdependencies-img]][devdependencies]
[![][module-img]][module]

[![][npm-img]][npm]

Um (web) service que expõe a página de busca individual de CEP dos Correios como uma API.

Utiliza [cheerio] para navegação, [Express] para HTTP e [MongoDB] para banco de dados.

[build]:     https://travis-ci.org/codigonosso/ceps
[build-img]: https://travis-ci.org/codigonosso/ceps.png

[coverage]:     https://coveralls.io/r/codigonosso/ceps?branch=master
[coverage-img]: https://coveralls.io/repos/codigonosso/ceps/badge.png?branch=master

[dependencies]:     https://david-dm.org/codigonosso/ceps
[dependencies-img]: https://david-dm.org/codigonosso/ceps.png

[devdependencies]:     https://david-dm.org/codigonosso/ceps#info=devDependencies
[devdependencies-img]: https://david-dm.org/codigonosso/ceps/dev-status.png

[module]:     http://badge.fury.io/js/ceps
[module-img]: https://badge.fury.io/js/ceps.png

[npm]:     https://nodei.co/npm/ceps
[npm-img]: https://nodei.co/npm/ceps.png?mini=true

[cheerio]: https://github.com/cheeriojs/cheerio
[Express]: http://expressjs.com
[MongoDB]: http://mongodb.org

## Como funciona

Quando uma requisição é feita, o serviço busca do banco de dados o endereço do CEP informado.

Se o endereço existe no banco de dados e se o registro não possui mais do que um mês, responde.
Fim da requisição.

Se o endereço não existe no banco de dados ou possui mais do que um mês, busca um novo do site dos Correios, salva no banco de dados, e então responde.
Fim da requisição.

## Utilização

Você pode tanto `npm install ceps -g`, clonar este repositório e executar `bin/de-busca.js` ou fazer deploy no Heroku:

[![][heroku-img]][heroku]

O serviço espera um `GET` em `/{cep desejado}`.

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

[400] significa que o CEP dado estava malformado ou que nenhuma autorização foi passada.
[403] significa quem uma autorização incorreta foi passada.
[500] siginifica que algo de errado aconteceu no servidor.

E, claro, [200] que tudo foi como esperado.
[204] se a requisição foi OK mas nenhum endereço foi encontrado para o CEP.

[heroku]:     https://heroku.com/deploy
[heroku-img]: https://www.herokucdn.com/deploy/button.png

[400]: http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#400_Requisi.C3.A7.C3.A3o_inv.C3.A1lida
[403]: http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#403_Proibido
[500]: http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#500_Erro_interno_do_servidor_.28Internal_Server_Error.29

[200]: http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#200_OK
[204]: http://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_status_HTTP#204_Nenhum_conte.C3.BAdo

## Configuração

Existem duas variáveis de ambiente a serem configuradas:

* `CEPS_CONNECTIONSTRING`: [uma string de conexão MongoDB];
* `CEPS_AUTH`: credenciais [basic authentication] no formato `user:pass`;
* `PORT`: porta a escutar (opcional, assume 80).

[uma string de conexão MongoDB]: http://docs.mongodb.org/manual/reference/connection-string
[basic authentication]: https://en.wikipedia.org/wiki/Basic_access_authentication#Client_side

## Um *hack* cuidadoso

* [Os site dos Correios permite que todo o site seja indexado por robôs de busca][robots];
* Não existe nenhum recurso impedindo um acesso *não humano* (como um CAPTCHA por exemplo);
* Nós não *bombardeamos* de requisições (uma única requisição aqui é uma única requisição lá);
* Nõs evitamos realizar a requisição se possível (somente requisitamos registros com mais de um mês, senão utilizamos do nosso próprio banco de dados).

[robots]: http://correios.com.br/robots.txt
