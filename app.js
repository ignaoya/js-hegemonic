const express = require('express');
const Joi = require('joi');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./public/js/database');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

app.use(express.json());

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use((req, res) => {
	res.status(404).send('404: page not found!');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
