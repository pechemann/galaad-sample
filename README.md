# Galaad framework and JSAX-RS HATEOAS sample application

[![JSAX-RS version](https://img.shields.io/badge/JSAXRS-0.1.0-%239966FF.svg)](https://github.com/jsax-rs)
[![npm version](https://badge.fury.io/js/asteria-helios.svg)](https://www.npmjs.com/package/asteria-helios)
[![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/mit-license.php)

## Requirements

Asteria Helios needs the following system parameters in order to work correctly:

- npm 3+
- TypeScript 3+
- Node.js 8+

## Installation

Create a new directory and clone the Galaad framework sample application into it:

```bash
$ mkdir galaad-sample
$ cd galaad-sample
$ git clone https://github.com/pechemann/galaad-sample
```

Set up the Galaad framework sample application with:

```bash
$ npm install
```

## Running the Application

To run the application, start the Node.js script with:

```bash
$ node index.js
```

## Usage

Open any HTTP client _(e.g [Postman](https://www.getpostman.com/), [Advanced REST client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo), etc.)_ and explore the app API from the following docroot: `http://localhost:3000/api/`.

The REST API exposes basic CRUD operations over a static collection of book objects, specified by the `Book` interface:

```
Book {
    id: string;
    name: string;
    author: string;
    year: string;
}
```

Available operations are:

- `GET /books`
- `POST /books`
- `GET /books/:bookId`
- `PUT /books/:bookId`
- `DELETE /books/:bookId`

## Galaad Framework

This sample application shows how to use decorators defined in the Galaad framwork to create apps managed by hypermedia.

- The `SampleApplication` class shows the use of the `@RsApplication` and `@RsHateoasContext` decorators.
- The `AppStateService` class shows another use of the `@RsHateoasContext` decorator.
- The `BooksRoutes` class shows the use of the `@RsTransitionFromState`, `@RsState`, `@RsTransition` and `@RsMapTransition` decorators.

For more information about Galaad framework and the JSAX-RS HATEOAS API, please refer to the [JSAX-RS documentation](https://github.com/pechemann/jsax-rs/blob/master/docs/jasx-rs-reference/jsax-rs-reference.md).

## License
This project is licensed under MIT. Full license text is available in [LICENSE](LICENSE).

```
MIT License

Copyright (c) 2019 Pascal ECHEMANN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```