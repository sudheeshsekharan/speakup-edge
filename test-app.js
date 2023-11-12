
import IssuerDataFetcher from './src/lib/IssuerDataFetcher.js';
import TokenRequestCreator from './src/lib/TokenRequestCreator.js';
import TokenRedemption from './src/lib/TokenRedemption.js';

const issuerDataFetcher = new IssuerDataFetcher();
const tokenRequestCreator = new TokenRequestCreator();
const tokenRedemption = new TokenRedemption();

// Load a static file as a Uint8Array at compile time.
// File path is relative to root of project, not to this file


// The entry point for your application.
//
// Use this fetch event listener to define your main request handling logic. It could be
// used to route based on the request properties (such as method or path), send
// the request to a backend, make completely new requests, and/or generate
// synthetic responses.

//addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

// console.log(tokenRedemption.validateAuthToken(issuerDataFetcher.fetchIssuerData(), 'test'));

// console.log(tokenRequestCreator.createTokenRequest(issuerDataFetcher.fetchIssuerData().issuer_name, true));

async function handleRequest(event) {
  // Log service version
  //console.log("FASTLY_SERVICE_VERSION:", env('FASTLY_SERVICE_VERSION') || 'local');

  // Get the client request.
  //let req = event.request;

  let issuerInfo = issuerDataFetcher.fetchIssuerData();
  console.log('issuerInfo',issuerInfo);


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


    const authHeader = 'PrivateToken token=AAJbvr2jU2SP4172WJTKwSZAMkGNWg2h02zHDuxwH_Xr96cnAoAFKRcg8Hbpvn9r6BPUN5TMQgLxvdiRh2Jw_Wg4idTJxrwKNACt2FmLP7RsdlKg14bJz49Jwlm8-fbs88FEXduE33kXGSEF0_eCryk4Nrlr55op27beHk0SFsGujAg_AOEoxWhpgcGnqY6wBklCJ19osjbNcPmbtRZrve7TUVdga7ThN9PbWXXfAcsiuGKs3IMLgJax6_-C5QKvYVdX6lnZZK1zpR322WFArHNIWg_JZw453qcKV_WHmlawFJzdblHQuGxU9N112oD2_f2LFsbs1y-jYh77m7D7HXgFQ8KIWKhQNL-isxhj7Lroc-koDRMEq0qLCN8yGFER75SVcz_Ko_tc3V5oDOf2JqULLMu3ljGh7JMiimx3RKkPA11F6y9YN_I53RXJpm2fYyrlfC-BsWi526yuHfG_c6vl';

     console.log(tokenRedemption.validateAuthToken(issuerInfo, authHeader));

  

}

handleRequest();
