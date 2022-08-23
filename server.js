const express = require('express')
const PORT = 3000;
const app = express();
const root = __dirname + '/dist'

app.use(express.static(root));

app.listen(PORT, () => {
  console.log(`started at ${PORT}`);
})