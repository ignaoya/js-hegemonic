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


router.get('/nations', (req, res) => {
	const sql = "select * from nation";
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

router.post('/nations', (req, res) => {
	let sql = "SELECT * FROM nation WHERE user_id = ?";
	db.all(sql, [req.body.user_id], (err, rows) => {
		if (err) {
			console.log("Err is true");
			res.status(400).send({"error": err.message});
			return;
		} else if (rows.length > 0) {
			console.log(rows);
			res.send({ "message": "User already has an active nation!" });
			return;
		} else {
			sql = "INSERT INTO nation (user_id, name, population, president_id, monetary_reserves, oil_reserves) VALUES (?,?,?,NULL,?,?)";
			const params = [req.body.user_id, req.body.name, 100, 1000, 100];
			db.run(sql, params);
			res.send({ "message": "success" });
		}
	});
});

router.get('/nations/:id', (req, res) => {
	let sql = "SELECT * FROM nation WHERE id = ?";
	db.all(sql, [req.params.id], (err, rows) => {
		if (err) {
			res.status(400).send({"error": err.message});
			return;
		} else if (rows.length > 0) {
			res.json({ "nation": rows });
			return;
		} else {
			res.json({ "message": "Nation not found!" });
			return;
		}
	});
});

router.put('/nations/:id', (req, res) => {
	let sql = "SELECT * FROM nation WHERE id = ?";
	const params = [req.body.name, req.params.id];
	db.all(sql, [req.params.id], (err, rows) => {
		if (err) {
			res.status(400).send({"error": err.message});
			return;
		} else if (rows.length > 0) {
			sql = "UPDATE nation SET name = ? WHERE id = ?";
			db.run(sql, params);
			res.json({ "message": "Success!" });
			return;
		} else {
			res.json({ "message": "Nation not found!" });
			return;
		}
	});
});

router.delete('/nations/:id', (req, res) => {
	let sql = "DELETE FROM nation WHERE id = ?";
	const params = [req.params.id];
	db.run(sql, params);
	res.json({ "message": "Success!" });
});

module.exports = router;
