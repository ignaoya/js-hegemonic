const express = require('express');
const md5 = require('md5');
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

router.post('/users', (req, res) => {
	let sql = "SELECT * FROM user WHERE email = ?";
	db.all(sql, [req.body.email], (err, rows) => {
		if (err) {
			console.log("Err is true");
			res.status(400).send({"error": err.message});
			return;
		} else if (rows.length > 0) {
			console.log(rows);
			res.send({ "message": "Email account already in use!" });
			return;
		} else {
			sql = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
			const params = [req.body.name, req.body.email, md5(req.body.password)];
			db.run(sql, params);
			res.send({ "message": "success" });
		}
	});
});

router.get('/users/:email', (req, res) => {
	let sql = "SELECT * FROM user WHERE email = ?";
	db.all(sql, [req.params.email], (err, rows) => {
		if (err) {
			res.status(400).send({"error": err.message});
			return;
		} else if (rows.length > 0) {
			res.json({ "user": rows });
			return;
		} else {
			res.json({ "message": "User not found!" });
			return;
		}
	});
});

router.put('/users/:email', (req, res) => {
	let sql = "SELECT * FROM user WHERE email = ?";
	const params = [req.body.newemail, req.params.email];
	db.all(sql, [req.params.email], (err, rows) => {
		if (err) {
			res.status(400).send({"error": err.message});
			return;
		} else if (rows.length > 0) {
			sql = "UPDATE user SET email = ? WHERE email = ?";
			db.run(sql, params);
			res.json({ "message": "Success!" });
			return;
		} else {
			res.json({ "message": "User not found!" });
			return;
		}
	});
});

router.delete('/users/:email', (req, res) => {
	let sql = "DELETE FROM user WHERE email = ?";
	const params = [req.params.email];
	db.run(sql, params);
	res.json({ "message": "Success!" });
});

module.exports = router;
