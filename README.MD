![Exha](https://cdn.ramco.mbps.tk/cdn/ehd6u608cn.png)

Fast, compact, open source route and middleware handler for [expess](https://www.npmjs.com/package/express)

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

```js
//index.js
const express = require("express");
const { Exha } = require("exha");

const app = express();

const exha = new Exha(app);

exha.getExha();
```

## Installation

This is a [Node.js](https://nodejs.org) module avaliable on the [npm registry](https://www.npmjs.com)

Installation is done using the:

```console
$ npm install --save-dev exha
```

## Features

-   Easily file routings
-   Easily file middlewares for routings
-   Create application quickly

## Quick Start

Create roots

```lua
project_root/
│
├── routes/
│   └── index.js //its router to GET - /
│   └── test/
│       └── message.post.js // its route to POST - /test/message
├── middlewares/
│   └── isMessage.js
├── exha.config.js
├── index.js
├── package.json
.
.
.
```

-   routes/indexjs

```js
//commonjs
module.exports = {
    event: (req, res) => {
        res.send("Hello, you are in the /");
    },
};

//esmodule
export const event = (req, res) => {
    res.send("Hello, you are in the /");
};
```

-   routes/test/message.post.js

```js
//commonjs
const { mwLoader } = require("exha");
const isMessage = mwLoader("/isMessage.js");
module.exports = {
    middlewares: [isMessage],
    event: (req, res) => {
        //Save message to your database
        res.send("We got your message");
    },
};

//esmodule
import { mwLoader } from "exha";
const isMessage = mwLoader("/isMessage.js");

const middlewares = [isMessage];
const event = (req, res) => {
    //Save message to your database
    res.send("We got your message");
};

export { middlewares, event };
```

-   middlewares/isMessage.js

```js
//commonjs
module.exports = {
    middleware: (req, res, next) => {
        if (req.body.message) {
            next();
        } else {
            res.send("Don't you have any message?");
        }
    },
};

//esmodule
export const middleware = (req, res, next) => {
    if (req.body.message) {
        next();
    } else {
        res.send("Don't you have any message?");
    }
};
```

CommonJS

```js
//./exha.config.js
module.exports = {
    port: 3001,
    routeDir: "./routes",
    middlewareDir: "./middlewares",
    staticDir: "./public",
};
```

ESModule

```js
export const config = {
    port: 3001,
    routeDir: "./routes",
    middlewareDir: "./middlewares",
    staticDir: "./public",
};
```

## Work with params

```lua
project_root/
│
├── routes/
.
.
.
│   └── messages/
│       └── [message_id]/
│           └── index.js
.
.
.
```

```js
//commonjs
module.exports = {
    event: (req, res) => {
        let message_id = req.params.message_id;
        //Search in your database
        res.send("Here your message" /*Write database result*/);
    },
};
```
