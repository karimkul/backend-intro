const fs = require("fs");

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Timer 1 finished"));

fs.readFile("test-file.txt", (err, data) => {
    console.log("I/O operation finished");
    console.log("________________________________");
    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immidiate 2 finished"));
});

console.log("hello from the top level code");
