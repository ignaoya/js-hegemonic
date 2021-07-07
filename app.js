const express = require('express');
const Joi = require('joi');
const app = express();
const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');

app.use(express.json());

app.use('/', indexRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
