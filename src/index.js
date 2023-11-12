//! Default Compute@Edge template program.

/// <reference types="@fastly/js-compute" />
// import { CacheOverride } from "fastly:cache-override";
// import { Logger } from "fastly:logger";
import { env } from "fastly:env";
import { includeBytes } from "fastly:experimental";

import IssuerDataFetcher from './lib/IssuerDataFetcher.js';
import TokenRequestCreator from './lib/TokenRequestCreator.js';
import TokenRedemption from './lib/TokenRedemption.js';

const issuerDataFetcher = new IssuerDataFetcher();
const tokenRequestCreator = new TokenRequestCreator();
const tokenRedemption = new TokenRedemption();

// Load a static file as a Uint8Array at compile time.
// File path is relative to root of project, not to this file
const welcomePage = includeBytes("./src/welcome-to-compute@edge.html");
const challenge401 = includeBytes("./src/html/challenge401.html");
const success200 = includeBytes("./src/html/success200.html");

// The entry point for your application.
//
// Use this fetch event listener to define your main request handling logic. It could be
// used to route based on the request properties (such as method or path), send
// the request to a backend, make completely new requests, and/or generate
// synthetic responses.

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

// console.log(tokenRedemption.validateAuthToken(issuerDataFetcher.fetchIssuerData(), 'test'));

// console.log(tokenRequestCreator.createTokenRequest(issuerDataFetcher.fetchIssuerData().issuer_name, true));

async function handleRequest(event) {
  // Log service version
  console.log("FASTLY_SERVICE_VERSION:", env('FASTLY_SERVICE_VERSION') || 'local');

  // Get the client request.
  let req = event.request;

  let issuerInfo = issuerDataFetcher.fetchIssuerData();
  console.log('issuerInfo',issuerInfo);

  if (["GET"].includes(req.method)) {
    return new Response(challenge401, {
      status: 200,
      headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
    });
  }

  // Filter requests that have unexpected methods.
  if (["PUT", "PATCH", "DELETE"].includes(req.method)) {
    return new Response("This method is not allowed", {
      status: 405,
    });
  }

  let url = new URL(req.url);

  // If request is to the `/` path...
  if (url.pathname == "/") {
    let logs=[];
    // Below are some common patterns for Compute@Edge services using JavaScript.
    // Head to https://developer.fastly.com/learning/compute/javascript/ to discover more.

    // Create a new request.
    // let bereq = new Request("http://example.com");

    // Add request headers.
    // req.headers.set("X-Custom-Header", "Welcome to Compute@Edge!");
    // req.headers.set(
    //   "X-Another-Custom-Header",
    //   "Recommended reading: https://developer.fastly.com/learning/compute"
    // );

    // Create a cache override.
    // To use this, uncomment the import statement at the top of this file for CacheOverride.
    // let cacheOverride = new CacheOverride("override", { ttl: 60 });

    // Forward the request to a backend.
    // let beresp = await fetch(req, {
    //   backend: "backend_name",
    //   cacheOverride,
    // });

    // Remove response headers.
    // beresp.headers.delete("X-Another-Custom-Header");

    // Log to a Fastly endpoint.
    // To use this, uncomment the import statement at the top of this file for Logger.
    // const logger = new Logger("my_endpoint");
    // logger.log("Hello from the edge!");

    // Send a default synthetic response.
    // return new Response(welcomePage, {
    //   status: 200,
    //   headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
    // });

    try {

      const authHeader = req.headers && req.headers.get('authorization');

      let validationResp = tokenRedemption.validateAuthToken(issuerInfo, authHeader);

      if (authHeader && validationResp && validationResp.success) {
        //console.log('200 - Authenticated request, path=' + req.url + ', headers=' + JSON.stringify(req.headers));

        return new Response(success200, {
          status: 200,
          headers: new Headers({ "Content-Type": "text/html; charset=utf-8" })
        });

        // res.writeHead(200, { 'Content-Type': 'text/html' });
        // res.write(fs.readFileSync("html/success200.html", "utf8").replace('AUTH_HEADER', req.headers['authorization']));
        // res.end();
      } else {
        logs.push('401 invalid auth');
        logs.push('authHeader '+authHeader);
        logs.push(JSON.stringify({validationResp}));
        //console.log('401 - Unauthenticated request, path=' + req.url + ', headers=' + JSON.stringify(req.headers));
        var tokenRequests = [];
        try {
          
          for (var i = 0; i < 1; i++) {

            var tokenRequest = tokenRequestCreator.createTokenRequest(issuerInfo.issuer_name, true);
            //tokenRedemption.registerTokenRequestForRedemption(Buffer.from(tokenRequest, 'base64'));
            tokenRequests.push('PrivateToken challenge=' + tokenRequest + ', token-key=' + issuerInfo.issuer_public_key_base64);

          }
          logs.push('end token loop ');
        }
        catch (ex) {
          tokenRequests = [ex.message];
        }
        return new Response(challenge401, {
          status: 401,
          headers: new Headers({ "Content-Type": "text/html; charset=utf-8", 'WWW-Authenticate': tokenRequests.join(', '), 'logs': logs.join(', ') }),
        });

        // res.writeHead(401, { 'Content-Type': 'text/html', 'WWW-Authenticate': tokenRequests.join(', ') });
        // res.write(fs.readFileSync("html/challenge401.html", "utf8"));
        // res.end();
      }
    }
    catch (e) {

      return new Response(challenge401, {
        status: 200,
        headers: new Headers({ "Content-Type": "text/html; charset=utf-8", 'authorization': e.message }),
      });

    }

  }

  // Catch all other requests and return a 404.
  return new Response("The page you requested could not be found", {
    status: 404,
  });
}
