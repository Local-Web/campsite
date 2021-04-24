// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { socketsApp } = require("./sockets/app");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = dev ? 3000 : process.env.PORT;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Even though this throws a deprecated error, removing "true" causes this to fail
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:" + port);
  });

  socketsApp(server);
});
