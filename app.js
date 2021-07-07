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

/*
app.get('/api/users', (req, res) => {
	const sql = "select * from user";
	let params = [];
	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({"error": err.message});
			return;
		}
		res.json({
			"message": "success",
			"data": rows
		})
	});
});
*/

app.use((req, res) => {
	res.status(404);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
