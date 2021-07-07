const express = require('express');
const router = express.Router();

const db = require('../public/js/database');

router.get('/users', (req, res) => {
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

module.exports = router;
