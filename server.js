const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const root = `${__dirname}/dist`;

app.use(express.static(root));

app.listen(PORT, () => {
  console.log(`started at ${PORT}`);
});
