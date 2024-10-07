const fs = require("fs");
const http = require("http");
const url = require("url");

// /////////////////////////////////////////////////
// // FILE

// Blocking, synchronous way
// const textIn = fs.readFileSync("./1-node-farm/txt/input.txt", `utf-8`);
// // console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./1-node-farm/txt/output.txt", textOut);
// console.log("File written");

// // Non-blocking, asynchronous way
// fs.readFile("./1-node-farm/txt/start.txt", `utf-8`, (err, data1) => {
//     fs.readFile(`./1-node-farm/txt/${data1}.txt`, `utf-8`, (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./1-node-farm/txt/append.txt`, `utf-8`, (err, data3) => {
//             console.log(data3);
//             fs.writeFile(
//                 "./1-node-farm/txt/final.txt",
//                 `${data2}\n${data3}`,
//                 `utf-8`,
//                 (err) => {
//                     console.log("Your file has been written");
//                 }
//             );
//         });
//     });
// });

// console.log("Read file1");

/////////////////////////////////////////////////
// SERVER
const replaceTemplate = (temp, product) => {
    let output = temp.replace("{%PRODUCTNAME%}", product.productName);
    output = output.replace("{%IMAGE%}", product.image);
    output = output.replace("{%PRICE%}", product.price);
    output = output.replace("{%From%}", product.from);
    output = output.replace("{%NUTRIENTS%}", product.nutrients);
    output = output.replace("{%QUANTITY%}", product.quantity);
    output = output.replace("{%DESCRIPTION%}", product.description);
    output = output.replace("{%ID%}", product.id);

    if (!product.organic) {
        output = output.replace("{%NOT__ORGANIC%}", "not-organic");
    }

    return output;
};
const templateOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    `utf-8`
);
const templateCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    `utf-8`
);
const templateProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    `utf-8`
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, `utf-8`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    //Overview page
    if (pathName === "/" || pathName === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" });
        const cardsHtml = dataObj
            .map((el) => replaceTemplate(templateCard, el))
            .join("");
        console.log(templateOverview);
        const output = templateOverview.replace("{%PRODUCT-CARDS%}", cardsHtml);

        res.end(output);

        //Product page
    } else if (pathName === "/product") {
        res.end("This is PRODUCT!");

        //API
    } else if (pathName === "/api") {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);

        //Not found
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
