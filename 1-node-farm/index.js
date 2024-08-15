const fs = require("fs");
const http = require("http");
const url = require("url");

// /////////////////////////////////////////////////
// // FILE

// Blocking, synchronous way
const textIn = fs.readFileSync("./1-node-farm/txt/input.txt", `utf-8`);
// console.log(textIn);

const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./1-node-farm/txt/output.txt", textOut);
console.log("File written");

// Non-blocking, asynchronous way
fs.readFile("./1-node-farm/txt/start.txt", `utf-8`, (err, data1) => {
    fs.readFile(`./1-node-farm/txt/${data1}.txt`, `utf-8`, (err, data2) => {
        console.log(data2);
        fs.readFile(`./1-node-farm/txt/append.txt`, `utf-8`, (err, data3) => {
            console.log(data3);
            fs.writeFile(
                "./1-node-farm/txt/final.txt",
                `${data2}\n${data3}`,
                `utf-8`,
                (err) => {
                    console.log("Your file has been written");
                }
            );
        });
    });
});

console.log("Read file1");

/////////////////////////////////////////////////
// SERVER
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === "/" || pathName === "/overview") {
        res.end("This is OVERVIEW!");
    } else if (pathName === "/product") {
        res.end("This is PRODUCT!");
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-word"
        });
        res.end("<h1>Page not found</h1>");
    }
});
server.listen(8000, `127.0.0.1`, () => {
    console.log("Listining to request on port 8000");
});
