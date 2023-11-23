# Private Access Token @Edge

[![Deploy to Fastly](https://deploy.edgecompute.app/button)](https://deploy.edgecompute.app/fastly/compute-starter-kit-javascript-default)

Implements Private Access Token challenge and validation at Edge to protect Speak-Up Application

**For more details about Compute@Edge, see the [Fastly developer hub](https://developer.fastly.com/solutions/starters)**

## Features

* Allow only requests with particular HTTP methods
* Match request URL path and methods for routing
* Build synthetic responses at the edge

## Understanding the code

This code is intentionally lightweight, and requires no dependencies aside from the [`@fastly/js-compute`](https://www.npmjs.com/package/@fastly/js-compute) npm package. 

The template uses webpack to bundle `index.js` and its imports into a single JS file, `bin/index.js`, which is then wrapped into a `.wasm` file, `bin/index.wasm` using the `js-compute-runtime` CLI tool bundled with the `@fastly/js-compute` npm package, and bundled into a `.tar.gz` file ready for deployment to Compute@Edge.

