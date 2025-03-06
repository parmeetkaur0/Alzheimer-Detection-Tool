const app = require('./app');
const dbConnect = require('./db/db');
const port = process.env.PORT || 5000;


dbConnect();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
