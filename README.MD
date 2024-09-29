![Exha](https://cdn.ramco.mbps.tk/cdn/ehd6u608cn.png)

Fast, compact, open source route and middleware handler for [expess](https://www.npmjs.com/package/express)

Fast Setup

```lua
npx exhapack your_app_name
```

```js
//index.js
const { Exha } = require("exha");
const exha = new Exha();

exha.init();
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
-   Built-in image uploader

## Table of Contents

-   [Setup](#setup)
-   [Middleware uses](#middleware-uses)
-   [Plugin uses](#plugin-uses)
-   [Form parsing](#form-parsing)
-   [Static files](#static-files)
-   [Image uploader](#image-uploader)

### Setup

Create a `/root` directory, create `index.js` file, create `exha.config.js` file, create `/routes` directory and create `/index` file in routes directory

Looks like;

```lua
project_root/
│
├── /routes
│   └── index.js
│
├── exha.config.js
│
└── index.js
```

project_root/index.js

```js
const { Exha } = require("exha");
let exha = new Exha();

exha.init();
```

project_root/exha.config.js

```js
exports.default = {
    port: 3000,
    routeDir: "/routes",
};
```

project_root/routes/index.js

```js
module.exports = {
    event: (req, res) => {
        res.send("Hello world");
    },
};
```

### Middleware uses

Add `middlewareDir` properties to exha config

```js
exports.default = {
    port: 3000,
    routeDir: "/routes",
    middlewareDir: "/middlewares",
};
```

and create a new middleware in `/middlewares` directory

project_root/middlewares/check.js

```js
module.exports = {
    middleware: (req, res, next) => {
        console.log("A new request!");
        next();
    },
};
```

and go back to routes/index

```js
const {mwLoader} = require("exha")
let checkMw = mwLoader("check.js")

module.exports = {
    middlewares = [checkMw],
    event: (req,res) => {
        res.send("Hello world")
    }
}
```

### Plugin uses

Plugin usage is very similar to middleware. Add `pluginDir` properties to exha config

```js
exports.default = {
    port: 3000,
    routeDir: "/routes",
    middlewareDir: "/middlewares",
    pluginDir: "/plugins",
};
```

and create a new plugin in `/plugins` directory

project_root/plugins/whoReq.js

```js
module.exports = {
    plugin: (name) => {
        console.log(name, " requested");
    },
};
```

and go back to routes/index

```js
const {mwLoader,plLoader} = require("exha")
let checkMw = mwLoader("check.js")
let whoReq = plLoader("whoReq.js")

module.exports = {
    middlewares = [checkMw],
    event: (req,res) => {
        whoReq("John Doe")
        res.send("Hello world")
    }
}
```

### Form parsing

Allows parsing of incoming requests

Add `parseForm` properties to exha config

```js
exports.default = {
    port: 3000,
    routeDir: "/routes",
    middlewareDir: "/middlewares",
    pluginDir: "/plugins",
    parseForm: true,
};
```

### Static files

Serving static files

Add `staticDir` properties to exha config

```js
exports.default = {
    port: 3000,
    routeDir: "/routes",
    middlewareDir: "/middlewares",
    pluginDir: "/plugins",
    parseForm: true,
    staticDir: "public",
};
```

### Image uploader

Built-in image uploader

Add `imageUploader` properties to exha config

```js
exports.default = {
    port: 3000,
    routeDir: "/routes",
    middlewareDir: "/middlewares",
    pluginDir: "/plugins",
    parseForm: true,
    staticDir: "public",
    imageUploader: true,
};
```

Use can it in middleware

```js
const {mwLoader,plLoader,uploader} = require("exha")
let checkMw = mwLoader("check.js")
let whoReq = plLoader("whoReq.js")

module.exports = {
    middlewares = [checkMw,uploader.single("image")],
    event: (req,res) => {
        console.log(req.files)
        whoReq("John Doe")
        res.send("Hello world")
    }
}
```
