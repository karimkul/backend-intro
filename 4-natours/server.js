const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// Replace <PASSWORD> with the actual password from environment variables
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Updated mongoose connection
mongoose
  .connect(DB, {
    useNewUrlParser: true // This is still valid
  })
  .then(() => console.log('DB connection successful'))
  .catch(err => console.error('DB connection error:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
