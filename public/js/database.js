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
					console.log("'User' table already created.");
					// table already created
				} else {
					console.log("Created 'User' table.");
					const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
					db.run(insert, ["admin", "admin@admin.com", md5("admin123")]);
				}
			}
		);
		db.run(`CREATE TABLE nation (
						id INTEGER PRIMARY KEY AUTOINCREMENT,
						user_id INTEGER REFERENCES user(id),
						name text,
						population INTEGER,
						president_id INTEGER REFERENCES citizen(id),
						monetary_reserves INTEGER,
						oil_reserves INTEGER
						)`,
			(err) => {
				if (err) {
					console.log("'Nation' table already created.");
				} else {
					console.log("Created 'Nation' table.");
				}
			}
		);
		db.run(`CREATE TABLE citizen (
						id INTEGER PRIMARY KEY AUTOINCREMENT,
						nation_id INTEGER REFERENCES nation(id),
						name text,
						ideology text,
						votes INTEGER,
						taxes INTEGER,
						oil_cost INTEGER
						)`,
			(err) => {
				if (err) {
					console.log("'Citizen' table already created.");
				} else {
					console.log("Created 'Citizen' table.");
				}
			}
		);
	}
});

module.exports = db;

