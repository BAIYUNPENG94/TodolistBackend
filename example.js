const oracledb = require('oracledb');

async function run() {
	let connection;

	try {
		//This needs to be verified tonight.
		connection = await oracledb.getConnection({ user: "sys", password: "taiho", connectionString: "localhost:xxxx"});

		console.log("connect SUCCESS");
	} catch (err) {
		console.error(err);
	} finally {
		if (connection) {
			try {
				await connection.close();
			} catch (err) {
				console.error(err);
			}
		}
	}
}