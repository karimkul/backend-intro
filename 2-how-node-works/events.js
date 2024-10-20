const EventEmitter = require("events");
const http = require("http");

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
    console.log("New sale event emitted");
    // myEmitter.emit("saleCompleted");
});
myEmitter.on("newSale", () => {
    console.log("Customer name:  John Doe");
});
myEmitter.on("newSale", (stock) => {
    console.log(`There are now ${stock} items left in stock.`);
});
myEmitter.emit("newSale", 9);

/////////////////////////////////
const server = http.createServer();

server.on("request", (req, res) => {
    console.log("New request received");
    console.log(req.url);
    res.end("Request received\n");
});
server.on("request", (req, res) => {
    console.log("Another request ");
});
server.on("close", () => {
    console.log("Server closed");
});
server.listen(8000, "127.0.0.1", () => {
    console.log("waiting for requests...");
});
