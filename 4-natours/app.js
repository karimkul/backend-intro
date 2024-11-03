const fs = require("fs");
const express = require("express");
const { dirname } = require("path");
const app = express();

// app.get("/", (req, res) => {
//     res.status(200).json({
//         message: "Hello from the server side",
//         app: "Natours"
//     });
// });

// app.post("/", (req, res) => {
//     res.send("You can post to the endpoint...");
// });
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);
app.get("/api/v1/tours", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            tours
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Post is running on port ${port}`);
});
