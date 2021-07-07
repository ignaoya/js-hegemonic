const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message)
		throw err
	}else{
		console.log('Connected to the SQLite database.');
		db.run(`CREATE TABLE user (
					  id INTEGER PRIMARY KEY AUTOINCREMENT,
						name text,
						email text UNIQUE,
						password text,
						CONSTRAINT email_unique UNIQUE (email)
						)`,
				(err) => {
					if (err) {
						console.log('Error creating table');
						// table already created
					} else {
						let insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
						db.run(insert, ["admin", "admin@admin.com", md5("admin123")])
					}
				});
	}
});

module.exports = db;

