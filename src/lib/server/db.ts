import mysql from 'mysql2/promise';
const dbConfig = {
	username: 'doadmin',
	password: 'AVNS_R-l0gDSsmZAGFJY0a4y',
	host: 'artspace-do-user-5692794-0.b.db.ondigitalocean.com',
	port: 25060,
	database: 'artspace',
	sslmode: 'REQUIRED'
};

export default async function getDB() {
	return await mysql.createConnection({
		host: dbConfig.host,
		port: dbConfig.port,
		user: dbConfig.username,
		password: dbConfig.password,
		database: dbConfig.database
	});
}
