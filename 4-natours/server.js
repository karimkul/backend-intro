const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// console.log(app.get("env"));
// console.log(process.env);
// console.log(process.env.PORT);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Post is running on port ${port}`);
});
