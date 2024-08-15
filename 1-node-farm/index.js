const fs = require("fs");

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
