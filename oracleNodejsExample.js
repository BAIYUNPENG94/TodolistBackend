const oracledb = require('oracledb');

async function run() {
	let connection;

	try {
		//This needs to be verified tonight.
		connection = await oracledb.getConnection({ user: "system", password: "taiho", connectionString: "192.168.2.125:1521/XE"});

		console.log("connect SUCCESS");

		//await connection.execute(`begin
		//	execute immediate 'drop table todoitem';
		//	exception when others then if sqlcode <> -942 then raise; end if;
		//	end;`);

		//await connection.execute(` create table todoitem (
		//		id number generated always as identity,
		//		description varchar2(4000),
		//		creation_ts timestamp with time zone default current_timestamp,
		//		done number(1, 0),
		//		primary key (id))`);
		
		const sql = 'insert into todoitem (description, done) values (:1, :2)';

		const rows = [
			["task 1", 1],
			["task 2", 0],
			["task 3", 1],
			["task 4", 0],
			["task 5", 1]
		];

		let result = await connection.executeMany(sql, rows);

		console.log(result.rowsAffected, "Rows Inserted");

		connection.commit();

		result = await connection.execute(
			`select description, done from todoitem`,
			[],
			{ resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
		);

		const rs = result.resultSet;
		let row;

		while ((row = await rs.getRow())) {
			if (row.DONE)
				console.log(row.DESCRIPTION, "is done");
			else
				console.log(row.DESCRIPTION, "is Not done");
		}

		await rs.close();

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

run();