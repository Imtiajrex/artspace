import mysql from 'mysql2/promise';
const dbConfig = {
	username: 'doadmin',
	password: 'AVNS_7xYjBol4xvxA7oQntDQ',
	host: 'artspace-do-user-5692794-0.b.db.ondigitalocean.com',
	port: '25060',
	database: 'artspace',
	sslmode: 'REQUIRED'
};

export default async function getDB() {
	return await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'artspace'
	});
}
