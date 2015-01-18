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

A (web) service that exposes [Correios'](http://pt.wikipedia.org/wiki/Empresa_Brasileira_de_Correios_e_Tel%C3%A9grafos) individual [CEP](http://en.wikipedia.org/wiki/C%C3%B3digo_de_Endere%C3%A7amento_Postal) search page as a consumable API.

This is the API that we ~~want~~ need but [it doesn't existed](#correios-criticism).

## *stack*

[cheerio](https://github.com/cheeriojs/cheerio) for crawling, [Express](http://expressjs.com) for HTTP and [MongoDB](http://mongodb.org) for database.

## Running it

`npm install -g` it, configure a couple env vars (see below), and call it.
That's it.

Ah, and since it listens on port 80, you may need to run it with [super cow powers](http://en.wikipedia.org/wiki/Superuser).

## Environment variables

There are two mandatory environment variables to set:

* `CEPS_CONNECTIONSTRING`: [a MongoDB connection string](http://docs.mongodb.org/manual/reference/connection-string/);
* `CEPS_SECRET`: an arbitrary string used as password.

## Requesting

The service expects a `GET` request at `/{desired cep}`.
You also have to send a `Secret` header with the secret env var mentioned above.

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

[400](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#400) means that the given CEP was malformed or that the required `Secret` header wasn't passed. [403](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) means that a wrong `Secret` was passed. [500](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) means that something bad happened at the server side.

And, of course, [200](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#200) if everything went smoothly.
[204](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#204) if the request was OK but nothing was found for the given CEP.

## How it works

When a request is made, the service retrieves from the database the address info of the given CEP.

If the address exists in the database and if the record isn't a month old, responds it.
End of the request.

If there isn't such address or if it's more than a month old, crawls a fresh one from Correios website, saves on the database, and then responds it. End of the request.

## A careful hack

* [Correios allows the whole site to be crawled by search bots](http://correios.com.br/robots.txt);
* There is no device for impeding a *non-human* access (such as a CAPTCHA);
* We don't bulk request (a single request here is a single request there);
* We avoid requesting if possible (we only crawl month old records, else we just use our database).

