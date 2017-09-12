Broccoli Markdown Resolver ![Download count all time](https://img.shields.io/npm/dt/broccoli-markdown-resolver.svg) [![npm](https://img.shields.io/npm/v/broccoli-markdown-resolver.svg)](https://www.npmjs.com/package/broccoli-markdown-resolver)
======

Given an input node, Broccoli Markdown Resolver outputs a file exporting an object tree of all .md files, with content and front matter parsed automatically.

## Installation
Using NPM:
```
npm install broccoli-markdown-resolver
```
Or using Yarn:
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

Consume like so:

```js
const markdownData = require('./path/to/markdown-file-data');

console.log(markdownData.tree);
// =>
// {
//   "path/to/input-node": [
//     {
//       "path": "path/to/input-node/quick-start",
//       "content": "\nGet started quickly with Acme API.\n",
//       "attributes": {
//         "title": "Quick Start"
//       }
//     },
//     {
//       "path": "path/to/input-node/sdks",
//       "children": [
//         {
//           "path": "path/to/input-node/sdks/node-js",
//           "content": "\nAbout the Acme Node.js SDK.\n",
//           "attributes": {
//             "title": "Node.js SDK"
//           }
//         }
//       ],
//       "content": "\nAcme offer SDKs in many different languages.\n",
//       "attributes": {
//         "title": "SDKs",
//         "custom-attr": true
//       }
//     }
//   ]
// }

console.log(markdownData.files);
// =>
// [
//   {
//     "path": "path/to/input-node/quick-start",
//     "content": "\nGet started quickly with Acme API.\n",
//     "attributes": {
//       "title": "Quick Start"
//     }
//   },
//   {
//     "path": "path/to/input-node/sdks/node-js",
//     "content": "\nAbout the Acme Node.js SDK.\n",
//     "attributes": {
//       "title": "Node.js SDK"
//     }
//   },
//   {
//     "path": "app/api-guides/sdks",
//     "children": [
//       {
//         "path": "path/to/input-node/sdks/node-js",
//         "content": "\nAbout the Acme Node.js SDK.\n",
//         "attributes": {
//           "title": "Node.js SDK"
//         }
//       }
//     ],
//     "content": "\nAcme offer SDKs in many different languages.\n",
//     "attributes": {
//       "title": "SDKs",
//       "custom-attr": true
//     }
//   }
// ]
```
