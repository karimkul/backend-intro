const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// console.log(app.get("env"));
// console.log(process.env);
console.log(process.env.PORT);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Post is running on port ${port}`);
});
