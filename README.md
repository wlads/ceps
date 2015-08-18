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

[Fala português?]

A (web) service that exposes [Correios'] individual [CEP] search page as a consumable API.

It uses [cheerio] for scraping, [Express] for HTTP and [MongoDB] for database.

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

[Fala português?]: README.pt-BR.md

[Correios']: http://pt.wikipedia.org/wiki/Empresa_Brasileira_de_Correios_e_Tel%C3%A9grafos
[CEP]:       http://en.wikipedia.org/wiki/C%C3%B3digo_de_Endere%C3%A7amento_Postal

[cheerio]: https://github.com/cheeriojs/cheerio
[Express]: http://expressjs.com
[MongoDB]: http://mongodb.org

## How it works

When a request is made, the service retrieves from the database the address info of the given CEP.

If the address exists in the database and if the record isn't a month old, responds it.
End of the request.

If there isn't such address or if it's more than a month old, scraps a fresh one from Correios website, saves on the database, and then responds it.
End of the request.

## Usage

You can either `npm install ceps -g`, clone this repository and run `bin/de-busca.js` or deploy to Heroku:

[![][heroku-img]][heroku]

The service expects a `GET` request at `/{desired cep}`.

For instance, a `GET` to `/30130010` may return:

```json
{
    "cep": "30130010",
    "logradouro": "Praça Sete de Setembro",
    "bairro": "Centro",
    "localidade": "Belo Horizonte",
    "uf": "MG"
}
```

[heroku]:     https://heroku.com/deploy
[heroku-img]: https://www.herokucdn.com/deploy/button.png

[400] means that the given CEP was malformed or that the required authorization wasn't provided.
[403] means that a wrong authorization was provided.
[500] means that something bad happened at the server.

And, of course, [200] if everything went smoothly.
[204] if the request was OK but nothing was found for the given CEP.

Here's how to request from the cli:

```sh
$ curl example.org/30130010 -i -u "username:password"
```

[400]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#400
[403]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403
[500]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500

[200]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#200
[204]: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#204

## Configuration

There are two environment variables to set:

* `MONGO`: [a MongoDB connection string];
* `AUTH`: [basic authentication] credentials in the format `user:pass`;
* `PORT`: port to listen on (optional, assumes 80).

[a MongoDB connection string]: http://docs.mongodb.org/manual/reference/connection-string
[basic authentication]: https://en.wikipedia.org/wiki/Basic_access_authentication

## A careful hack

* [Correios allows the whole site to be crawled by search bots][robots];
* There is no device for impeding a *non-human* access (such as a CAPTCHA);
* We don't bulk request (a single request here is a single request there);
* We avoid requesting if possible (we only scrap month old records, else we just use our database).

[robots]: http://correios.com.br/robots.txt

