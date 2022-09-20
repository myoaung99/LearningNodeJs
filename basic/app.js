const http = require("http");
const requestHandler = require("./route");

const server = http.createServer(requestHandler);

server.listen(8080);
