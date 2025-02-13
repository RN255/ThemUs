const https = require("https");
const http = require("http");
const { URL } = require("url"); // Built-in URL parser

function fetchRSS(url, redirectCount = 3) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;

    client
      .get(url, (response) => {
        let data = "";

        if (
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          if (redirectCount === 0) {
            return reject(new Error(`Too many redirects for ${url}`));
          }
          // Follow the redirect
          const redirectUrl = new URL(response.headers.location, url).href;
          console.log(`Redirecting to: ${redirectUrl}`);
          return resolve(fetchRSS(redirectUrl, redirectCount - 1)); // Recursive call
        }

        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => {
          if (response.statusCode !== 200) {
            return reject(
              new Error(`Failed to fetch RSS: ${response.statusCode}`)
            );
          }
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

module.exports = fetchRSS;
