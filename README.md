Broccoli Markdown Resolver
======

[![Build Status](https://travis-ci.org/willviles/broccoli-markdown-resolver.svg)](https://travis-ci.org/willviles/broccoli-markdown-resolver) ![Download count all time](https://img.shields.io/npm/dt/broccoli-markdown-resolver.svg) [![npm](https://img.shields.io/npm/v/broccoli-markdown-resolver.svg)](https://www.npmjs.com/package/broccoli-markdown-resolver)

Given an input node, Broccoli Markdown Resolver outputs a file exporting data for our .md files, with content and frontmatter parsed automatically.

## Installation
```
yarn add broccoli-markdown-resolver
```

## Usage

Consider the following folder structure inside our `inputNode`.

```shell
.
├── quick-start.md
├── sdks.md
└── sdks/
    └── node-js.md
```

Run the resolver and choose an output destination.

```js
var MarkdownResolver = require('broccoli-markdown-resolver');

var outputNode = new MarkdownResolver(inputNodes, {
  outputFile: '/markdown-file-data.js'
});
```

## Data

Require the data

```js
const markdownData = require('./path/to/markdown-file-data');
```

### markdownData.trees

Returns a tree of markdown data for each inputNode.

```js
{
  "path/to/input-node": [
    {
      "path": "path/to/input-node/quick-start",
      "content": "\nGet started quickly with Acme API.\n",
      "attributes": {
        "title": "Quick Start"
      }
    },
    {
      "path": "path/to/input-node/sdks",
      "children": [
        {
          "path": "path/to/input-node/sdks/node-js",
          "content": "\nAbout the Acme Node.js SDK.\n",
          "attributes": {
            "title": "Node.js SDK"
          }
        }
      ],
      "content": "\nAcme offer SDKs in many different languages.\n",
      "attributes": {
        "title": "SDKs",
        "custom-attr": true
      }
    }
  ]
}
```

### markdownData.files

Returns a list of all files in a flat object format.

```js
[
  {
    "path": "path/to/input-node/quick-start",
    "content": "\nGet started quickly with Acme API.\n",
    "attributes": {
      "title": "Quick Start"
    }
  },
  {
    "path": "path/to/input-node/sdks/node-js",
    "content": "\nAbout the Acme Node.js SDK.\n",
    "attributes": {
      "title": "Node.js SDK"
    }
  },
  {
    "path": "path/to/input-node/sdks",
    "children": [
      {
        "path": "path/to/input-node/sdks/node-js",
        "content": "\nAbout the Acme Node.js SDK.\n",
        "attributes": {
          "title": "Node.js SDK"
        }
      }
    ],
    "content": "\nAcme offer SDKs in many different languages.\n",
    "attributes": {
      "title": "SDKs",
      "custom-attr": true
    }
  }
]
```
