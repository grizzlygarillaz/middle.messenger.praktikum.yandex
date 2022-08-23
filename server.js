// import { create } from 'express-handlebars';
// import express from 'express';

const express = require('express')
const PORT = 3000;
const app = express();
const root = __dirname + '/dist'
//
// const hbs = create({
//   partialsDir: './src/components',
//   layoutsDir: './src/views/layouts'
// })
//
// app.engine('hbs', hbs.engine);
// app.set('view engine', '.hbs');
// app.set('views', './dist/views');

// app.get('/', (req, res) => {
//   app.use(express.static('index.html'));
// })

app.use(express.static(root));

app.listen(PORT, () => {
  console.log(`started at ${PORT}`);
})