const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
    // fs.readFile("test-file.txt", "utf8", (err, data) => {
    //     if (err) console.error(err);
    //     res.end(data);
    // });
    // Solution 2: STREAMS
    // const readible = fs.createReadStream("test-file.txt");
    // readible.on("data", (chunk) => {
    //     res.write(chunk);
    // });
    // readible.on("end", () => {
    //     res.end();
    // });
    // readible.on("error", (err) => {
    //     console.error(err);
    //     res.status = 500;
    //     res.end("<h1>File not found.</h1>");
    // });
    // Solution 3: STREAMS
    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res);
    // readableSource.pipe(writableDestination);
});
server.listen(8000, "127.0.0.1", () => {
    console.log("Server is running at http://127.0.0.1:8000/");
});
