const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('dist'));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
  console.log(`started at ${PORT}`);
});
